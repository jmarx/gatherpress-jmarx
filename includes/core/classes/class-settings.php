<?php
/**
 * Class is responsible for managing plugin settings.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

use \GatherPress\Core\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Settings.
 */
class Settings {

	use Singleton;

	const PARENT_SLUG = 'edit.php?post_type=gp_event';

	/**
	 * Current page.
	 *
	 * @var string
	 */
	protected $page = '';

	/**
	 * Role constructor.
	 */
	protected function __construct() {
		$this->set_page();
		$this->setup_hooks();
	}

	/**
	 * Helper to set the current page.
	 *
	 * phpcs:disable WordPress.Security.NonceVerification.Recommended
	 *
	 * @return void
	 */
	protected function set_page() {
		if ( isset( $_GET['page'] ) ) {
			$this->page = sanitize_text_field( wp_unslash( $_GET['page'] ) );
		}

		// phpcs:enable WordPress.Security.NonceVerification.Recommended
	}

	/**
	 * Setup Hooks.
	 */
	protected function setup_hooks() {
		add_action( 'admin_menu', array( $this, 'options_page' ) );
		add_action( 'admin_head', array( $this, 'remove_sub_options' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );

		add_filter( 'submenu_file', array( $this, 'select_menu' ) );
		add_filter( 'gatherpress_settings_sub_pages', array( $this, 'register_sub_pages' ), 10, 2 );
	}

	/**
	 * Setup options page.
	 */
	public function options_page() {
		add_submenu_page(
			self::PARENT_SLUG,
			__( 'Settings', 'gatherpress' ),
			__( 'Settings', 'gatherpress' ),
			'manage_options',
			Utility::prefix_key( 'general' ),
			array( $this, 'settings_page' ),
			6
		);

		$sub_pages = $this->get_sub_pages();

		foreach ( $sub_pages as $sub_page => $setting ) {
			if ( 'general' === $sub_page ) {
				continue;
			}

			$page = Utility::prefix_key( $sub_page );

			add_submenu_page(
				self::PARENT_SLUG,
				$setting['name'],
				$setting['name'],
				'manage_options',
				$page,
				array( $this, 'settings_page' )
			);
		}
	}

	/**
	 * Add tabs/subpages to admin menu.
	 *
	 * @param array $sub_pages Tabs/subpages.
	 *
	 * @return array
	 */
	public function register_sub_pages( $sub_pages ) {
		$sub_pages['leadership'] = array(
			'name'        => __( 'Leadership', 'gatherpress' ),
			'description' => __( 'Leadership for GatherPress.', 'gatherpress' ),
			'sections'    => array(
				'roles' => array(
					'name'        => __( 'Roles', 'gatherpress' ),
					'description' => __( 'GatherPress allows you to customize role labels to be more appropriate for events.', 'gatherpress' ),
					'options'     => array(
						'organizers'           => array(
							'labels' => array(
								'name'          => __( 'Organizers', 'gatherpress' ),
								'singular_name' => __( 'Organizer', 'gatherpress' ),
								'plural_name'   => __( 'Organizers', 'gatherpress' ),
							),
							'field'  => array(
								'type'    => 'autocomplete',
								'options' => array(
									'type'  => 'user',
									'label' => __( 'Select Users', 'gatherpress' ),
								),
							),
						),
						'assistant-organizers' => array(
							'labels' => array(
								'name'          => __( 'Assistant Organizers', 'gatherpress' ),
								'singular_name' => __( 'Assistant Organizer', 'gatherpress' ),
								'plural_name'   => __( 'Assistant Organizers', 'gatherpress' ),
							),
							'field'  => array(
								'type'    => 'autocomplete',
								'options' => array(
									'type'  => 'user',
									'label' => __( 'Select Users', 'gatherpress' ),
								),
							),
						),
						'event-organizers'     => array(
							'labels' => array(
								'name'          => __( 'Event Organizers', 'gatherpress' ),
								'singular_name' => __( 'Event Organizer', 'gatherpress' ),
								'plural_name'   => __( 'Event Organizers', 'gatherpress' ),
							),
							'field'  => array(
								'type'    => 'autocomplete',
								'options' => array(
									'type'  => 'user',
									'label' => __( 'Select Users', 'gatherpress' ),
								),
							),
						),
						'event-assistants'     => array(
							'labels' => array(
								'name'          => __( 'Event Assistants', 'gatherpress' ),
								'singular_name' => __( 'Event Assistant', 'gatherpress' ),
								'plural_name'   => __( 'Event Assistants', 'gatherpress' ),
							),
							'field'  => array(
								'type'    => 'autocomplete',
								'options' => array(
									'type'  => 'user',
									'label' => __( 'Select Users', 'gatherpress' ),
								),
							),
						),
					),
				),
			),
		);
		return $sub_pages;
	}

	/**
	 * Remove submenu pages from Settings menu.
	 */
	public function remove_sub_options() {
		$sub_pages = $this->get_sub_pages();

		foreach ( $sub_pages as $sub_page => $setting ) {
			if ( 'general' === $sub_page ) {
				continue;
			}

			remove_submenu_page( self::PARENT_SLUG, Utility::prefix_key( $sub_page ) );
		}
	}

	/**
	 * Register settings page.
	 *
	 * @return void
	 */
	public function register_settings() {
		$sub_pages = $this->get_sub_pages();

		register_setting(
			'gatherpress',
			'gatherpress_settings'
		);

		foreach ( $sub_pages as $sub_page => $sub_page_settings ) {
			register_setting(
				Utility::prefix_key( $sub_page ),
				Utility::prefix_key( $sub_page )
			);

			if ( isset( $sub_page_settings['sections'] ) ) {
				foreach ( (array) $sub_page_settings['sections'] as $section => $section_settings ) {
					add_settings_section(
						$section,
						$section_settings['name'],
						function() use ( $section_settings ) {
							if ( ! empty( $section_settings['description'] ) ) {
								echo '<p class="description">' . wp_kses_post( $section_settings['description'] ) . '</p>';
							}
						},
						Utility::prefix_key( $sub_page )
					);

					if ( isset( $section_settings['options'] ) ) {
						foreach ( (array) $section_settings['options'] as $option => $option_settings ) {
							$field = $option_settings['field']['type'];

							if (
								$option_settings['field']['type']
								&& method_exists( $this, $option_settings['field']['type'] )
							) {
								$option_settings['callback'] = function() use ( $sub_page, $section, $option, $option_settings ) {
									$sub_page = Utility::prefix_key( $sub_page );
									$this->{$option_settings['field']['type']}( $sub_page, $section, $option, $option_settings );
								};
							}
							add_settings_field(
								$option,
								$option_settings['labels']['name'],
								$option_settings['callback'],
								Utility::prefix_key( $sub_page ),
								$section,
								array( 'label_for' => Utility::prefix_key( $option ) )
							);
						}
					}
				}
			}
		}
	}

	/**
	 * Outputs a text input field.
	 *
	 * @param string $sub_page        The sub page for the text field.
	 * @param string $section         The section for the text field.
	 * @param string $option          The option for the text field.
	 * @param array  $option_settings The option settings.
	 *
	 * @return void
	 */
	public function text( string $sub_page, string $section, string $option, array $option_settings ) {
		$name    = $this->get_name_field( $sub_page, $section, $option );
		$default = $option_settings['default'] ?? '';
		$value   = $this->get_value( $sub_page, $section, $option, $default );

		Utility::render_template(
			sprintf( '%s/includes/templates/admin/settings/fields/text.php', GATHERPRESS_CORE_PATH ),
			array(
				'name'        => $name,
				'option'      => Utility::prefix_key( $option ),
				'value'       => $value,
				'description' => $option_settings['description'] ?? '',
			),
			true
		);
	}

	/**
	 * Outputs a checkbox input field.
	 *
	 * @param string $sub_page        The sub page for the checkbox field.
	 * @param string $section         The section for the checkbox field.
	 * @param string $option          The option for the checkbox field.
	 * @param array  $option_settings The option settings.
	 *
	 * @return void
	 */
	public function checkbox( string $sub_page, string $section, string $option, array $option_settings ) {
		$name    = $this->get_name_field( $sub_page, $section, $option );
		$default = ( $option_settings['field']['options']['default'] ? '1' : '' );
		$value   = $this->get_value( $sub_page, $section, $option, $default );
		// $gp_settings = get_option( 'template' );
		$gp_settings = ( get_option( 'gp_general' ) ? get_option( 'gp_general' )   : 'NO SETTINGS SAVED' );
		// $gp_settings = ( get_option( 'users_can_register' ) ? 'TRUE'   : 'NO SETTINGS SAVED' );
		echo '<pre>' . print_r( $gp_settings, true ) . '</pre>';

		Utility::render_template(
			sprintf( '%s/includes/templates/admin/settings/fields/checkbox.php', GATHERPRESS_CORE_PATH ),
			array(
				'name'        => $name,
				'option'      => Utility::prefix_key( $option ),
				'value'       => $value,
				'description' => $option_settings['description'] ?? 'description unset',
			),
			true
		);
	}

	/**
	 * Outputs a dynamic select field for a type of content.
	 *
	 * @param string $sub_page        The sub page for the text field.
	 * @param string $section         The section for the text field.
	 * @param string $option          The option for the text field.
	 * @param array  $option_settings The option settings.
	 *
	 * @return void
	 */
	public function autocomplete( string $sub_page, string $section, string $option, array $option_settings ) {
		$name    = $this->get_name_field( $sub_page, $section, $option );
		$default = $option_settings['default'] ?? '';
		$value   = $this->get_value( $sub_page, $section, $option, $default );

		Utility::render_template(
			sprintf( '%s/includes/templates/admin/settings/fields/autocomplete.php', GATHERPRESS_CORE_PATH ),
			array(
				'name'          => $name,
				'option'        => Utility::prefix_key( $option ),
				'value'         => $value,
				'description'   => $option_settings['description'] ?? '',
				'field_options' => $option_settings['field']['options'] ?? array(),
			),
			true
		);
	}

	/**
	 * Outputs credits to people set in latest.json.
	 *
	 * @param string $sub_page        The sub page for the text field.
	 * @param string $section         The section for the text field.
	 * @param string $option          The option for the text field.
	 * @param array  $option_settings The option settings.
	 *
	 * @return void
	 */
	public function credits( string $sub_page, string $section, string $option, array $option_settings ) {
		$credits = include sprintf( '%s/includes/data/credits/latest.php', GATHERPRESS_CORE_PATH );

		Utility::render_template(
			sprintf( '%s/includes/templates/admin/settings/fields/credits.php', GATHERPRESS_CORE_PATH ),
			array(
				'option'  => $option,
				'credits' => $credits[ $option ],
			),
			true
		);
	}

	/**
	 * Gets the value.
	 *
	 * @param string       $sub_page The sub page of the value.
	 * @param string       $section  The section of the value.
	 * @param string       $option   The option of the value.
	 * @param mixed|string $default  The default value.
	 *
	 * @return mixed
	 */
	public function get_value( string $sub_page, string $section = '', string $option = '', $default = '' ) {
		$options = $this->get_options( $sub_page );

		if ( ! empty( $section ) && ! empty( $option ) ) {
			return ( ! empty( $options[ $section ][ $option ] ) ) ? $options[ $section ][ $option ] : $default;
		} elseif ( ! empty( $section ) ) {
			return ( ! empty( $options[ $section ] ) ) ? $options[ $section ] : $default;
		}

		return $options;
	}

	/**
	 * Get currently set options from a GatherPress sub page.
	 *
	 * @param string $sub_page The sub page to get options.
	 *
	 * @return array
	 */
	public function get_options( string $sub_page ): array {
		$option = get_option( $sub_page );

		if ( ! empty( $option ) && is_array( $option ) ) {
			return $option;
		}
		
		//Get current options
		$current_options = get_option( 'gp_general' );

		//Check if they are empty or null/false
		if ( !$current_options || empty( $current_options ) ) {

			//Grab defaults
			$defaults = $this->get_option_defaults( $sub_page );

			//If options are empty or false, set the defaults
			$result = update_option( 'gp_general', $defaults );

			//Grab updated options for returning
			$current_options = get_option( 'gp_general' );
		}
		return $current_options;
	}

	/**
	 * Default options for GatherPress sub pages.
	 *
	 * @param string $option The option to get the default.
	 *
	 * @return array
	 */
	public function get_option_defaults( string $option ): array {
		$sub_pages = $this->get_sub_pages();
		$option    = Utility::unprefix_key( $option );
		$defaults  = array();

		if ( ! empty( $sub_pages[ $option ]['sections'] ) && is_array( $sub_pages[ $option ]['sections'] ) ) {
			foreach ( $sub_pages[ $option ]['sections'] as $section => $settings ) {
				if ( ! is_array( $settings['options'] ) ) {
					continue;
				}

				foreach ( $settings['options'] as $option => $values ) {
					$defaults[ $section ][ $option ] = $values['field']['options']['default'] ?? '';
				}
			}
		}

		return $defaults;
	}

	/**
	 * Create name field for setting.
	 *
	 * @param string $sub_page Sub page of name field.
	 * @param string $section  Section of name field.
	 * @param string $option   Option of name field.
	 *
	 * @return string
	 */
	public function get_name_field( string $sub_page, string $section, string $option ): string {
		return sprintf(
			'%s[%s][%s]',
			sanitize_key( $sub_page ),
			sanitize_key( $section ),
			sanitize_key( $option )
		);
	}

	/**
	 * Get sub pages for options page.
	 *
	 * @return array
	 */
	public function get_sub_pages(): array {
		$gp_admin_tabs = array(
			'general' => array(
				'name'        => __( 'General', 'gatherpress' ),
				'description' => __( 'Settings for GatherPress.', 'gatherpress' ),
				'priority'    => PHP_INT_MIN,
				'sections'    => array(
					'general' => array(
						'name'        => __( 'General Settings', 'gatherpress' ),
						'description' => __( 'GatherPress needs <b><em>Mike</em></b> to show us how to save the initial settings upon activation.', 'gatherpress' ),
						'options'     => array(
							'post_or_event_date' => array(
								'labels' => array(
									'name' => __( 'Show post date as Event date', 'gatherpress' ),
								),
								'field'  => array(
									'type'    => 'checkbox',
									'options' => array(
										'default' => '1',
									),
								),
							),
						),
					),
					'pages' => array(
						'name'        => __( 'Event Archive Pages', 'gatherpress' ),
						'description' => __( 'GatherPress allows you to set event archives to pages you have created.', 'gatherpress' ),
						'options'     => array(
							'upcoming_events'    => array(
								'labels' => array(
									'name' => __( 'Upcoming Events', 'gatherpress' ),
								),
								'field'  => array(
									'type'    => 'autocomplete',
									'options' => array(
										'type'  => 'page',
										'label' => __( 'Select Page', 'gatherpress' ),
										'limit' => 1,
									),
								),
							),
							'past_events'        => array(
								'labels' => array(
									'name' => __( 'Past Events', 'gatherpress' ),
								),
								'field'  => array(
									'type'    => 'autocomplete',
									'options' => array(
										'type'  => 'page',
										'label' => __( 'Select Page', 'gatherpress' ),
										'limit' => 1,
									),
								),
							),
						),
					),
				),
			),
			'credits' => array(
				'name'     => __( 'Credits', 'gatherpress' ),
				'priority' => PHP_INT_MAX,
				'sections' => array(
					'credits' => array(
						'name'        => __( 'Credits', 'gatherpress' ),
						'description' => sprintf(
							/* translators: %1$s: opening anchor tag, %2$s closing anchor tag. */
							__( 'Meet the folks behind GatherPress. Want to see your name here? %1$sGet Involved!%2$s', 'gatherpress' ),
							'<a href="https://github.com/GatherPress/gatherpress" target="_blank">',
							'</a>'
						),
						'options'     => array(
							'project-leads'    => array(
								'labels' => array(
									'name' => __( 'Project Leads', 'gatherpress' ),
								),
								'field'  => array(
									'type' => 'credits',
								),
							),
							'gatherpress-team' => array(
								'labels' => array(
									'name' => __( 'GatherPress Team', 'gatherpress' ),
								),
								'field'  => array(
									'type' => 'credits',
								),
							),
							'contributors'     => array(
								'labels' => array(
									'name' => __( 'Contributors', 'gatherpress' ),
								),
								'field'  => array(
									'type' => 'credits',
								),
							),
						),
					),
				),
			),
		);

		$gp_admin_tabs = (array) apply_filters( 'gatherpress_settings_sub_pages', $gp_admin_tabs );

		uasort( $gp_admin_tabs, array( $this, 'sort_sub_pages_by_priority' ) );

		return $gp_admin_tabs;
	}

	/**
	 * Get Role options and settings for Language -> Roles.
	 *
	 * @return array
	 */
	public function get_role_options(): array {
		$role                = Role::get_instance();
		$role_names          = $role->get_roles();
		$role_defaults_names = $role->get_default_role_names();
		$options             = array();

		foreach ( $role_names as $role_name => $value ) {
			$options[ $role_name ] = array(
				'label'   => $value['name'],
				'field'   => 'text',
				'default' => $role_defaults_names[ $role_name ] ?? '',
			);
		}

		return $options;
	}

	/**
	 * Get list of user roles.
	 *
	 * @todo add to class-attendee.php
	 *
	 * @return array
	 */
	public function get_user_roles(): array {
		$sub_pages = $this->get_sub_pages();
		$options   = (array) $sub_pages['leadership']['sections']['roles']['options'];

		return $options ?? array();
	}


	/**
	 * Return role of the user.
	 *
	 * @todo add to class-attendee.php
	 *
	 * @param int $user_id User ID.
	 *
	 * @return string
	 */
	public function get_user_role( int $user_id ): string {
		$leadership = get_option( Utility::prefix_key( 'leadership' ) );
		$roles      = $leadership['roles'] ?? array();
		$default    = __( 'Member', 'gatherpress' );

		foreach ( $roles as $role => $users ) {
			foreach ( json_decode( $users ) as $user ) {
				if ( intval( $user->id ) === $user_id ) {
					$roles = $this->get_user_roles();

					return $roles[ $role ]['labels']['singular_name'] ?? $default;
				}
			}
		}

		return $default;
	}

	/**
	 * Sort associative array by priority. 10 is default.
	 *
	 * @param array $first  First to compare priority.
	 * @param array $second Second to compare priority.
	 *
	 * @return int
	 */
	public function sort_sub_pages_by_priority( array $first, array $second ): int {
		$first['priority']  = isset( $first['priority'] ) ? intval( $first['priority'] ) : 10;
		$second['priority'] = isset( $second['priority'] ) ? intval( $second['priority'] ) : 10;

		return ( $first['priority'] > $second['priority'] );
	}

	/**
	 * Render the options page.
	 */
	public function settings_page() {
		Utility::render_template(
			sprintf( '%s/includes/templates/admin/settings/index.php', GATHERPRESS_CORE_PATH ),
			array(
				'sub_pages' => $this->get_sub_pages(),
				'page'      => $this->page,
			),
			true
		);
	}

	/**
	 * Select GatherPress in menu for all sub pages.
	 *
	 * @param string $submenu Name of sub menu page.
	 *
	 * @return string
	 */
	public function select_menu( $submenu ): string {
		if ( empty( $submenu ) ) {
			$sub_pages = $this->get_sub_pages();

			if ( ! empty( $sub_pages ) ) {
				$page = Utility::unprefix_key( $this->page );

				if ( isset( $sub_pages[ $page ] ) ) {
					$submenu = Utility::prefix_key( 'general' );
				}
			}
		}

		return (string) $submenu;
	}

}
