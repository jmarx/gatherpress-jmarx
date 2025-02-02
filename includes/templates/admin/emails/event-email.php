<?php
/**
 * Email template.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

use GatherPress\Core\Event;

if ( ! isset( $event_id, $message ) ) {
	return;
}

$gatherpress_event = new Event( $event_id );
$gatherpress_venue = $gatherpress_event->get_venue_information()['name'];

?>

<!DOCTYPE html>
<html>
	<head>
		<title><?php echo wp_kses_post( get_the_title( $event_id ) ); ?></title>
	</head>
	<body style="font-family: Arial, sans-serif;">
		<?php if ( ! empty( $message ) ) : ?>
			<p style="margin-bottom: 16px;">
				<?php echo esc_html( $message ); ?>
			</p>
		<?php endif; ?>
		<!-- Feature Image -->
		<img src="<?php echo esc_url( get_the_post_thumbnail_url( $event_id, 'full' ) ); ?>" alt="<?php esc_attr_e( 'Event Image', 'gatherpress' ); ?>" style="max-width: 100%;">

		<!-- Event Title -->
		<h1 style="text-align: center;"><?php echo wp_kses_post( get_the_title( $event_id ) ); ?></h1>

		<!-- Date & Time -->
		<p style="text-align: center;">
			<?php
			/* translators: %s: gatherpress_event date and time. */
			printf( esc_html__( 'Date: %s', 'gatherpress' ), esc_html( $gatherpress_event->get_display_datetime() ) );
			?>
		</p>

		<!-- Venue -->
		<?php if ( ! empty( $gatherpress_venue ) ) : ?>
			<p style="text-align: center;">
				<?php
				/* translators: %s: gatherpress_event gatherpress_venue name. */
				printf( esc_html__( 'Venue: %s', 'gatherpress' ), wp_kses_post( $gatherpress_venue ) );
				?>
			</p>
		<?php endif; ?>

		<!-- RSVP Button -->
		<div style="text-align: center; margin-top: 20px;">
			<a href="<?php echo esc_url( get_the_permalink( $event_id ) ); ?>" style="background-color: #007bff; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
				<?php esc_html_e( 'RSVP Now', 'gatherpress' ); ?>
			</a>
		</div>

		<!-- Excerpt -->
		<p style="text-align: left;"><?php echo esc_html( get_the_excerpt( $event_id ) ); ?></p>

	</body>
</html>
