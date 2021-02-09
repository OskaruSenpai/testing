import { updateInterval } from '../FakeData';

export const isActiveTimeframe = (elementID, current) => {
	return current === elementID ? 'active-btn' : '';
};

export const isActiveDisplay = (elementID, current) => {
	return current === elementID ? 'active-btn' : '';
};

export const autoUpdater = (parent, startDate, endDate) => {
	return setInterval(() => {
		parent.setState(
			{
				endDate: new Date(endDate.getTime() + updateInterval),
				startDate: new Date(startDate.getTime() + updateInterval),
			},
			() => {
				parent.getLineData();
			},
		);
	}, updateInterval);
};

export const toggleAutoUpdate = (parent, value) => {
	parent.setState({ autoUpdate: !value });
	return !value;
};

export const changeResolution = (parent, value) => {
	parent.setState(
		{ currentResolution: value, userSelectedResolution: true },
		() => {
			parent.getLineData();
		},
	);
};

export const onChangeStartDate = (parent, startDate) => {
	parent.setState({ startDate, active_timeframe: 'custom' }, () =>
		parent.getLineData(),
	);
};

export const onChangeEndDate = (parent, endDate) => {
	parent.setState({ endDate, active_timeframe: 'custom' }, () =>
		parent.getLineData(),
	);
};

export const changeDisplayValue = (parent, active_display) => {
	parent.setState({ active_display }, () => {
		parent.getLineData();
	});
};

export const handleDatePicking = (parent, element) => {
	const today = new Date();
	const start = new Date();
	let resolution = 'daily';

	switch (element.target.value) {
		case '1y':
			start.setFullYear(today.getFullYear() - 1);
			resolution = 'weekly';
			break;
		case '6m':
			start.setMonth(today.getMonth() - 5);
		// falls through
		default:
		// falls through
		case '1m':
			start.setMonth(start.getMonth() - 1);
			resolution = 'daily';
			break;
		case '7d':
			start.setDate(today.getDate() - 7);
		// falls through
		case '24h':
			resolution = 'hourly';
			break;
	}
	// Highlight the selected button
	parent.setState(
		{
			currentResolution: resolution,
			endDate: today,
			startDate: start,
			active_timeframe: element.target.value,
		},
		() => {
			parent.getLineData();
		},
	);
};

export const isCurrentDate = (date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const preventFutureDate = (dateToTest) => {
	const tmp = new Date();
	if (dateToTest.getTime() > tmp.getTime()) return tmp;
	return dateToTest;
};

export const getBufferSize = (startDate, endDate) => {
	if (startDate.getTime() === endDate.getTime()) {
		startDate.setHours(0, 0, 0, 0);
	}
	const timeDif = Math.abs(endDate.getTime() - startDate.getTime());
	let pastBuffer = startDate;
	let futureBuffer = endDate;
	if (isCurrentDate(endDate)) {
		pastBuffer = new Date(startDate.getTime() - timeDif);
	} else {
		pastBuffer = new Date(startDate.getTime() - timeDif);
		futureBuffer = new Date(endDate.getTime() + timeDif);

		// Check if request goes into the future, set to current time if it does
		futureBuffer = preventFutureDate(futureBuffer);
	}

	return { pastBuffer, futureBuffer, timeDif };
};

export const showSummaryData = (parent, value) => {
	parent.setState({ showSummary: value });
};

export const calculateSummaryInfo = (data, startDate, endDate) => {
	const summaryData = [];
	const priceArray = data.find(({ name }) => name === 'Prices');
	data.forEach((line, lineIndex) => {
		const { name, data: d } = line;
		let peak = [0, 0];
		let sum = 0;
		let price = 0;
		d.forEach((el, index) => {
			if (el[0] >= startDate.getTime() && el[0] <= endDate.getTime()) {
				sum += el[1];
				if (priceArray !== undefined)
					price += el[1] * priceArray.data[index % priceArray.data.length][1];
				if (el[1] > peak[1]) peak = el;
			}
		});
		summaryData.push({ name, peak, sum, price, lineIndex });
	});
	return summaryData;
};

export function touchHandler(event) {
	var touches = event.changedTouches,
		first = touches[0],
		type = '';
	switch (event.type) {
		case 'touchstart':
			type = 'mousedown';
			break;
		case 'touchmove':
			type = 'mousemove';
			break;
		case 'touchend':
			type = 'mouseup';
			break;
		default:
			return;
	}
	var simulatedEvent = document.createEvent('MouseEvent');
	simulatedEvent.initMouseEvent(
		type,
		true,
		true,
		window,
		1,
		first.screenX,
		first.screenY,
		first.clientX,
		first.clientY,
		false,
		false,
		false,
		false,
		0 /*left*/,
		null,
	);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}
