/**
 * External dependencies.
 */
import HtmlReactParser from 'html-react-parser';

/**
 * Internal dependencies.
 */
import AttendanceSelector from './AttendanceSelector';
import AttendeeList from './AttendeeList';
import AttendeeResponse from './AttendeeResponse';

const EventItem = (props) => {
	const { type, event, eventOptions } = props;
	const limitExcerpt = (excerpt) => {
		return (
			excerpt
				.split(' ')
				.splice(0, parseInt(eventOptions.descriptionLimit))
				.join(' ') + '[…]'
		);
	};
	const size =
		eventOptions.imageSize === 'default'
			? 'featured_image'
			: 'featured_image_' + eventOptions.imageSize;
	const featuredImage = HtmlReactParser(event[size]);
	const eventClass = `gp-events-list`;

	return (
		<div className={`${eventClass}`}>
			<div className={`${eventClass}__header`}>
				<div className={`${eventClass}__info`}>
					{eventOptions.showFeaturedImage && (
						<figure className={`${eventClass}__image`}>
							<a href={event.permalink}>{featuredImage}</a>
						</figure>
					)}
					<div
						className={`${eventClass}__datetime has-small-font-size`}
					>
						<strong>{event.datetime_start}</strong>
					</div>
					<div className={`${eventClass}__title has-large-font-size`}>
						<a href={event.permalink}>
							{HtmlReactParser(event.title)}
						</a>
					</div>
					{event.venue && (
						<div className={`${eventClass}__venue`}>
							<span className="dashicons dashicons-location"></span>
							<a href={event.venue.permalink}>
								{HtmlReactParser(event.venue.name)}
							</a>
						</div>
					)}
					{eventOptions.showDescription && (
						<div className={`${eventClass}__content`}>
							<div className={`${eventClass}__excerpt`}>
								{HtmlReactParser(limitExcerpt(event.excerpt))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={`${eventClass}__footer`}>
				{eventOptions.showAttendeeList && (
					<div className="gp-attendance-list__items">
						<AttendeeList
							eventId={event.ID}
							value="attending"
							attendees={event.attendees}
							limit="3"
							avatarOnly={true}
						/>
					</div>
				)}
				{'upcoming' === type && eventOptions.showRsvpButton && (
					<AttendanceSelector
						eventId={event.ID}
						currentUser={event.current_user}
						type={type}
					/>
				)}

				{'past' === type &&
					eventOptions.showRsvpButton &&
					'' !== event.current_user && (
						<AttendeeResponse
							type={type}
							status={event.current_user?.status}
						/>
					)}
			</div>
		</div>
	);
};

export default EventItem;
