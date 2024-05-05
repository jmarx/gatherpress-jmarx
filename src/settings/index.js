/**
 * WordPress dependencies.
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import Autocomplete from '../components/Autocomplete';
import { dateTimePreview } from '../helpers/datetime';

/**
 * Autocomplete Initialization
 *
 * This script initializes the autocomplete functionality for all elements
 * with the attribute 'data-gatherpress_component_name' set to 'autocomplete'.
 * It iterates through all matching elements and initializes an Autocomplete component
 * with the attributes provided in the 'data-gatherpress_component_attrs' attribute.
 *
 * @since 1.0.0
 */

// Select all elements with the attribute 'data-gatherpress_component_name' set to 'autocomplete'.
const autocompleteContainers = document.querySelectorAll(
	`[data-gatherpress_component_name="autocomplete"]`
);

// Iterate through each matched element and initialize Autocomplete component.
for (let i = 0; i < autocompleteContainers.length; i++) {
	// Parse attributes from the 'data-gatherpress_component_attrs' attribute.
	const attrs = JSON.parse(
		autocompleteContainers[i].dataset.gatherpress_component_attrs
	);

	// Create a root element and render the Autocomplete component with the parsed attributes.
	createRoot(autocompleteContainers[i]).render(
		<Autocomplete attrs={attrs} />
	);
}

/**
 * DateTime Preview Initialization
 *
 * This script initializes the DateTime Preview functionality for all elements
 * with the attribute 'data-gatherpress_component_name' set to 'datetime-preview'.
 * It iterates through all matching elements and initializes a DateTimePreview component
 * with the attributes provided in the 'data-gatherpress_component_attrs' attribute.
 *
 * @since 1.0.0
 */
dateTimePreview();
