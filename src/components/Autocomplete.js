/**
 * External dependencies.
 */
import { includes } from 'lodash';

/**
 * WordPress dependencies.
 */
import { FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

const Autocomplete = (props) => {
	const { name, option, value, fieldOptions } = props.attrs;
	const [content, setContent] = useState(JSON.parse(value) ?? '[]');
	const { contentList } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			const entityType =
				'user' !== fieldOptions.type ? 'postType' : 'root';
			const kind = fieldOptions.type || 'post';
			return {
				contentList: getEntityRecords(entityType, kind, {
					per_page: -1,
					context: 'view',
				}),
			};
		},
		[fieldOptions.type]
	);

	const contentSuggestions =
		contentList?.reduce(
			(accumulator, item) => ({
				...accumulator,
				[item.title?.rendered || item.name]: item,
			}),
			{}
		) ?? {};

	const selectContent = (tokens) => {
		const hasNoSuggestion = tokens.some(
			(token) => typeof token === 'string' && !contentSuggestions[token]
		);

		if (hasNoSuggestion) {
			return;
		}

		const allContent = tokens.map((token) => {
			return typeof token === 'string'
				? contentSuggestions[token]
				: token;
		});

		if (includes(allContent, null)) {
			return false;
		}

		setContent(allContent);
	};

	return (
		<>
			<FormTokenField
				key={option}
				label={fieldOptions.label || __('Select Posts', 'gatherpress')}
				name={name}
				value={
					content &&
					content.map((item) => ({
						id: item.id,
						slug: item.slug,
						value: item.title?.rendered || item.name || item.value,
					}))
				}
				suggestions={Object.keys(contentSuggestions)}
				onChange={selectContent}
				maxSuggestions={fieldOptions.max_suggestions || 20}
				maxLength={fieldOptions.limit || 0}
			/>
			<input
				type="hidden"
				id={option}
				name={name}
				value={
					content &&
					JSON.stringify(
						content.map((item) => ({
							id: item.id,
							slug: item.slug,
							value:
								item.title?.rendered || item.name || item.value,
						}))
					)
				}
			/>
		</>
	);
};

export default Autocomplete;
