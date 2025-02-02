<?php
/**
 * Class handles unit tests for GatherPress\Core\Attendee.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

namespace GatherPress\Tests\Core;

use GatherPress\Core\Attendee;
use PMC\Unit_Test\Base;

/**
 * Class Test_Attendee.
 *
 * @coversDefaultClass \GatherPress\Core\Attendee
 */
class Test_Attendee extends Base {

	/**
	 * Coverage for get method.
	 *
	 * @covers ::get
	 *
	 * @return void
	 */
	public function test_get_attendee(): void {
		$post     = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee = new Attendee( $post->ID );
		$user     = $this->mock->user()->get();
		$status   = 'attending';

		$this->assertEmpty( $attendee->get( 0 ) );
		$this->assertEquals( 0, $attendee->get( $user->ID )['id'] );

		$attendee->save( $user->ID, $status );

		$data = $attendee->get( $user->ID );

		$this->assertSame( $post->ID, intval( $data['post_id'] ) );
		$this->assertSame( $user->ID, intval( $data['user_id'] ) );
		$this->assertSame( $status, $data['status'] );
		$this->assertIsInt( strtotime( $data['timestamp'] ) );
		$this->assertNotEmpty( $data['id'] );
	}

	/**
	 * Coverage for save method.
	 *
	 * @covers ::save
	 * @covers ::__construct
	 */
	public function test_save(): void {
		$post     = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee = new Attendee( $post->ID );
		$user     = $this->mock->user()->get();
		$status   = 'attending';

		$this->assertSame( $status, $attendee->save( $user->ID, $status ) );

		$status = 'not_attending';

		$this->assertSame( $status, $attendee->save( $user->ID, $status ) );

		$this->assertEmpty( $attendee->save( 0, $status ) );

		$status = 'unittest';

		$this->assertEmpty( $attendee->save( $user->ID, $status ) );
	}

	/**
	 * Coverage for check_waiting_list method.
	 *
	 * @covers ::check_waiting_list
	 *
	 * @return void
	 */
	public function test_check_waiting_list(): void {
		$post     = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee = new Attendee( $post->ID );

		$this->assertSame( 0, $attendee->check_waiting_list(), 'Failed to assert expected waiting list value.' );
	}

	/**
	 * Coverage for attending_limit_reached method.
	 *
	 * @covers ::attending_limit_reached
	 *
	 * @return void
	 */
	public function test_attending_limit_reached(): void {
		$post     = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee = new Attendee( $post->ID );

		$this->assertFalse(
			$attendee->attending_limit_reached( 'attending' ),
			'Failed to assert that limit has not been reached.'
		);
	}

	/**
	 * Coverages for attendees method.
	 *
	 * @covers ::attendees
	 * @covers ::sort_by_role
	 *
	 * @return void
	 */
	public function test_attendees(): void {
		$post      = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee  = new Attendee( $post->ID );
		$user_id_1 = wp_create_user( 'user_1', 'unittest' );
		$user_id_2 = wp_create_user( 'user_2', 'unittest' );

		$attendee->save( $user_id_1, 'attending' );
		$attendee->save( $user_id_2, 'not_attending' );

		$attendees = $attendee->attendees();

		$this->assertEquals( 2, $attendees['all']['count'], 'Failed to assert that count is 2.' );
		$this->assertEquals(
			$user_id_1,
			$attendees['attending']['attendees'][0]['id'],
			'Failed to assert user ID matches.'
		);
		$this->assertEquals(
			$user_id_2,
			$attendees['not_attending']['attendees'][0]['id'],
			'Failed to assert user ID matches.'
		);
	}

	/**
	 * Coverage for sort_by_timestamp method.
	 *
	 * @covers ::sort_by_timestamp
	 *
	 * @return void
	 */
	public function test_sort_by_timestamp(): void {
		$post     = $this->mock->post(
			array(
				'post_type' => 'gp_event',
			)
		)->get();
		$attendee = new Attendee( $post->ID );
		$newer    = array( 'timestamp' => '2023-05-11 08:30:00' );
		$older    = array( 'timestamp' => '2022-05-11 08:30:00' );

		$this->assertFalse(
			$attendee->sort_by_timestamp( $newer, $older ),
			'Failed to assert correct sorting of timestamp.'
		);
		$this->assertTrue(
			$attendee->sort_by_timestamp( $older, $newer ),
			'Failed to assert correct sorting of timestamp.'
		);
	}

}
