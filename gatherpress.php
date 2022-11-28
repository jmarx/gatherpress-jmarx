<?php
/**
 * Plugin Name:         GatherPress
 * Plugin URI:          https://gatherpress.org/
 * Description:         GatherPress adds event management and more to WordPress.
 * Author:              The GatherPress Community
 * Author URI:          https://gatherpess.org/
 * Version:             0.12.0
 * Minimum PHP Version: 7.3
 * Text Domain:         gatherpress
 * License:             GPLv2 or later (license.txt)
 *
 * @package GatherPress
 */

// Constants.
define( 'GATHERPRESS_VERSION', current( get_file_data( __FILE__, array( 'Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_MINIMUM_PHP_VERSION', current( get_file_data( __FILE__, array( 'Minimum PHP Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_CORE_PATH', __DIR__ );
define( 'GATHERPRESS_CORE_FILE', __FILE__ );
define( 'GATHERPRESS_CORE_URL', plugin_dir_url( __FILE__ ) );
define( 'GATHERPRESS_REST_NAMESPACE', 'gatherpress/v1' );

// Bail if things do not meet minimum plugin requirements.
if ( ! require_once GATHERPRESS_CORE_PATH . '/includes/preflight.php' ) {
	return;
}

require_once GATHERPRESS_CORE_PATH . '/includes/classes/class-autoloader.php';

GatherPress\Includes\Autoloader::register();
GatherPress\Includes\Setup::get_instance();
// GatherPress\Includes\BuddyPress\Setup::get_instance();


add_action( 'init', 'gatherpress_gp_blocks_init' );
/**
 * Register the blocks with PHP.
 *
 * @return void
 */
function gatherpress_gp_blocks_init() {
	register_block_type(
		__DIR__ . '/build/blocks/add-to-calendar',
		[
			'render_callback' => 'gp_blocks_add_to_calendar_render_callback',
			'view_script' => 'add-to-calendar',
		]
	);
	register_block_type(
		__DIR__ . '/build/blocks/attendance-list'
	);
	register_block_type(
		__DIR__ . '/build/blocks/attendance-selector'
	);
	register_block_type(
		__DIR__ . '/build/blocks/event-date',
		[
			'render_callback' => 'gp_blocks_event_date_render_callback'
		]
	);
	register_block_type(
		__DIR__ . '/build/blocks/events-list',
		[
			'render_callback' => 'gp_blocks_events_list_render_callback'
		]
	);
	register_block_type(
		__DIR__ . '/build/blocks/venue',
		[
			'render_callback' => 'gp_blocks_venue_render_callback'
		]
	);
	register_block_type(
		__DIR__ . '/build/blocks/venue-information'
	);
}

add_action( 'init', 'gatherpress_gp_sample_blocks_init' );
/**
 * Undocumented function
 *
 * @return void
 */
function gatherpress_gp_sample_blocks_init() {
	register_block_type(
		__DIR__ . '/build/sample-blocks/block-starter'
	);
	register_block_type(
		__DIR__ . '/build/sample-blocks/example-dynamic',
		[
			'render_callback' => 'gp_blocks_example_dynamic_render_callback'
		]
	);
}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_add_to_calendar_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/blocks/add-to-calendar/template.php';
	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_attendance_list_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/blocks/attendance-list/sample.php';

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_attendance_selector_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/blocks/attendance-selector/sample.php';

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_example_dynamic_render_callback( $attributes, $content, $block ) {
	ob_start();

	require plugin_dir_path( __FILE__ ) . 'build/sample-blocks/example-dynamic/template.php';

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );
}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_event_date_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/blocks/event-date/template.php';

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );
}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_events_list_render_callback( $attributes, $content, $block ) {
	ob_start();
	echo '<h3>build/blocks/events-list/sample.php</h3>';
	echo  $content;

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_venue_render_callback( $attributes, $content, $block ) {
	ob_start();
	$timezone = get_option('timezone_string');
	if ( ! $timezone ) {
		$timezone = ' / timezone unset';
	}
	if ( ! isset( $attributes['venueId'] ) ) {
		return '<p>Venue unset' . $timezone . '</p>';
	}
	$gatherpress_venue = get_post( intval( $attributes['venueId'] ) );

	$gatherpress_venue_information = json_decode( get_post_meta( $gatherpress_venue->ID, '_venue_information', true ) );
	?>
	<div class="gp-venue">
		<?php
		GatherPress\Includes\Utility::render_template(
			sprintf( '%s/templates/blocks/venue-information.php', GATHERPRESS_CORE_PATH ),
			array(
				'gatherpress_block_attrs' => array(
					'name'        => $gatherpress_venue->post_title,
					'fullAddress' => $gatherpress_venue_information->fullAddress ?? '', // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
					'phoneNumber' => $gatherpress_venue_information->phoneNumber ?? '', // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
					'website'     => $gatherpress_venue_information->website ?? '',
				),
			),
			true
		);
		?>
	</div>
	<?php

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return $block_content;
	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function gp_blocks_venue_information_render_callback( $attributes, $content, $block ) {
	ob_start();
	echo $content;
	echo '<p>' . __FUNCTION__ . '<pre>' . print_r( $attributes, true ) . '</pre>';

	$block_content = ob_get_clean();

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf( '<div %s>%s</div>', $wrapper_attributes, $block_content  );

}

add_action( 'wp_enqueue_scripts', 'add_to_calendar_script' );
/**
 * Undocumented function
 *
 * @return void
 */
function add_to_calendar_script() {
	wp_register_script(
		'add-to-calendar',
		plugins_url( 'includes/js/add-to-calendar.js', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'includes/js/add-to-calendar.js' ),
		true
	);
}

// add_filter( 'render_block', 'show_the_block_constituents', 10, 2 );
/**
 * [show_the_block_constituents] Debug code for showing the parts of WP Blocks
 *
 * @param  [string] $block_content
 * @param  [array]  $block
 * @return [string]
 */
function show_the_block_constituents( $block_content, $block ) {
	if ( true === WP_DEBUG && current_user_can( 'administrator' ) ) {
		$block_content = "<div class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}</div>" . ( 'string' === gettype( $block['blockName'] ) ? '<pre><xmp> $block_content = ' . gettype( $block_content ) . " {$block['blockName']} " . print_r( $block, true ) . '</xmp></pre>' : '' );
	}
	return $block_content;
}

// add_filter( 'render_block', 'wplancpa_2019_show_block_type', 10, 2 );
/**
 * Undocumented function
 *
 * @param [type] $block_content
 * @param [type] $block
 * @return void
 */
function wplancpa_2019_show_block_type( $block_content, $block ) {
	if ( true === WP_DEBUG ) {
		$block_content = "<h5 style=\"color:salmon\">{$block['blockName']}</h5><div class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}</div>";
	}
	return $block_content;
}

add_action('admin_notices', 'timezone_check_admin_notice');
/**
 * display custom admin notice function
 *
 * @return void
 */
function timezone_check_admin_notice() {
	$timezone = get_option('timezone_string');
	if ( $timezone ) {
		return;
	}
	?>
	<div class="notice notice-error is-dismissible">
		<p><?php _e('Please set your timezone in order to ensure proper GatherPress settings!', 'gatherpress'); ?></p>
	</div>
<?php
}
