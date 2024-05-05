/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { getFromGlobal } from '../helpers/globals';

/**
 * AnonymousRsvp component.
 *
 * This component renders a checkbox control that allows toggling the anonymous RSVP feature for an event.
 * It handles the state and updates the post's metadata accordingly. When creating a new event, the default
 * state of the checkbox is determined by a global setting. For existing events, it uses the event's current
 * setting. The component ensures that changes are reflected in the post's metadata and also unlocks post saving.
 *
 * @return {JSX.Element} A checkbox control for enabling or disabling anonymous RSVPs.
 */
const GuestLimit = () => {
	const { editPost, unlockPostSaving } = useDispatch('core/editor');
	const isNewEvent = useSelect((select) => {
		return select('core/editor').isCleanNewPost();
	}, []);

	let defaultGuestLimit = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta')
			.gatherpress_max_guest_limit;
	}, []);

	if (isNewEvent) {
		defaultGuestLimit = getFromGlobal('settings.maxGuestLimit');
	}

	if (false === defaultGuestLimit) {
		defaultGuestLimit = 0;
	}

	const [guestLimit, setGuestLimit] = useState(defaultGuestLimit);

	const updateGuestLimit = useCallback(
		(value) => {
			const meta = { gatherpress_max_guest_limit: Number(value) };

			setGuestLimit(value);
			editPost({ meta });
			unlockPostSaving();
		},
		[editPost, unlockPostSaving]
	);

	useEffect(() => {
		if (isNewEvent && defaultGuestLimit !== 0) {
			updateGuestLimit(defaultGuestLimit);
		}
	}, [isNewEvent, defaultGuestLimit, updateGuestLimit]);

	return (
		<NumberControl
			label={__('Maximum Number of Guests', 'gatherpress')}
			value={guestLimit}
			min={0}
			max={5}
			onChange={(value) => {
				updateGuestLimit(value);
			}}
		/>
	);
};

export default GuestLimit;
