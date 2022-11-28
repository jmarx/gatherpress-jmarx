<?php
/**
 * Class is responsible for all utility related functionality.
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
 * Class Utility.
 */
class Utility {

	/**
	 * Render template.
	 *
	 * @param string $path      Path to template.
	 * @param array  $variables Array of variables to pass to template.
	 * @param bool   $echo      Echo or return the template.
	 *
	 * @return string
	 */
	public static function render_template( string $path, array $variables = array(), bool $echo = false ): string {
		if ( ! file_exists( $path ) ) {
			return '';
		}

		if ( ! empty( $variables ) ) {
			extract( $variables, EXTR_SKIP ); // phpcs:ignore WordPress.PHP.DontExtract.extract_extract
		}

		if ( true === $echo ) {
			require $path;
			return '';
		}

		ob_start();
		require $path;
		return ob_get_clean();
	}

	/**
	 * Add gp- prefix.
	 *
	 * @param string $key The key for adding prefix.
	 *
	 * @return string
	 */
	public static function prefix_key( string $key ): string {
		return sprintf( 'gp_%s', $key );
	}

	/**
	 * Remove gp- prefix.
	 *
	 * @param string $key The key for removing prefix.
	 *
	 * @return string
	 */
	public static function unprefix_key( string $key ): string {
		return preg_replace( '/^gp_/', '', $key );
	}

}
