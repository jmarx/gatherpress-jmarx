/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, SelectControl } from '@wordpress/components';
import { useSelect, useDispatch, select } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { Broadcaster } from '../helpers/broadcasting';

const VenueSelectorPanel = () => {
	const { insertBlock } = useDispatch('core/block-editor');
	const [venue, setVenue] = useState('');
	const editPost = useDispatch('core/editor').editPost;
	const { unlockPostSaving } = useDispatch('core/editor');
	const venueTermId = useSelect(() =>
		select('core/editor').getEditedPostAttribute('_gp_venue')
	);

	/** Ensure that only the in-person venue is set as state */
	const allVenues = useSelect(() => {
		return select('core').getEntityRecords('taxonomy', '_gp_venue', {
			per_page: -1,
			context: 'view',
		});
	}, []);
	let onlineId;
	if (allVenues) {
		// eslint-disable-next-line array-callback-return
		allVenues.map((venue) => {
			if (venue.slug === 'online') {
				onlineId = venue.id;
			}
		});
	}

	let inPersonVenueId;
	if (onlineId) {
		inPersonVenueId = venueTermId.filter((item) => item !== onlineId);
	}

	const venueTerm = useSelect(() =>
		select('core').getEntityRecord('taxonomy', '_gp_venue', inPersonVenueId)
	);

	const venueSlug = venueTerm?.slug.slice(1, venueTerm?.slug.length);
	const venueValue = inPersonVenueId + ':' + venueSlug;
	useEffect(() => {
		setVenue(String(venueValue) ?? '');
		Broadcaster({
			setVenueSlug: venueSlug,
		});
	}, [venueValue, venueSlug]);

	const { blocks } = useSelect(() => ({
		blocks: select('core/block-editor').getBlocks(),
	}));
	const venueBlock = blocks.filter(
		(block) => block.name === 'gatherpress/event-venue'
	);
	let venues = useSelect(() => {
		const items = select('core').getEntityRecords('taxonomy', '_gp_venue', {
			per_page: -1,
			context: 'view',
		});
		let inPersonVenues;
		if (items) {
			inPersonVenues = items.filter((item) => item.slug !== 'online');
		}
		return inPersonVenues;
	}, []);

	if (venues) {
		venues = venues.map((item) => ({
			label: item.name,
			value: item.id + ':' + item.slug.slice(1, item.slug.length),
		}));

		venues.unshift({
			value: ':',
			label: __('Choose a venue', 'gatherpress'),
		});
	} else {
		venues = [];
	}

	const updateTerm = (value) => {
		setVenue(value);
		value = value.split(':');
		const term = '' !== value[0] ? [value[0]] : [];
		editPost({ _gp_venue: term });
		Broadcaster({
			setVenueSlug: value[1],
		});
		unlockPostSaving();
		if (venueBlock.length === 0) {
			const newBlock = createBlock('gatherpress/event-venue');
			insertBlock(newBlock);
		}
	};

	return (
		<PanelRow>
			<SelectControl
				label={__('Venue Selector', 'gatherpress')}
				value={venue}
				onChange={(value) => {
					updateTerm(value);
				}}
				options={venues}
			/>
		</PanelRow>
	);
};

export default VenueSelectorPanel;
