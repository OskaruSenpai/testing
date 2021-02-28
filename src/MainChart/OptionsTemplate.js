import { getScaledUnit } from '../FakeData';

export function getOptionsTemplate(
	currentResolution,
	startDate,
	endDate,
	showSummary = false,
) {
	return {
		title: {
			show: false,
		},
		calculable: true,
		toolbox: {
			show: false,
		},
		legend: {
			data: [],
		},
		tooltip: {},
		// tooltip: {
		// 	trigger: 'axis',
		// 	formatter: (params) => {
		// 		if (params[0].seriesType === 'line') {
		// 			const [
		// 				{
		// 					data: [, priceValue],
		// 				},
		// 			] = params.filter(({ seriesName }) => seriesName === 'Prices');
		// 			const date = new Date(params[0].value[0]);
		// 			const dd =
		// 				date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		// 			const mm =
		// 				date.getMonth() + 1 < 10
		// 					? `0${date.getMonth() + 1}`
		// 					: date.getMonth() + 1;
		// 			let dateLabel;
		// 			if (currentResolution === 'hourly') {
		// 				const hh =
		// 					date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		// 				const min =
		// 					date.getMinutes() < 10
		// 						? `0${date.getMinutes()}`
		// 						: date.getMinutes();
		// 				dateLabel = `<span style="border-bottom:2px solid #fff">${hh}:${min} ${dd}-${mm} (${
		// 					date.toString().split(' ')[0]
		// 				}) | ${priceValue.toFixed(2)} €/MW</span>`;
		// 			} else {
		// 				dateLabel = `<span style="border-bottom:2px solid #fff">${dd}-${mm}-${date.getFullYear()} (${
		// 					date.toString().split(' ')[0]
		// 				}) | ${priceValue.toFixed(2)} €/MWh</span>`;
		// 			}

		// 			return params.reduce((acc, current) => {
		// 				if (current.seriesName === 'Prices') return acc;
		// 				return `${acc}<br>${current.marker}${current.seriesName}: ${
		// 					current.data[1] === null
		// 						? 'No data'
		// 						: `${getScaledUnit(
		// 								current.data[1],
		// 								'MW',
		// 								currentResolution === 'hourly' ? '' : 'h',
		// 						  )}${
		// 								currentResolution === 'hourly'
		// 									? ''
		// 									: ` | ${(current.data[1] * priceValue).toFixed(2)}€`
		// 						  }`
		// 				}`;
		// 			}, dateLabel);
		// 		} else {
		// 			return params.data;
		// 		}
		// 	},
		// 	axisPointer: {
		// 		animation: false,
		// 	},
		// },
		grid: [
			{
				id: 'main-chart',
				left: '3%',
				right: showSummary ? '20%' : '3%',
				bottom: '14%',
				top: '12%',
				containLabel: true,
			},
			{
				id: 'cost-chart',
				right: showSummary ? '3%' : '-15%',
				width: showSummary ? '15%' : 0,
				height: '23%',
				top: '5%',
				containLabel: true,
			},
			{
				id: 'peak-chart',
				right: showSummary ? '3%' : '-15%',
				width: showSummary ? '15%' : 0,
				height: '23%',
				top: '32%',
				containLabel: true,
			},
			{
				id: 'sum-chart',
				right: showSummary ? '3%' : '-15%',
				width: showSummary ? '15%' : 0,
				height: '23%',
				top: '59%',
				containLabel: true,
			},
		],
		xAxis: [
			{
				gridIndex: 0,
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
			{
				name: 'Cost',
				nameLocation: 'center',
				position: 'top',
				nameGap: -15,
				show: true,
				scale: true,
				type: 'category',
				gridIndex: 1,
				splitLine: {
					show: false,
				},
				axisLine: { show: false, symbol: 'none' },
				axisTick: {
					show: false,
				},
				axisLabel: { show: false },
			},
			{
				name: 'Sum',
				nameLocation: 'center',
				position: 'top',
				nameGap: -15,
				show: true,
				scale: true,
				type: 'category',
				gridIndex: 2,
				splitLine: {
					show: false,
				},
				axisLine: { show: false, symbol: 'none' },
				axisTick: {
					show: false,
				},
				axisLabel: { show: false },
			},
			{
				name: 'Peak',
				nameLocation: 'center',
				position: 'top',
				nameGap: -15,
				show: true,
				scale: true,
				type: 'category',
				gridIndex: 3,
				splitLine: {
					show: false,
				},
				axisLine: { show: false, symbol: 'none' },
				axisTick: {
					show: false,
				},
				axisLabel: { show: false },
			},
		],
		yAxis: [
			{
				scale: true,
				type: 'value',
				gridIndex: 0,
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
				gridIndex: 0,
				axisLabel: {
					formatter: (value) => `${value}€`,
				},
			},
			{
				seriesLayoutBy: 'row',
				type: 'value',
				scale: true,
				gridIndex: 1,
				position: 'right',
				min: 0,
				max: function (value) {
					return Math.round(value.max * 1.2);
				},
			},
			{
				seriesLayoutBy: 'row',
				type: 'value',
				scale: true,
				gridIndex: 2,
				position: 'right',
				min: 0,
				max: function (value) {
					return Math.round(value.max * 1.2);
				},
			},
			{
				seriesLayoutBy: 'column',
				type: 'value',
				scale: true,
				gridIndex: 3,
				position: 'right',
				min: 0,
				max: function (value) {
					return Math.round(value.max * 1.2);
				},
			},
		],
		series: [
			{
				legend: {},
				tooltip: {
					formatter: ({ data: { houseName, cost } }) => {
						return `${houseName}: <strong>${cost.toFixed(2)} €</strong>`;
					},
				},
				name: 'Campus',
				label: {
					show: true,
					position: 'inside',
					rotate: -69,
					formatter: ({ data: { cost } }) => {
						return `${cost.toFixed(2)} €`;
					},
				},
				// seriesLayoutBy: 'row',
				type: 'bar',
				encode: {
					x: 'houseName',
					y: 'cost',
				},
				xAxisIndex: 1,
				yAxisIndex: 2,
			},
			{
				legend: {},
				tooltip: {
					formatter: ({ data: { houseName, sum } }) => {
						return `${houseName}: <strong>${sum.toFixed(2)} MWh</strong>`;
					},
				},
				label: {
					show: true,
					position: 'inside',
					rotate: -69,
					formatter: ({ data: { sum } }) => {
						return `${sum.toFixed(2)} MWh`;
					},
				},
				// seriesLayoutBy: 'row',
				type: 'bar',
				encode: {
					x: 'houseName',
					y: 'sum',
				},
				xAxisIndex: 2,
				yAxisIndex: 3,
			},
			{
				legend: {},
				tooltip: {
					formatter: ({ data: { houseName, peak } }) => {
						return `${houseName}: <strong>${peak.toFixed(2)} MW</strong>`;
					},
				},
				label: {
					show: true,
					position: 'inside',
					rotate: -69,
					formatter: ({ data: { peak } }) => {
						return `${peak.toFixed(2)} MW`;
					},
				},
				// seriesLayoutBy: 'row',
				type: 'bar',
				encode: {
					x: 'houseName',
					y: 'peak',
				},
				xAxisIndex: 3,
				yAxisIndex: 4,
			},
		],

		// Enable graph zoom & pan
		axisPointer: {
			link: { xAxisIndex: 'all' },
		},
		dataZoom: [
			{
				id: 'dataZoomX',
				type: 'inside',
				realtime: true,
				xAxisIndex: [0],
				start: 50,
				end: 100,
				minValueSpan: currentResolution * 7,
			},
		],
		useUTC: true,
	};
}

export const generateDataset = (rawData) => {
	// console.log(rawData);
	if (!rawData) return { source: [] };
	const prices = rawData.find(({ name }) => name === 'Prices');
	// console.log(prices);
	if (!prices) return { source: [] };
	const parsedPrices = prices.data.reduce((acc, [key, value]) => {
		acc[key] = value;
		return acc;
	}, {});

	const source = [];
	console.log(parsedPrices, rawData);
	rawData.forEach(({ name, data }) => {
		if (name === 'Prices') return;
		let peak = 0;
		let cost = 0;
		const sum = data.reduce((acc, cur) => {
			if (cur[1] > peak) peak = cur[1];
			cost += cur[1] * parsedPrices[cur[0]];
			return acc + cur[1];
		}, 0);
		source.push({
			houseName: name,
			raw: data,
			cost,
			sum,
			peak,
		});
	});
	return { source };
};

export const optionsChanger = (acc, { name, data }) => {
	return {
		...acc,
		legend: {
			data: [
				...acc.legend.data,
				name !== 'Prices'
					? name
					: {
							name,
							icon: 'path://M75 0 25 75 L75 125 L125 75 Z',
					  },
			],
		},
		series: [
			...acc.series,
			{
				name,
				type: 'line',
				smooth: true,
				data,
				tooltip: {},
				showSymbol: false,
				connectNulls: false,
				yAxisIndex: name === 'Prices' ? 1 : 0,
				color: name === 'Prices' ? '#ff4500' : '',
				lineStyle:
					name === 'Prices'
						? {
								type: 'dotted',
								width: 2,
						  }
						: { width: 2 },
				markPoint:
					name === 'Campus' || name === 'Total'
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
};
