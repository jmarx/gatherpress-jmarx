/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * Internal dependencies.
 */
import { isEventPostType } from '../../helpers/event';
import AnonymousRsvpPanel from './anonymous-rsvp';
import InitialDeclinePanel from './initial-decline';
import DateTimeRangePanel from './datetime-range';
import GuestLimitPanel from './guest-limit';
import NotifyMembersPanel from './notify-members';
import OnlineEventLinkPanel from './online-link';
import VenueSelectorPanel from './venue-selector';

/**
 * A settings panel for event-specific settings in the block editor.
 *
 * This component renders a `PluginDocumentSettingPanel` containing various
 * subpanels for configuring event-related settings, such as date and time,
 * venue selection, online event link, and notifying members.
 *
 * @since 1.0.0
 *
 * @return {JSX.Element | null} The JSX element for the EventSettings panel if
 * the current post type is an event; otherwise, returns null.
 */
const EventSettings = () => {
	return (
		isEventPostType() && (
			<PluginDocumentSettingPanel
				name="gatherpress-event-settings"
				title={__('Event settings', 'gatherpress')}
				initialOpen={true}
				className="gatherpress-event-settings"
			>
				<VStack spacing={6}>
					<DateTimeRangePanel />
					<VenueSelectorPanel />
					<OnlineEventLinkPanel />
					<GuestLimitPanel />
					<AnonymousRsvpPanel />
					<InitialDeclinePanel />
					<NotifyMembersPanel />
				</VStack>
			</PluginDocumentSettingPanel>
		)
	);
};

/**
 * Registers the 'gatherpress-event-settings' plugin.
 *
 * This function registers a custom plugin named 'gatherpress-event-settings' and
 * associates it with the `EventSettings` component for rendering.
 *
 * @since 1.0.0
 *
 * @return {void}
 */
registerPlugin('gatherpress-event-settings', {
	render: EventSettings,
});

/**
 * Toggles the visibility of the 'gatherpress-event-settings' panel in the Block Editor.
 *
 * This function uses the `dispatch` function from the `@wordpress/data` package
 * to toggle the visibility of the 'gatherpress-event-settings' panel in the Block Editor.
 * The panel is identified by the string 'gatherpress-event-settings/gatherpress-event-settings'.
 *
 * @since 1.0.0
 *
 * @return {void}
 */
dispatch('core/edit-post').toggleEditorPanelOpened(
	'gatherpress-event-settings/gatherpress-event-settings'
);
