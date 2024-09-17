/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/DateTimePreview.js":
/*!*******************************************!*\
  !*** ./src/components/DateTimePreview.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies.
 */



/**
 * DateTimePreview component for GatherPress.
 *
 * This component renders a preview of the formatted date and time based on the specified format.
 * It listens for the 'input' event on the input field with the specified name and updates
 * the state with the new date and time format. The formatted preview is displayed accordingly.
 *
 * @since 1.0.0
 *
 * @param {Object} props             - Component props.
 * @param {Object} props.attrs       - Component attributes.
 * @param {string} props.attrs.name  - The name of the input field.
 * @param {string} props.attrs.value - The initial value of the input field (date and time format).
 *
 * @return {JSX.Element} The rendered React component.
 */

const DateTimePreview = props => {
  const {
    name,
    value
  } = props.attrs;
  const [dateTimeFormat, setDateTimeFormat] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(value);
  const input = document.querySelector(`[name="${name}"]`);
  input.addEventListener('input', e => {
    setDateTimeFormat(e.target.value);
  }, {
    once: true
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: dateTimeFormat && (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_0__.format)(dateTimeFormat)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateTimePreview);

/***/ }),

/***/ "./src/helpers/broadcasting.js":
/*!*************************************!*\
  !*** ./src/helpers/broadcasting.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Broadcaster: () => (/* binding */ Broadcaster),
/* harmony export */   Listener: () => (/* binding */ Listener)
/* harmony export */ });
/**
 * Broadcasts custom events based on the provided payload, optionally appending an identifier to each event type.
 *
 * @since 1.0.0
 *
 * @param {Object} payload    - An object containing data to be dispatched with custom events.
 * @param {string} identifier - An optional identifier to append to each event type.
 *
 * @return {void}
 */
const Broadcaster = (payload, identifier = '') => {
  for (const [key, value] of Object.entries(payload)) {
    let type = key;
    if (identifier) {
      type += '_' + String(identifier);
    }
    const dispatcher = new CustomEvent(type, {
      detail: value
    });
    dispatchEvent(dispatcher);
  }
};

/**
 * Sets up event listeners for custom events based on the provided payload, optionally appending an identifier to each event type.
 * When an event is triggered, the corresponding listener callback is executed with the event detail.
 *
 * @since 1.0.0
 *
 * @param {Object} payload    - An object specifying event types and their corresponding listener callbacks.
 * @param {string} identifier - An optional identifier to append to each event type.
 *
 * @return {void}
 */
const Listener = (payload, identifier = '') => {
  for (const [key, value] of Object.entries(payload)) {
    let type = key;
    if (identifier) {
      type += '_' + String(identifier);
    }
    addEventListener(type, e => {
      value(e.detail);
    }, false);
  }
};

/***/ }),

/***/ "./src/helpers/datetime.js":
/*!*********************************!*\
  !*** ./src/helpers/datetime.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertPHPToMomentFormat: () => (/* binding */ convertPHPToMomentFormat),
/* harmony export */   dateTimeDatabaseFormat: () => (/* binding */ dateTimeDatabaseFormat),
/* harmony export */   dateTimeLabelFormat: () => (/* binding */ dateTimeLabelFormat),
/* harmony export */   dateTimeOffset: () => (/* binding */ dateTimeOffset),
/* harmony export */   dateTimePreview: () => (/* binding */ dateTimePreview),
/* harmony export */   defaultDateTimeEnd: () => (/* binding */ defaultDateTimeEnd),
/* harmony export */   defaultDateTimeStart: () => (/* binding */ defaultDateTimeStart),
/* harmony export */   durationOptions: () => (/* binding */ durationOptions),
/* harmony export */   getDateTimeEnd: () => (/* binding */ getDateTimeEnd),
/* harmony export */   getDateTimeOffset: () => (/* binding */ getDateTimeOffset),
/* harmony export */   getDateTimeStart: () => (/* binding */ getDateTimeStart),
/* harmony export */   getTimezone: () => (/* binding */ getTimezone),
/* harmony export */   getUtcOffset: () => (/* binding */ getUtcOffset),
/* harmony export */   maybeConvertUtcOffsetForDatabase: () => (/* binding */ maybeConvertUtcOffsetForDatabase),
/* harmony export */   maybeConvertUtcOffsetForDisplay: () => (/* binding */ maybeConvertUtcOffsetForDisplay),
/* harmony export */   maybeConvertUtcOffsetForSelect: () => (/* binding */ maybeConvertUtcOffsetForSelect),
/* harmony export */   updateDateTimeEnd: () => (/* binding */ updateDateTimeEnd),
/* harmony export */   updateDateTimeStart: () => (/* binding */ updateDateTimeStart),
/* harmony export */   validateDateTimeEnd: () => (/* binding */ validateDateTimeEnd),
/* harmony export */   validateDateTimeStart: () => (/* binding */ validateDateTimeStart)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./globals */ "./src/helpers/globals.js");
/* harmony import */ var _components_DateTimePreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/DateTimePreview */ "./src/components/DateTimePreview.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * External dependencies.
 */


/**
 * WordPress dependencies.
 */



/**
 * Internal dependencies.
 */



/**
 * Database-compatible date and time format string for storage.
 *
 * This format is designed to represent date and time in the format
 * "YYYY-MM-DD HH:mm:ss" for compatibility with database storage.
 *
 * @since 1.0.0
 *
 * @type {string}
 */

const dateTimeDatabaseFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * The default start date and time for an event.
 * It is set to the current date and time plus one day at 18:00:00 in the application's timezone.
 *
 * @since 1.0.0
 *
 * @type {string} Formatted default start date and time in the application's timezone.
 */
const defaultDateTimeStart = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(getTimezone()).add(1, 'day').set('hour', 18).set('minute', 0).set('second', 0).format(dateTimeDatabaseFormat);

/**
 * The default end date and time for an event.
 * It is calculated based on the default start date and time plus two hours in the application's timezone.
 *
 * @since 1.0.0
 *
 * @type {string} Formatted default end date and time in the application's timezone.
 */
const defaultDateTimeEnd = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(defaultDateTimeStart, getTimezone()).add(2, 'hours').format(dateTimeDatabaseFormat);

/**
 * Predefined duration options for event scheduling.
 *
 * This array contains a list of duration options in hours that can be selected
 * for an event. Each option includes a label for display and a corresponding
 * value representing the duration in hours. The last option allows the user
 * to set a custom end time by selecting `false`.
 *
 * @since 1.0.0
 *
 * @type {Array<Object>} durationOptions
 * @property {string}         label - The human-readable label for the duration option.
 * @property {number|boolean} value - The value representing the duration in hours, or `false` if a custom end time is to be set.
 */
const durationOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('1 hour', 'gatherpress'),
  value: 1
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('1.5 hours', 'gatherpress'),
  value: 1.5
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('2 hours', 'gatherpress'),
  value: 2
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('3 hours', 'gatherpress'),
  value: 3
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Set an end time…', 'gatherpress'),
  value: false
}];

/**
 * Calculates an offset in hours from the start date and time of an event.
 *
 * This function retrieves the event's start date and time, applies the provided
 * offset in hours, and returns the result formatted for database storage.
 *
 * @since 1.0.0
 *
 * @param {number} hours - The number of hours to offset from the event's start date and time.
 *
 * @return {string} The adjusted date and time formatted in a database-compatible format.
 */
function dateTimeOffset(hours) {
  return moment__WEBPACK_IMPORTED_MODULE_0___default().tz(getDateTimeStart(), getTimezone()).add(hours, 'hours').format(dateTimeDatabaseFormat);
}

/**
 * Retrieves the duration offset based on the end time of the event.
 *
 * This function checks the available duration options and compares
 * the offset value with the calculated end time of the event. If a
 * matching offset is found, it returns the corresponding value. If
 * no match is found, it returns false.
 *
 * @since 1.0.0
 *
 * @return {number|boolean} The matching duration value or false if no match is found.
 */
function getDateTimeOffset() {
  return durationOptions.find(option => dateTimeOffset(option.value) === getDateTimeEnd())?.value || false;
}

/**
 * Get the combined date and time format for event labels.
 *
 * This function retrieves the date and time formats from global settings
 * and combines them to create a formatted label for event start and end times.
 *
 * @since 1.0.0
 *
 * @return {string} The combined date and time format for event labels.
 */
function dateTimeLabelFormat() {
  const dateFormat = convertPHPToMomentFormat((0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('settings.dateFormat'));
  const timeFormat = convertPHPToMomentFormat((0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('settings.timeFormat'));
  return dateFormat + ' ' + timeFormat;
}

/**
 * Retrieves the timezone for the application based on the provided timezone or the global setting.
 * If the provided timezone is invalid, the default timezone is set to 'GMT'.
 *
 * @since 1.0.0
 *
 * @param {string} timezone - The timezone to be used, defaults to the global setting 'event_datetime.timezone'.
 *
 * @return {string} The retrieved timezone, or 'GMT' if the provided timezone is invalid.
 */
function getTimezone(timezone = (0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.timezone')) {
  if (!!moment__WEBPACK_IMPORTED_MODULE_0___default().tz.zone(timezone)) {
    return timezone;
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('GMT', 'gatherpress');
}

/**
 * Retrieves the UTC offset for a given timezone.
 * If the timezone is not set to 'GMT', an empty string is returned.
 *
 * @since 1.0.0
 *
 * @param {string} timezone - The timezone for which to retrieve the UTC offset.
 *
 * @return {string} UTC offset without the colon if the timezone is set to 'GMT', otherwise an empty string.
 */
function getUtcOffset(timezone) {
  timezone = getTimezone(timezone);
  if ((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('GMT', 'gatherpress') !== timezone) {
    return '';
  }
  const offset = (0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.timezone');
  return maybeConvertUtcOffsetForDisplay(offset);
}

/**
 * Converts a UTC offset string to a format suitable for display,
 * removing the colon (:) between hours and minutes.
 *
 * @since 1.0.0
 *
 * @param {string} offset - The UTC offset string to be converted.
 *
 * @return {string} Converted UTC offset without the colon, suitable for display.
 */
function maybeConvertUtcOffsetForDisplay(offset = '') {
  return offset.replace(':', '');
}

/**
 * Converts a UTC offset string to a standardized format suitable for database storage.
 * The function accepts offsets in the form of 'UTC+HH:mm', 'UTC-HH:mm', 'UTC+HH', or 'UTC-HH'.
 * The resulting format is '+HH:mm' or '-HH:mm'.
 *
 * @since 1.0.0
 *
 * @param {string} offset - The UTC offset string to be converted.
 *
 * @return {string} Converted UTC offset in the format '+HH:mm' or '-HH:mm'.
 */
function maybeConvertUtcOffsetForDatabase(offset = '') {
  // Regex: https://regex101.com/r/9bMgJd/2.
  const pattern = /^UTC([+-])(\d+)(.\d+)?$/;
  const sign = offset.replace(pattern, '$1');
  if (sign !== offset) {
    const hour = offset.replace(pattern, '$2').padStart(2, '0');
    let minute = offset.replace(pattern, '$3');
    if ('' === minute) {
      minute = ':00';
    }
    minute = minute.replace('.25', ':15').replace('.5', ':30').replace('.75', ':45');
    return sign + hour + minute;
  }
  return offset;
}

/**
 * Converts a UTC offset string to a format suitable for dropdown selection,
 * specifically in the format '+HH:mm' or '-HH:mm'.
 *
 * @since 1.0.0
 *
 * @param {string} offset - The UTC offset string to be converted.
 *
 * @return {string} Converted UTC offset in the format '+HH:mm' or '-HH:mm'.
 */
function maybeConvertUtcOffsetForSelect(offset = '') {
  // Regex: https://regex101.com/r/nOXCPo/2.
  const pattern = /^([+-])(\d{2}):(00|15|30|45)$/;
  const sign = offset.replace(pattern, '$1');
  if (sign !== offset) {
    const hour = parseInt(offset.replace(pattern, '$2')).toString();
    const minute = offset.replace(pattern, '$3').replace('00', '').replace('15', '.25').replace('30', '.5').replace('45', '.75');
    return 'UTC' + sign + hour + minute;
  }
  return offset;
}

/**
 * Retrieves the start date and time for an event, formatted based on the plugin's timezone.
 * If the start date and time is not set, it defaults to a predefined value.
 * The formatted datetime is then stored in the global settings for future access.
 *
 * @since 1.0.0
 *
 * @return {string} The formatted start date and time for the event.
 */
function getDateTimeStart() {
  let dateTime = (0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.datetime_start');
  dateTime = '' !== dateTime ? moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTime, getTimezone()).format(dateTimeDatabaseFormat) : defaultDateTimeStart;
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.setToGlobal)('eventDetails.dateTime.datetime_start', dateTime);
  return dateTime;
}

/**
 * Retrieves the end date and time for an event, formatted based on the plugin's timezone.
 * If the end date and time is not set, it defaults to a predefined value.
 * The formatted datetime is then stored in the global settings for future access.
 *
 * @since 1.0.0
 *
 * @return {string} The formatted end date and time for the event.
 */
function getDateTimeEnd() {
  let dateTime = (0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.datetime_end');
  dateTime = '' !== dateTime ? moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTime, getTimezone()).format(dateTimeDatabaseFormat) : defaultDateTimeEnd;
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.setToGlobal)('eventDetails.dateTime.datetime_end', dateTime);
  return dateTime;
}

/**
 * Updates the start date and time for an event, performs validation, and triggers the save functionality.
 *
 * This function sets the new start date and time of the event, validates the input
 * to ensure it meets the required criteria, and updates the global state. It also
 * triggers a save action if the `enableSave` function is available. If a `setDateTimeStart`
 * callback is provided, it is invoked with the new date.
 *
 * @since 1.0.0
 *
 * @param {string}        date             - The new start date and time to be set in a valid format.
 * @param {Function|null} setDateTimeStart - Optional callback function to update the state or perform additional actions with the new start date.
 * @param {Function|null} setDateTimeEnd   - Optional callback function to update the end date, if validation requires an update.
 *
 * @return {void}
 */
function updateDateTimeStart(date, setDateTimeStart = null, setDateTimeEnd = null) {
  validateDateTimeStart(date, setDateTimeEnd);
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.setToGlobal)('eventDetails.dateTime.datetime_start', date);
  if ('function' === typeof setDateTimeStart) {
    setDateTimeStart(date);
  }
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.enableSave)();
}

/**
 * Updates the end date and time of the event and triggers necessary actions.
 *
 * This function sets the end date and time of the event to the specified value,
 * validates the input, and triggers additional actions such as updating the UI and
 * enabling save functionality. The `setDateTimeEnd` callback can be used to update
 * the UI with the new end date and time, if provided. Optionally, `setDateTimeStart`
 * can be used for validation against the start date and time.
 *
 * @since 1.0.0
 *
 * @param {string}        date             - The new end date and time in a valid format.
 * @param {Function|null} setDateTimeEnd   - Optional callback to update the UI with the new end date and time.
 * @param {Function|null} setDateTimeStart - Optional callback for validating the end date against the start date.
 *
 * @return {void}
 */
function updateDateTimeEnd(date, setDateTimeEnd = null, setDateTimeStart = null) {
  validateDateTimeEnd(date, setDateTimeStart);
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.setToGlobal)('eventDetails.dateTime.datetime_end', date);
  if (null !== setDateTimeEnd) {
    setDateTimeEnd(date);
  }
  (0,_globals__WEBPACK_IMPORTED_MODULE_3__.enableSave)();
}

/**
 * Validates the start date and time of the event and performs necessary adjustments if needed.
 *
 * This function compares the provided start date and time with the current end date
 * and time of the event. If the start date is greater than or equal to the end date,
 * it adjusts the end date to ensure a minimum two-hour duration from the start date.
 * If `setDateTimeEnd` is provided, it updates the end date accordingly.
 *
 * @since 1.0.0
 *
 * @param {string}        dateTimeStart  - The start date and time in a valid format.
 * @param {Function|null} setDateTimeEnd - Optional callback to update the end date and time.
 *
 * @return {void}
 */
function validateDateTimeStart(dateTimeStart, setDateTimeEnd = null) {
  const dateTimeEndNumeric = moment__WEBPACK_IMPORTED_MODULE_0___default().tz((0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.datetime_end'), getTimezone()).valueOf();
  const dateTimeStartNumeric = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTimeStart, getTimezone()).valueOf();
  if (dateTimeStartNumeric >= dateTimeEndNumeric) {
    const dateTimeEnd = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTimeStartNumeric, getTimezone()).add(2, 'hours').format(dateTimeDatabaseFormat);
    updateDateTimeEnd(dateTimeEnd, setDateTimeEnd);
  }
}

/**
 * Validates the end date and time of the event and performs necessary adjustments if needed.
 *
 * This function compares the provided end date and time with the current start date
 * and time of the event. If the end date is less than or equal to the start date,
 * it adjusts the start date to ensure a minimum two-hour duration from the end date.
 * If `setDateTimeStart` is provided, it updates the start date accordingly.
 *
 * @since 1.0.0
 *
 * @param {string}        dateTimeEnd      - The end date and time in a valid format.
 * @param {Function|null} setDateTimeStart - Optional callback to update the start date and time.
 *
 * @return {void}
 */
function validateDateTimeEnd(dateTimeEnd, setDateTimeStart = null) {
  const dateTimeStartNumeric = moment__WEBPACK_IMPORTED_MODULE_0___default().tz((0,_globals__WEBPACK_IMPORTED_MODULE_3__.getFromGlobal)('eventDetails.dateTime.datetime_start'), getTimezone()).valueOf();
  const dateTimeEndNumeric = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTimeEnd, getTimezone()).valueOf();
  if (dateTimeEndNumeric <= dateTimeStartNumeric) {
    const dateTimeStart = moment__WEBPACK_IMPORTED_MODULE_0___default().tz(dateTimeEndNumeric, getTimezone()).subtract(2, 'hours').format(dateTimeDatabaseFormat);
    updateDateTimeStart(dateTimeStart, setDateTimeStart);
  }
}

/**
 * Convert PHP date format to Moment.js date format.
 *
 * This function converts a PHP date format string to its equivalent Moment.js date format.
 * It uses a mapping of PHP format characters to Moment.js format characters.
 *
 * @see https://gist.github.com/neilrackett/7881b5bef4cb4ae63af5c3a6a244cffa
 *
 * @since 1.0.0
 *
 * @param {string} format - The PHP date format to be converted.
 * @return {string} The equivalent Moment.js date format.
 */
function convertPHPToMomentFormat(format) {
  const replacements = {
    d: 'DD',
    D: 'ddd',
    j: 'D',
    l: 'dddd',
    N: 'E',
    S: 'o',
    w: 'e',
    z: 'DDD',
    W: 'W',
    F: 'MMMM',
    m: 'MM',
    M: 'MMM',
    n: 'M',
    t: '',
    // no equivalent
    L: '',
    // no equivalent
    o: 'YYYY',
    Y: 'YYYY',
    y: 'YY',
    a: 'a',
    A: 'A',
    B: '',
    // no equivalent
    g: 'h',
    G: 'H',
    h: 'hh',
    H: 'HH',
    i: 'mm',
    s: 'ss',
    u: 'SSS',
    e: 'zz',
    // deprecated since Moment.js 1.6.0
    I: '',
    // no equivalent
    O: '',
    // no equivalent
    P: '',
    // no equivalent
    T: '',
    // no equivalent
    Z: '',
    // no equivalent
    c: '',
    // no equivalent
    r: '',
    // no equivalent
    U: 'X'
  };
  return String(format).split('').map((chr, index, elements) => {
    // Allow the format string to contain escaped chars, like ES or DE needs
    const last = elements[index - 1];
    if (chr in replacements && last !== '\\') {
      return replacements[chr];
    }
    return chr;
  }).join('');
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
function dateTimePreview() {
  // Select all elements with the attribute 'data-gatherpress_component_name' set to 'datetime-preview'.
  const dateTimePreviewContainers = document.querySelectorAll(`[data-gatherpress_component_name="datetime-preview"]`);

  // Iterate through each matched element and initialize DateTimePreview component.
  for (let i = 0; i < dateTimePreviewContainers.length; i++) {
    // Parse attributes from the 'data-gatherpress_component_attrs' attribute.
    const attrs = JSON.parse(dateTimePreviewContainers[i].dataset.gatherpress_component_attrs);

    // Create a root element and render the DateTimePreview component with the parsed attributes.
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(dateTimePreviewContainers[i]).render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_DateTimePreview__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attrs: attrs
    }));
  }
}

/***/ }),

/***/ "./src/helpers/event.js":
/*!******************************!*\
  !*** ./src/helpers/event.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasEventPast: () => (/* binding */ hasEventPast),
/* harmony export */   hasEventPastNotice: () => (/* binding */ hasEventPastNotice),
/* harmony export */   isEventPostType: () => (/* binding */ isEventPostType),
/* harmony export */   triggerEventCommunication: () => (/* binding */ triggerEventCommunication)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datetime */ "./src/helpers/datetime.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./globals */ "./src/helpers/globals.js");
/* harmony import */ var _broadcasting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./broadcasting */ "./src/helpers/broadcasting.js");
/**
 * External dependencies.
 */


/**
 * WordPress dependencies.
 */



/**
 * Internal dependencies.
 */




/**
 * Checks if the current post type is an event in the GatherPress application.
 *
 * This function queries the current post type using the `select` function from the `core/editor` package.
 * It returns `true` if the current post type is 'gatherpress_event', indicating that the post is an event,
 * and `false` otherwise.
 *
 * @since 1.0.0
 *
 * @return {boolean} True if the current post type is 'gatherpress_event', false otherwise.
 */
function isEventPostType() {
  return 'gatherpress_event' === (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor')?.getCurrentPostType();
}

/**
 * Check if the event has already passed.
 *
 * This function compares the current time with the end time of the event
 * to determine if the event has already taken place.
 *
 * @return {boolean} True if the event has passed; false otherwise.
 */
function hasEventPast() {
  const dateTimeEnd = moment__WEBPACK_IMPORTED_MODULE_0___default().tz((0,_globals__WEBPACK_IMPORTED_MODULE_4__.getFromGlobal)('eventDetails.dateTime.datetime_end'), (0,_datetime__WEBPACK_IMPORTED_MODULE_3__.getTimezone)());
  return 'gatherpress_event' === (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor')?.getCurrentPostType() && moment__WEBPACK_IMPORTED_MODULE_0___default().tz((0,_datetime__WEBPACK_IMPORTED_MODULE_3__.getTimezone)()).valueOf() > dateTimeEnd.valueOf();
}

/**
 * Display a notice if the event has already passed.
 *
 * This function checks if the event has passed and displays a warning notice
 * if so. The notice is non-dismissible to ensure the user is informed about
 * the event status.
 *
 * @since 1.0.0
 *
 * @return {void}
 */
function hasEventPastNotice() {
  const id = 'gatherpress_event_past';
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/notices');
  notices.removeNotice(id);
  if (hasEventPast()) {
    notices.createNotice('warning', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This event has already passed.', 'gatherpress'), {
      id,
      isDismissible: false
    });
  }
}

/**
 * Flag to prevent multiple event communication notices.
 *
 * @type {boolean}
 */
let isEventCommunicationNoticeCreated = false;

/**
 * Trigger communication notice for event updates.
 *
 * This function checks if the event is published and not yet passed,
 * then displays a success notice prompting the user to send an event update
 * to members via email. The notice includes an action to compose the message.
 *
 * @since 1.0.0
 *
 * @return {void}
 */
function triggerEventCommunication() {
  const id = 'gatherpress_event_communication';
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/notices');
  const isSavingPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').isSavingPost();
  const isAutosavingPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').isAutosavingPost();

  // Only proceed if a save is in progress and it's not an autosave.
  if ('publish' === (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/editor').getEditedPostAttribute('status') && isEventPostType() && isSavingPost && !isAutosavingPost && !hasEventPast() && !isEventCommunicationNoticeCreated) {
    // Mark notice as created.
    isEventCommunicationNoticeCreated = true;

    // Remove any previous notices with the same ID.
    notices.removeNotice(id);

    // Create a new notice with an action.
    notices.createNotice('success', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Send an event update to members via email?', 'gatherpress'), {
      id,
      isDismissible: true,
      actions: [{
        onClick: () => {
          (0,_broadcasting__WEBPACK_IMPORTED_MODULE_5__.Broadcaster)({
            setOpen: true
          });
        },
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Compose Message', 'gatherpress')
      }]
    });
  }

  // Reset the flag after the save operation completes.
  if (!isSavingPost) {
    isEventCommunicationNoticeCreated = false;
  }
}

/***/ }),

/***/ "./src/helpers/globals.js":
/*!********************************!*\
  !*** ./src/helpers/globals.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enableSave: () => (/* binding */ enableSave),
/* harmony export */   getFromGlobal: () => (/* binding */ getFromGlobal),
/* harmony export */   isGatherPressPostType: () => (/* binding */ isGatherPressPostType),
/* harmony export */   setToGlobal: () => (/* binding */ setToGlobal)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Enable the Save buttons after making an update.
 *
 * This function uses a hacky approach to trigger a change in the post's meta, which prompts
 * Gutenberg to recognize that changes have been made and enables the Save buttons.
 * It dispatches an editPost action with a non-existing meta key.
 *
 * @since 1.0.0
 *
 * @todo This is a hacky approach and relies on the behavior described in
 *       https://github.com/WordPress/gutenberg/issues/13774.
 *       Monitor the issue for any updates or changes in the Gutenberg behavior.
 */
function enableSave() {
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/editor')?.editPost({
    meta: {
      _non_existing_meta: true
    }
  });
}

/**
 * Checks if the current post type is a GatherPress event or venue.
 *
 * This function determines if the post type being edited in the WordPress block editor
 * is either 'gatherpress_event' or 'gatherpress_venue', which are custom post types
 * related to GatherPress. It is used to ensure that specific actions or functionality
 * are applied only to these post types.
 *
 * @since 1.0.0
 *
 * @return {boolean} True if the current post type is 'gatherpress_event' or 'gatherpress_venue', false otherwise.
 */
function isGatherPressPostType() {
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor')?.getCurrentPostType();
  return 'gatherpress_event' === postType || 'gatherpress_venue' === postType;
}

/**
 * Get a value from the global GatherPress object based on the provided dot-separated path.
 *
 * This function is designed to retrieve values from the global GatherPress object.
 * It takes a dot-separated path as an argument and traverses the object to return the specified value.
 * If the object or any level along the path is undefined, it returns undefined.
 *
 * @since 1.0.0
 *
 * @param {string} args - Dot-separated path to the desired property in the GatherPress global object.
 * @return {*} The value at the specified path in the GatherPress global object or undefined if not found.
 */
function getFromGlobal(args) {
  // eslint-disable-next-line no-undef
  if ('object' !== typeof GatherPress) {
    return undefined;
  }
  return args.split('.').reduce(
  // eslint-disable-next-line no-undef
  (GatherPress, level) => GatherPress && GatherPress[level],
  // eslint-disable-next-line no-undef
  GatherPress);
}

/**
 * Set a value to a global object based on the provided path.
 *
 * This function allows setting values within a nested global object using a dot-separated path.
 * If the global object (GatherPress) does not exist, it will be initialized.
 *
 * @since 1.0.0
 *
 * @param {string} args  - Dot-separated path to the property.
 * @param {*}      value - The value to set.
 *
 * @return {void}
 */
function setToGlobal(args, value) {
  // eslint-disable-next-line no-undef
  if ('object' !== typeof GatherPress) {
    return;
  }
  const properties = args.split('.');
  const last = properties.pop();

  // eslint-disable-next-line no-undef
  properties.reduce((all, item) => {
    var _all$item;
    return (_all$item = all[item]) !== null && _all$item !== void 0 ? _all$item : all[item] = {};
  }, GatherPress)[last] = value;
}

/***/ }),

/***/ "./src/stores/datetime.js":
/*!********************************!*\
  !*** ./src/stores/datetime.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/datetime */ "./src/helpers/datetime.js");
/**
 * WordPress dependencies.
 */


/**
 * Internal dependencies.
 */


const DEFAULT_STATE = {
  dateTimeStart: (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.getFromGlobal)('eventDetails.dateTime.datetime_start') ? (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.getFromGlobal)('eventDetails.dateTime.datetime_start') : _helpers_datetime__WEBPACK_IMPORTED_MODULE_2__.defaultDateTimeStart,
  dateTimeEnd: (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.getFromGlobal)('eventDetails.dateTime.datetime_end') ? (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.getFromGlobal)('eventDetails.dateTime.datetime_end') : _helpers_datetime__WEBPACK_IMPORTED_MODULE_2__.defaultDateTimeEnd,
  duration: (0,_helpers_datetime__WEBPACK_IMPORTED_MODULE_2__.getDateTimeOffset)(),
  timezone: (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.getFromGlobal)('eventDetails.dateTime.timezone')
};
const actions = {
  setDateTimeStart(dateTimeStart) {
    (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.setToGlobal)('eventDetails.dateTime.datetime_start', dateTimeStart);
    return {
      type: 'SET_DATETIME_START',
      dateTimeStart
    };
  },
  setDateTimeEnd(dateTimeEnd) {
    (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.setToGlobal)('eventDetails.dateTime.datetime_end', dateTimeEnd);
    return {
      type: 'SET_DATETIME_END',
      dateTimeEnd
    };
  },
  setDuration(duration) {
    return {
      type: 'SET_DURATION',
      duration
    };
  },
  setTimezone(timezone) {
    (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_1__.setToGlobal)('eventDetails.dateTime.timezone', timezone);
    return {
      type: 'SET_TIMEZONE',
      timezone
    };
  }
};
const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_DATETIME_START':
      return {
        ...state,
        dateTimeStart: action.dateTimeStart
      };
    case 'SET_DATETIME_END':
      return {
        ...state,
        dateTimeEnd: action.dateTimeEnd
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.duration
      };
    case 'SET_TIMEZONE':
      return {
        ...state,
        timezone: action.timezone
      };
    default:
      return state;
  }
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('gatherpress/datetime', {
  reducer,
  actions,
  selectors: {
    getDateTimeStart: state => state.dateTimeStart,
    getDateTimeEnd: state => state.dateTimeEnd,
    getDuration: state => state.duration,
    getTimezone: state => state.timezone
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);

/***/ }),

/***/ "./src/stores/index.js":
/*!*****************************!*\
  !*** ./src/stores/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./src/stores/datetime.js");


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["moment"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores */ "./src/stores/index.js");
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/globals */ "./src/helpers/globals.js");
/**
 * WordPress dependencies.
 */






/**
 * Internal dependencies.
 */


/**
 * Ensure Panels are Open for Events
 *
 * This script ensures that specific panels related to Events are open in the WordPress block editor.
 * It uses the `domReady` function to ensure the DOM is ready before execution.
 * If the editor sidebar is not open, it opens the general sidebar, toggles the editor panel for event settings,
 * and displays a notice for past events using the `hasEventPastNotice` function.
 *
 * @since 1.0.0
 */

// Execute the following code when the DOM is ready.
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  // Retrieve the 'core/edit-post' object from the 'select' function.
  const selectPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/edit-post');

  // Exit early if 'core/edit-post' is not available.
  if (!selectPost) {
    return;
  }

  // Retrieve the 'core/edit-post' object from the 'dispatch' function.
  const dispatchPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/edit-post');

  // Check if the editor sidebar is open.
  const isEditorSidebarOpened = selectPost.isEditorSidebarOpened();

  // If the editor sidebar is not open, open the general sidebar and toggle the editor panel for event settings.
  if (!isEditorSidebarOpened) {
    dispatchPost.openGeneralSidebar();
    dispatchPost.toggleEditorPanelOpened('gatherpress-event-settings/gatherpress-event-settings');
  } else {
    // If the editor sidebar is open, open the general sidebar for the 'edit-post/document' panel.
    dispatchPost.openGeneralSidebar('edit-post/document');
    dispatchPost.toggleEditorPanelOpened('gatherpress-event-settings/gatherpress-event-settings');
  }
  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.subscribe)(_helpers_event__WEBPACK_IMPORTED_MODULE_2__.triggerEventCommunication);
  (0,_helpers_event__WEBPACK_IMPORTED_MODULE_2__.hasEventPastNotice)();
});

/**
 * Remove Unwanted Blocks
 *
 * This script removes unwanted blocks from the localized array.
 * It utilizes the `domReady` function to ensure the DOM is ready before execution.
 * It iterates through the keys of the 'unregister_blocks' array obtained from the global scope,
 * retrieves the block name, and unregisters the block using the `unregisterBlockType` function.
 *
 * @since 1.0.0
 */

// Execute the following code when the DOM is ready.
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  // Iterate through keys of the 'unregister_blocks' array in the global scope.
  Object.keys((0,_helpers_globals__WEBPACK_IMPORTED_MODULE_5__.getFromGlobal)('misc.unregisterBlocks')).forEach(key => {
    // Retrieve the block name using the key.
    const blockName = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_5__.getFromGlobal)('misc.unregisterBlocks')[key];

    // Check if the block name is defined and unregister the block.
    if (blockName && 'undefined' !== typeof (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.getBlockType)(blockName)) {
      (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.unregisterBlockType)(blockName);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=editor.js.map