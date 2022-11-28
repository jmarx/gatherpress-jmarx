<?php
/**
 * Class is responsible for all attendance related functionality.
 *
 * @package GatherPress
 * @subpackage Includes
 * @since 1.0.0
 */

namespace GatherPress\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Attendee.
 */
class Attendee {

	const TABLE_FORMAT       = '%sgp_attendees';
	const ATTENDEE_CACHE_KEY = 'attendee_%d';

	/**
	 * Attendance statuses.
	 *
	 * @var string[]
	 */
	public $statuses = array(
		'attending',
		'not_attending',
		'waiting_list',
	);

	/**
	 * Set the limit in a variable for now.
	 *
	 * @todo temporary limit. Configuration coming in ticket https://github.com/mauteri/gatherpress/issues/56
	 *
	 * @var int
	 */
	public $limit = 500;

	/**
	 * Event post object.
	 *
	 * @var array|\WP_Post|null
	 */
	protected $event;

	/**
	 * Attendee constructor.
	 *
	 * @param int $post_id An event post ID.
	 */
	public function __construct( int $post_id ) {
		$this->event = get_post( $post_id );
	}

	/**
	 * Get an event attendee.
	 *
	 * @param int $user_id A user ID.
	 *
	 * @return array
	 */
	public function get( int $user_id ): array {
		global $wpdb;

		$event_id = $this->event->ID;

		if ( 1 > $event_id || 1 > $user_id ) {
			return array();
		}

		$default = array(
			'id'        => 0,
			'post_id'   => $event_id,
			'user_id'   => $user_id,
			'timestamp' => null,
			'status'    => 'attend',
			'guests'    => 0,
		);

		$table = sprintf( static::TABLE_FORMAT, $wpdb->prefix );

		// @todo add caching to this.
		$data = $wpdb->get_row( $wpdb->prepare( 'SELECT id, timestamp, status, guests FROM ' . esc_sql( $table ) . ' WHERE post_id = %d AND user_id = %d', $event_id, $user_id ), ARRAY_A ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching

		return array_merge( $default, (array) $data );
	}

	/**
	 * Save an event attendee.
	 *
	 * @param int    $user_id A user ID.
	 * @param string $status  Attendance status.
	 * @param int    $guests  Number of guests.
	 *
	 * @return string
	 */
	public function save( int $user_id, string $status, int $guests = 0 ): string {
		global $wpdb;

		$event_id = $this->event->ID;

		$retval = '';

		if ( 1 > $event_id || 1 > $user_id ) {
			return $retval;
		}

		if ( ! in_array( $status, $this->statuses, true ) ) {
			return $retval;
		}

		$table         = sprintf( static::TABLE_FORMAT, $wpdb->prefix );
		$attendee      = $this->get( $user_id );
		$limit_reached = $this->attending_limit_reached( $status );

		if ( $limit_reached ) {
			$status = 'waiting_list';
		}

		$data = array(
			'post_id'   => intval( $event_id ),
			'user_id'   => intval( $user_id ),
			'timestamp' => gmdate( 'Y-m-d H:i:s' ),
			'status'    => sanitize_key( $status ),
			'guests'    => intval( $guests ),
		);

		if ( intval( $attendee['id'] ) ) {
			$where = array(
				'id' => intval( $attendee['id'] ),
			);
			$save  = $wpdb->update( $table, $data, $where ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
		} else {
			$save = $wpdb->insert( $table, $data ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
		}

		wp_cache_delete( sprintf( self::ATTENDEE_CACHE_KEY, $event_id ) );

		if ( $save ) {
			$retval = sanitize_key( $status );
		}

		if ( ! $limit_reached && 'not_attending' === $status ) {
			$this->check_waiting_list();
		}

		return $retval;
	}

	/**
	 * Check the waiting_list and maybe move attendees to attending.
	 *
	 * @return int  Number of attendees from waiting_list that were moved to attending.
	 */
	public function check_waiting_list(): int {
		$attendees = $this->attendees();
		$total     = 0;

		if (
			intval( $attendees['attending']['count'] ) < $this->limit
			&& intval( $attendees['waiting_list']['count'] )
		) {
			$waiting_list = $attendees['waiting_list']['attendees'];

			// People longest on the waiting_list should be added first.
			usort( $waiting_list, array( $this, 'sort_by_timestamp' ) );

			$total = $this->limit - intval( $attendees['attending']['count'] );
			$i     = 0;

			while ( $i < $total ) {
				// Check that we have enough on the waiting_list to run this.
				if ( ( $i + 1 ) > intval( $attendees['waiting_list']['count'] ) ) {
					break;
				}

				$attendee = $waiting_list[ $i ];
				$this->save( $attendee['id'], 'attending' );
				$i++;
			}
		}

		return intval( $total );
	}

	/**
	 * Check if the attending limit has been reached for an event.
	 *
	 * @param string $status  Desired attendance status.
	 *
	 * @return bool
	 */
	public function attending_limit_reached( string $status ): bool {
		$attendees = $this->attendees();

		if (
			! empty( $attendees['attending'] )
			&& intval( $attendees['attending']['count'] ) >= $this->limit
			&& 'attending' === $status
		) {
			return true;
		}

		return false;
	}

	/**
	 * Get all attendees for an event.
	 *
	 * @return array
	 */
	public function attendees(): array {
		global $wpdb;

		$event_id = $this->event->ID;

		$cache_key = sprintf( self::ATTENDEE_CACHE_KEY, $event_id );
		$retval    = wp_cache_get( $cache_key );

		if ( ! empty( $retval ) && is_array( $retval ) ) {
			return $retval;
		}

		$retval = array(
			'all' => array(
				'attendees' => array(),
				'count'     => 0,
			),
		);

		if ( Event::POST_TYPE !== get_post_type( $event_id ) ) {
			return $retval;
		}

		$site_users  = count_users();
		$total_users = $site_users['total_users'];
		$table       = sprintf( static::TABLE_FORMAT, $wpdb->prefix );
		$data        = (array) $wpdb->get_results( $wpdb->prepare( 'SELECT user_id, timestamp, status, guests FROM ' . esc_sql( $table ) . ' WHERE post_id = %d LIMIT %d', $event_id, $total_users ), ARRAY_A ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
		$data        = ( ! empty( $data ) ) ? (array) $data : array();
		$attendees   = array();

		foreach ( $this->statuses as $status ) {
			$retval[ $status ] = array(
				'attendees' => array(),
				'count'     => 0,
			);
		}

		foreach ( $data as $attendee ) {
			$user_id     = intval( $attendee['user_id'] );
			$user_status = sanitize_key( $attendee['status'] );
			$user_guests = intval( $attendee['guests'] );

			if ( 1 > $user_id ) {
				continue;
			}

			if ( ! in_array( $user_status, $this->statuses, true ) ) {
				continue;
			}

			$user_info   = get_userdata( $user_id );
			$attendees[] = array(
				'id'        => $user_id,
				'name'      => $user_info->display_name,
				'photo'     => get_avatar_url( $user_id ),
				// @todo make a filter so we can use this function in gp-buddypress plugin is activated.
				// 'profile'   => bp_core_get_user_domain( $user_id ),
				'profile'   => get_author_posts_url( $user_id ),
				'role'      => Settings::get_instance()->get_user_role( $user_id ),
				'timestamp' => sanitize_text_field( $attendee['timestamp'] ),
				'status'    => $user_status,
				'guests'    => $user_guests,
			);
		}

		// Sort before breaking down statuses in return array.
		usort( $attendees, array( $this, 'sort_by_role' ) );

		$retval['all']['attendees'] = $attendees;
		$retval['all']['count']     = count( $retval['all']['attendees'] );

		foreach ( $this->statuses as $status ) {
			$retval[ $status ]['attendees'] = array_filter(
				$attendees,
				function( $attendee ) use ( $status ) {
					return ( $status === $attendee['status'] );
				}
			);

			$retval[ $status ]['attendees'] = array_values( $retval[ $status ]['attendees'] );
			$retval[ $status ]['count']     = count( $retval[ $status ]['attendees'] );
		}

		wp_cache_set( $cache_key, $retval, 15 * MINUTE_IN_SECONDS );

		return $retval;
	}

	/**
	 * Sort attendees by their role.
	 *
	 * @param array $first  First attendee to compare in sort.
	 * @param array $second Second attendee to compare in sort.
	 *
	 * @return bool
	 */
	public function sort_by_role( array $first, array $second ): bool {
		$roles   = array_values(
			array_map(
				function( $role ) {
					return $role['labels']['singular_name'];
				},
				Settings::get_instance()->get_user_roles()
			)
		);
		$roles[] = __( 'Member', 'gatherpress' );

		return ( array_search( $first['role'], $roles, true ) > array_search( $second['role'], $roles, true ) );
	}

	/**
	 * Sort attendees by earliest timestamp.
	 *
	 * @param array $first  First attendee to compare in sort.
	 * @param array $second Second attendee to compare in sort.
	 *
	 * @return bool
	 */
	public function sort_by_timestamp( array $first, array $second ): bool {
		return ( strtotime( $first['timestamp'] ) < strtotime( $second['timestamp'] ) );
	}

}
