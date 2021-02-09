import Chart from 'echarts-for-react';

function touchHandler(event) {
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

	// initMouseEvent(type, canBubble, cancelable, view, clickCount,
	//                screenX, screenY, clientX, clientY, ctrlKey,
	//                altKey, shiftKey, metaKey, button, relatedTarget);

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

const getScaledUnit = (
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
	const units = ['TW', 'GW', 'MW', 'kW', 'W'];
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

function LineChart(props) {
	const { data, startDate, endDate } = props;
	if (data === undefined)
		return <div className="line-chart">Waiting for data</div>;
	const currentResolution = 'hourly';
	const optionsTemplate = {
		title: {
			show: false,
		},
		calculable: true,
		tooltip: {
			trigger: 'axis',
			formatter: (params) => {
				const date = new Date(params[0].value[0]);
				let currentDayPrice = 0;
				const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
				const mm =
					date.getMonth() + 1 < 10
						? `0${date.getMonth() + 1}`
						: date.getMonth() + 1;
				let dateLabel;
				if (currentResolution === 'hourly') {
					const hh =
						date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
					const min =
						date.getMinutes() < 10
							? `0${date.getMinutes()}`
							: date.getMinutes();
					dateLabel = `<span style="border-bottom:2px solid #fff">${hh}:${min} ${dd}-${mm} (${
						date.toString().split(' ')[0]
					}) | ${currentDayPrice.toFixed(2)} €/MW</span>`;
				} else {
					dateLabel = `<span style="border-bottom:2px solid #fff">${dd}-${mm}-${date.getFullYear()} (${
						date.toString().split(' ')[0]
					}) | ${currentDayPrice.toFixed(2)} €/MWh</span>`;
				}

				return params.reduce((acc, current) => {
					if (current.seriesName === 'Prices') return acc;
					return `${acc}<br>${current.marker}${current.seriesName}: ${
						current.data[1] === null
							? 'No data'
							: `${getScaledUnit(
									current.data[1],
									'MW',
									currentResolution === 'hourly' ? '' : 'h',
							  )}${
									currentResolution === 'hourly'
										? ''
										: ` | ${(current.data[1] * currentDayPrice).toFixed(2)}€`
							  }`
					}`;
				}, dateLabel);
			},
			axisPointer: {
				animation: false,
			},
		},
		toolbox: {
			show: false,
		},
		legend: {
			x: 'center',
			y: 'center',
			data: [],
			itemWidth: 10,
			type: 'scroll',
			orient: 'horizontal',
		},
		grid: {
			left: '3%',
			right: '3%',
			bottom: '14%',
			top: '12%',
			containLabel: true,
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false,
			},
			boundaryGap: false,
			axisLine: { onZero: false },
			axisLabel: {
				formatter: (value) => {
					const date = new Date(value);
					const dd =
						date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
					const mm =
						date.getMonth() + 1 < 10
							? `0${date.getMonth() + 1}`
							: date.getMonth() + 1;
					const hh =
						date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
					const min =
						date.getMinutes() < 10
							? `0${date.getMinutes()}`
							: date.getMinutes();
					if (currentResolution === 'hourly') {
						// Also show time of the day
						return `${hh}:${min} (${dd}-${mm})`;
					}
					if (startDate.getFullYear() === endDate.getFullYear()) {
						// All values have the same year, don't have to specify it
						return `${dd}-${mm}`;
					}
					if (
						startDate.getFullYear().toString()[-2] !==
						endDate.getFullYear().toString()[-2]
					) {
						// Values from different decades, show more than 2 year values
						return `${dd}-${mm}-${date.getFullYear()}`;
					}
					// Show the classic dd-mm-yy representation
					return `${dd}-${mm}-${date.getFullYear().toString().substr(-2)}`;
				},
			},
		},
		yAxis: [
			{
				scale: true,
				type: 'value',
				axisLabel: {
					formatter: (value) => {
						return getScaledUnit(
							value,
							'MW',
							currentResolution !== 'hourly' ? 'h' : '',
						);
					},
				},
			},
			{
				scale: true,
				type: 'value',
				axisLabel: {
					formatter: (value) => `${value}€`,
				},
			},
		],
		seriesLine: {
			cursor: 'cursor',
			animation: false,
		},
		series: [],

		// Enable graph zoom & pan
		axisPointer: {
			link: { xAxisIndex: 'all' },
		},
		dataZoom: [
			{
				type: 'inside',
				realtime: true,
				start: 50,
				end: 100,
				minValueSPan: 604800000,
			},
		],
		useUTC: true,
	};
	const options = data.reduce((acc, i) => {
		return {
			...acc,
			legend: {
				data: [
					...acc.legend.data,
					i.name !== 'Prices'
						? i.name
						: {
								name: i.name,
								icon: 'path://M75 0 25 75 L75 125 L125 75 Z',
						  },
				],
			},
			series: [
				...acc.series,
				{
					name: i.name,
					type: 'line',
					smooth: true,
					data: i.data,
					showSymbol: false,
					connectNulls: false,
					yAxisIndex: i.name === 'Prices' ? 1 : 0,
					color: i.name === 'Prices' ? '#ff4500' : '',
					lineStyle:
						i.name === 'Prices'
							? {
									type: 'dashed',
							  }
							: {},
					markPoint:
						i.name === 'Campus' || i.name === 'Total'
							? {
									silent: false,
									symbolSize: 12,
									label: {
										show: false,
									},
									data: [
										{
											name: 'maximum',
											type: 'max',
											symbol: 'path://M150 0 L75 250 L225 250 Z',
											symbolOffset: [0, 10],
										},
										{
											name: 'minimum',
											type: 'min',
											symbol: 'path://M150 150 L75 0 L225 0 Z',
											symbolOffset: [0, -10],
										},
									],
							  }
							: null,
				},
			],
		};
	}, optionsTemplate);
	return (
		<div
			className="line-chart"
			onTouchMove={(e) => touchHandler}
			onTouchStart={(e) => touchHandler}
			onTouchCancel={(e) => touchHandler}
			onTouchEnd={(e) => touchHandler}
		>
			<Chart
				option={options}
				opts={{ renderer: 'svg' }}
				style={{ height: '100%', width: '100%' }}
			/>
		</div>
	);
}

export default LineChart;
