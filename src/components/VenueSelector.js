/**
 * External dependencies.
 */
import HtmlReactParser from 'html-react-parser';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, SelectControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, select } from '@wordpress/element';
import { createBlock, removeBlock } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { Broadcaster } from '../helpers/broadcasting';

const VenueSelectorPanel = () => {
	const { removeBlock } = useDispatch('core/block-editor');
	const allVenues = useSelect((select) => {
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

	/** grab block ids for venue and online event */
	const { blocks } = useSelect((select) => ({
		blocks: select('core/block-editor').getBlocks(),
	}));
	const onlineBlock = blocks.filter(
		(block) => block.name === 'gatherpress/online-event'
	);
	let onlineClientId;
	if (onlineBlock.length > 0) {
		onlineClientId = onlineBlock[0].clientId;
	}
	const venueBlock = blocks.filter(
		(block) => block.name === 'gatherpress/event-venue'
	);
	let venueClientId;
	if (venueBlock.length > 0) {
		venueClientId = venueBlock[0].clientId;
	}

	/** InsertBlock code to create new block */
	const { insertBlock } = useDispatch('core/block-editor');

	const [venue, setVenue] = useState('');
	const editPost = useDispatch('core/editor').editPost;
	const { unlockPostSaving } = useDispatch('core/editor');
	const venueTermId = useSelect((select) =>
		select('core/editor').getEditedPostAttribute('_gp_venue')
	);
	const venueTerm = useSelect((select) =>
		select('core').getEntityRecord('taxonomy', '_gp_venue', venueTermId)
	);
	const venueSlug = venueTerm?.slug.slice(1, venueTerm?.slug.length);
	const venueValue = venueTermId + ':' + venueSlug;
	useEffect(() => {
		setVenue(String(venueValue) ?? '');
		Broadcaster({
			setVenueSlug: venueSlug,
		});
	}, [venueValue, venueSlug]);

	let venues = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', '_gp_venue', {
			per_page: -1,
			context: 'view',
		});
	}, []);

	if (venues) {
		venues = venues.map((item) => ({
			label: HtmlReactParser(item.name),
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
		/**   */
		if (term[0] !== String(onlineId)) {
			removeBlock(onlineClientId);
			const newBlock = createBlock('gatherpress/event-venue');
			insertBlock(newBlock);
		} else {
			removeBlock(venueClientId);
			const newBlock = createBlock('gatherpress/online-event');
			insertBlock(newBlock);
		}
		editPost({ _gp_venue: term });
		/**   */
		Broadcaster({
			setVenueSlug: value[1],
		});
		unlockPostSaving();
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
