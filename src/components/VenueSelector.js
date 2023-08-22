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
	// Two Approaches for updating taxonomy for a post using the gutenberg editor

	//Approach #1 (perferred)
	//editPost({ _gp_venue: [8] });
	//console.log('edit post has been called. So we should now see test as the venue and not the WM');
	//
	// Approach #2 (workaround)
	// apiFetch( {
	// 	path: '/wp/v2/gp_event/85',
	// 	method: 'POST',
	// 	data: {
	// 		title: 'Testing from REST API 6',
	// 		_gp_venue: [7],
	// 	},
	// }).then((res) => {
	// 	console.log(res._gp_venue);
	// 	setVenue([7]);
	// } );
	// console.log('The api has been queried and we set the venue back to WM. So we should now see WM as the venue and not test');

	/**
	 * Approach #1 is obviously the right way and preferred approach.
	 * But, we cannot pass an array of _gp_venue terms to editPost. Why?
	 * That answer is a mystery
	 * editPost({ _gp_venue: [1,2] }); does not work.
	 * editPost({ gp_topic: [1,2] }); works with a different taxonomy. So it is something with _gp_venue
	 *
	 * Because of that anomoly I had investigate alternate ways to update a taxonomy term in a post
	 * So we arrive at Approach #2, which is a straight call to the Core REST API
	 * This approach if functional, but it only works when you do the call and refresh the page.
	 * Obviously, that doesn't help us.
	 *
	 * This is where we are at.
	 * Next steps.
	 * Ideally we figure out what is wrong with _gp_venue.
	 * Or, we fix the core REST API call so it is immediately reactive.
	 */

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
