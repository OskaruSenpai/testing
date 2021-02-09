export const possibleBuildings = [
	'Campus',
	'House 1',
	'House 2',
	'House 3',
	'Prices',
];

export const predefinedSections = {
	'24 hours': 8.64e7,
	'7 days': 6.048e8,
	'1 month': 2.628e9,
	'6 months': 1.577e10,
	'1 year': 3.154e10,
};

export const tagType = {
	consumption: 0,
	production: 1,
};
export const updateInterval = 3.6e6;
export const possibleResolutions = {
	hourly: 3.6e6,
	daily: 8.64e7,
	weekly: 6.048e8,
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function randomValueBetween(min, max) {
	return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

export const getScaledUnit = (
	value,
	unit = 'MW',
	unit_addition = '',
	preformat = true,
) => {
	let adjusted_value;
	try {
		adjusted_value = parseFloat(value);
	} catch (error) {
		console.error(error);
		if (preformat) return `${0} ${unit}${unit_addition}`;
		return {
			value: 0,
			unit: `${unit}${unit_addition}`,
		};
	}
	if (adjusted_value === 0) {
		if (preformat) return `${0} W${unit_addition}`;
		return {
			value: 0,
			unit: `W${unit_addition}`,
		};
	}
	const units = ['TW', 'GW', 'MW', 'kW', 'W', 'mW', 'nW'];
	let unit_index = units.indexOf(unit);
	while (
		adjusted_value !== 0 &&
		(adjusted_value >= 1000 || adjusted_value < 1) &&
		unit_index > 0 &&
		unit_index < units.length
	) {
		if (adjusted_value >= 1000) {
			adjusted_value /= 1000;
			unit_index -= 1;
		} else {
			adjusted_value *= 1000;
			unit_index += 1;
		}
	}
	if (preformat) {
		return `${adjusted_value.toFixed(2)} ${units[unit_index]}${unit_addition}`;
	}
	return {
		value: adjusted_value.toFixed(2),
		unit: `${units[unit_index]}${unit_addition}`,
	};
};

export const parseDate = (date_parsable_object) => {
	const date = new Date(date_parsable_object);
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const dayDisplay = dd < 10 ? `0${dd}` : dd.toString();
	const monthDisplay = mm < 10 ? `0${mm}` : mm.toString();
	return `${dayDisplay}-${monthDisplay}-${date.getFullYear()}`;
};

/**
 * Show error message on the parent element.
 *
 * @param {object} host - JSX object, which is set up to handle showing error messages.
 * @param {string} errorMessage - The error message to be shown.
 * @param {number} duration - How long to show the error message for. Duration in milliseconds. Defaults to 3000.
 */
export const showError = (host, errorMessage, duration = 3000) => {
	if (typeof errorMessage === 'string' && errorMessage.length >= 0) {
		host.setState({ error: errorMessage });
		console.warn(errorMessage);
		setTimeout(() => {
			host.setState({ error: '' });
		}, duration);
	}
};

/**
 * Detect if match exists in any of the given values.
 *
 * @param {string} value - Value to search for.
 * @param {...string} elements - Elements to search from.
 *
 * @returns {boolean} True if value exists, false if not.
 */
export const matchExists = (value, ...elements) => {
	if (value === '' || value === null) return true;
	const compareValue = value.toLowerCase();
	return elements.some((element) =>
		element.toLowerCase().includes(compareValue),
	);
};

/**
 * Toggle a loading screen overlay on the container element.
 *
 * @param {HTMLElement} container - HTML element to display the loading overlay on.
 * @param {HTMLElement} coverElement - HTML element returned by this function when adding a loading cover.
 * @param {boolean} on - Toggle overlay on[true] or off[false]. Default is false.
 * @param {number} timeout - Amount of seconds until a timeout overlay is shown. Default is 10s.
 *
 * @returns {HTMLElement | null} The element that was added infront of the given container element.
 */
export const toggleLoadingScreen = (
	container = undefined,
	coverElement = undefined,
	on = false,
	timeout = 10,
) => {
	if (on && container) {
		const blurCover = document.createElement('div');
		blurCover.className = 'loading-cover';
		blurCover.innerHTML = `<div class="lds-default">${'<div></div>'.repeat(
			12,
		)}</div>`;
		container.appendChild(blurCover);
		// Set up a timeout
		setTimeout(
			(e) => {
				if (e !== undefined) {
					blurCover.style.filter = '';
					blurCover.style.backgroundColor = '#fefefe';
					blurCover.innerHTML = 'No Data Available - request timed out';
				}
			},
			timeout * 1000,
			coverElement,
		);
		return blurCover;
	}
	if (coverElement && container) {
		setTimeout(() => {
			container.removeChild(coverElement);
		}, 200);
	}
	return null;
};

export const isMobileSafari = () => {
	const ua = window.navigator.userAgent;
	const iOS = !!ua.match(/iP(ad|hone)/i);
	const webkit = !!ua.match(/WebKit/i);
	return iOS && webkit && !ua.match(/CriOS/i);
};

/**
 * Detect if user is using a mobile device to view the page.
 *
 * @returns {boolean} - Returns True if user is using a mobile device, otherwise returns false.
 */
export const isMobile = () => {
	const userAgent =
		typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
	return Boolean(
		userAgent.match(
			/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
		),
	);
};

/**
 *
 * @param {boolean} rotated - Wether the size values should be swapped.
 * @returns {{width,height,paddingBottom}} Returns the usable screen width & height, also includes bottomPadding for iPhones.
 */
export const getUsableScreenSize = (rotated = false) => {
	const width = rotated ? window.innerHeight : window.innerWidth;
	let height = rotated ? window.innerWidth : window.innerHeight;
	let paddingBottom = 0;
	if (isMobileSafari()) {
		height += 100;
		paddingBottom = 100;
	}
	return {
		width,
		height,
		paddingBottom,
	};
};

/**
 * Get a color value from the size of the pallet.
 *
 * @param {number} colorNum - The index of the color from the pallet.
 * @param {number} colors - The size of the color pallet to create.
 */

export const getDistinctColor = (colorNum, colors) => {
	return `hsl(${
		(colorNum * (360 / (colors < 1 ? 1 : colors))) % 360
	},100%,50%)`;
};

export const getBackEndData = async (from, to, resolution) => {
	return new Promise(async (resolve, reject) => {
		const waitTime = randomValueBetween(0, 0.2);
		console.log(`waiting for data for ${waitTime} seconds`);
		await delay(waitTime * 1000);
		const output = possibleBuildings.map((houseName, index) => {
			let currentTime = from;
			const numbers = {};
			while (currentTime <= to) {
				if (houseName === 'Prices') {
					numbers[currentTime] = randomValueBetween(12, 15);
				} else {
					numbers[currentTime] = randomValueBetween(0, 10);
				}
				currentTime += resolution;
			}
			return {
				tag: houseName,
				displayName: houseName,
				associatedBuilding: houseName,
				numbers,
				pinned: true,
			};
		});
		console.log('Server sent:', output);
		resolve(output);
	});
};
