/**
 * External dependencies.
 */
import moment from 'moment';

/**
 * WordPress dependencies.
 */
import { select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { enableSave, getFromGlobal, setToGlobal } from './globals';
import { isEventPostType, triggerEventCommuncation } from './event';

export const dateTimeMomentFormat = 'YYYY-MM-DDTHH:mm:ss';
export const dateTimeDatabaseFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateTimeLabelFormat = 'MMMM D, YYYY h:mm a';

export const getTimeZone = (
	timezone = getFromGlobal('event_datetime.timezone')
) => {
	if (!!moment.tz.zone(timezone)) {
		return timezone;
	}

	return __('GMT', 'gatherpress');
};

export const getUtcOffset = (timezone) => {
	timezone = getTimeZone(timezone);

	if (__('GMT', 'gatherpress') !== timezone) {
		return '';
	}

	const offset = getFromGlobal('event_datetime.timezone');

	return maybeConvertUtcOffsetForDisplay(offset);
};

export const maybeConvertUtcOffsetForDisplay = (offset = '') => {
	return offset.replace(':', '');
};

export const maybeConvertUtcOffsetForDatabase = (offset = '') => {
	// Regex: https://regex101.com/r/9bMgJd/1.
	const pattern = /^UTC(\+|-)(\d+)(.\d+)?$/;
	const sign = offset.replace(pattern, '$1');

	if (sign !== offset) {
		const hour = offset.replace(pattern, '$2').padStart(2, '0');
		let minute = offset.replace(pattern, '$3');

		if ('' === minute) {
			minute = ':00';
		}

		minute = minute
			.replace('.25', ':15')
			.replace('.5', ':30')
			.replace('.75', ':45');

		return sign + hour + minute;
	}

	return offset;
};

export const maybeConvertUtcOffsetForSelect = (offset = '') => {
	// Regex: https://regex101.com/r/nOXCPo/1
	const pattern = /^(\+|-)(\d{2}):(00|15|30|45)$/;
	const sign = offset.replace(pattern, '$1');

	if (sign !== offset) {
		const hour = parseInt(offset.replace(pattern, '$2')).toString();
		const minute = offset
			.replace(pattern, '$3')
			.replace('00', '')
			.replace('15', '.25')
			.replace('30', '.5')
			.replace('45', '.75');

		return 'UTC' + sign + hour + minute;
	}

	return offset;
};

export const defaultDateTimeStart = moment
	.tz(getTimeZone())
	.add(1, 'day')
	.set('hour', 18)
	.set('minute', 0)
	.set('second', 0)
	.format(dateTimeMomentFormat);

export const defaultDateTimeEnd = moment
	.tz(defaultDateTimeStart, getTimeZone())
	.add(2, 'hours')
	.format(dateTimeMomentFormat);

export const getDateTimeStart = () => {
	let dateTime = getFromGlobal('event_datetime.datetime_start');

	dateTime =
		'' !== dateTime
			? moment.tz(dateTime, getTimeZone()).format(dateTimeMomentFormat)
			: defaultDateTimeStart;

	setToGlobal('event_datetime.datetime_start', dateTime);

	return dateTime;
};

export const getDateTimeEnd = () => {
	let dateTime = getFromGlobal('event_datetime.datetime_end');

	dateTime =
		'' !== dateTime
			? moment.tz(dateTime, getTimeZone()).format(dateTimeMomentFormat)
			: defaultDateTimeEnd;

	setToGlobal('event_datetime.datetime_end', dateTime);

	return dateTime;
};

export const updateDateTimeStart = (date, setDateTimeStart = null) => {
	validateDateTimeStart(date);

	setToGlobal('event_datetime.datetime_start', date);

	if ('function' === typeof setDateTimeStart) {
		setDateTimeStart(date);
	}

	enableSave();
};

export const updateDateTimeEnd = (date, setDateTimeEnd = null) => {
	validateDateTimeEnd(date);

	setToGlobal('event_datetime.datetime_end', date);

	if (null !== setDateTimeEnd) {
		setDateTimeEnd(date);
	}

	enableSave();
};

export function validateDateTimeStart(dateTimeStart) {
	const dateTimeEndNumeric = moment
		.tz(getFromGlobal('event_datetime.datetime_end'), getTimeZone())
		.valueOf();
	const dateTimeStartNumeric = moment
		.tz(dateTimeStart, getTimeZone())
		.valueOf();

	if (dateTimeStartNumeric >= dateTimeEndNumeric) {
		const dateTimeEnd = moment
			.tz(dateTimeStartNumeric, getTimeZone())
			.add(2, 'hours')
			.format(dateTimeMomentFormat);

		updateDateTimeEnd(dateTimeEnd);
	}
}

export function validateDateTimeEnd(dateTimeEnd) {
	const dateTimeStartNumeric = moment
		.tz(getFromGlobal('event_datetime.datetime_start'), getTimeZone())
		.valueOf();
	const dateTimeEndNumeric = moment.tz(dateTimeEnd, getTimeZone()).valueOf();

	if (dateTimeEndNumeric <= dateTimeStartNumeric) {
		const dateTimeStart = moment
			.tz(dateTimeEndNumeric, getTimeZone())
			.subtract(2, 'hours')
			.format(dateTimeMomentFormat);
		updateDateTimeStart(dateTimeStart);
	}
}

export function saveDateTime() {
	const isSavingPost = select('core/editor').isSavingPost(),
		isAutosavingPost = select('core/editor').isAutosavingPost();

	if (isEventPostType() && isSavingPost && !isAutosavingPost) {
		apiFetch({
			path: '/gatherpress/v1/event/datetime/',
			method: 'POST',
			data: {
				post_id: getFromGlobal('post_id'),
				datetime_start: moment
					.tz(
						getFromGlobal('event_datetime.datetime_start'),
						getTimeZone()
					)
					.format(dateTimeDatabaseFormat),
				datetime_end: moment
					.tz(
						getFromGlobal('event_datetime.datetime_end'),
						getTimeZone()
					)
					.format(dateTimeDatabaseFormat),
				timezone: getFromGlobal('event_datetime.timezone'),
				_wpnonce: getFromGlobal('nonce'),
			},
		}).then(() => {
			triggerEventCommuncation();
		});
	}
}
