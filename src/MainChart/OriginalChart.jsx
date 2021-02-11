// @ts-nocheck
import React from 'react';
// import '../style.css';
// import axios from 'axios';
// import 'react-day-picker/lib/style.css';
// import ReactEcharts from 'echarts-for-react';
// import { getScaledUnit } from '../FakeData';
// import OptionsBar from './OptionsBar';

// import { tagType, possibleResolutions } from '@iot/common';

// import {
// 	getScaledUnit,
// 	toggleLoadingScreen,
// 	getUsableScreenSize,
// 	getDistinctColor,
// } from '../../../util/generalHelpers';

// import OptionsBar from './OptionsBar';
// import OptionsOverlay from './OptionsOverlay';
// import {
// 	autoUpdater,
// 	calucalteSummaryInfo,
// 	getBufferSize,
// 	preventFutureDate,
// } from './Helpers';
// import SummaryBlock from './SummaryBlock';

export default class ChartWithFilter extends React.Component {

	// constructor(props) {
		// this.containerRef = React.createRef();
	// 	this.state = {
	// 		selectedBuildings: {},
	// 		chartDimensions: { width: '', height: '', paddingBottom: '' },
	// 		fullscreenGraph: false,
	// 		fullscreenGraphSettings: false,
	// 		currentResolution: 'daily',
	// 		userSelectedResolution: false,
	// 		autoUpdate: true,
	// 		// active_display: tagType.consumption,
	// 		active_timeframe: '1m',
	// 		endDate: new Date(),
	// 		startDate: new Date(),
	// 		startDataPoint: null,
	// 		endDataPoint: null,
	// 		showSummary: false,
	// 		priceArray: [],
	// 		graphOptions: {
	// 			title: {
	// 				show: false,
	// 			},
	// 			calculable: true,
	// 			tooltip: {
	// 				trigger: 'axis',
	// 				formatter: (params) => {
	// 					const date = new Date(params[0].value[0]);
	// 					const { priceArray, currentResolution } = this.state;
	// 					let currentDayPrice = 0;
	// 					try {
	// 						[, currentDayPrice] = priceArray[
	// 							params[0].dataIndex % priceArray.length
	// 						];
	// 					} catch (error) {
	// 						console.error(error);
	// 					}
	// 					const dd =
	// 						date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	// 					const mm =
	// 						date.getMonth() + 1 < 10
	// 							? `0${date.getMonth() + 1}`
	// 							: date.getMonth() + 1;
	// 					let dateLabel;
	// 					if (currentResolution === 'hourly') {
	// 						const hh =
	// 							date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	// 						const min =
	// 							date.getMinutes() < 10
	// 								? `0${date.getMinutes()}`
	// 								: date.getMinutes();
	// 						dateLabel = `<span style="border-bottom:2px solid #fff">${hh}:${min} ${dd}-${mm} (${
	// 							date.toString().split(' ')[0]
	// 						}) | ${currentDayPrice.toFixed(2)} €/MW</span>`;
	// 					} else {
	// 						dateLabel = `<span style="border-bottom:2px solid #fff">${dd}-${mm}-${date.getFullYear()} (${
	// 							date.toString().split(' ')[0]
	// 						}) | ${currentDayPrice.toFixed(2)} €/MWh</span>`;
	// 					}

	// 					return params.reduce((acc, current) => {
	// 						if (current.seriesName === 'Prices') return acc;
	// 						return `${acc}<br>${current.marker}${current.seriesName}: ${
	// 							current.data[1] === null
	// 								? 'No data'
	// 								: `${getScaledUnit(
	// 										current.data[1],
	// 										'MW',
	// 										currentResolution === 'hourly' ? '' : 'h',
	// 								  )}${
	// 										currentResolution === 'hourly'
	// 											? ''
	// 											: ` | ${(current.data[1] * currentDayPrice).toFixed(
	// 													2,
	// 											  )}€`
	// 								  }`
	// 						}`;
	// 					}, dateLabel);
	// 				},
	// 				axisPointer: {
	// 					animation: false,
	// 				},
	// 			},
	// 			toolbox: {
	// 				show: false,
	// 			},
	// 			legend: {
	// 				x: 'center',
	// 				y: 'center',
	// 				data: [],
	// 				itemWidth: 10,
	// 				type: 'scroll',
	// 				orient: 'horizontal',
	// 			},
	// 			grid: {
	// 				left: '3%',
	// 				right: '3%',
	// 				bottom: '14%',
	// 				top: '12%',
	// 				containLabel: true,
	// 			},
	// 			xAxis: {
	// 				type: 'time',
	// 				splitLine: {
	// 					show: false,
	// 				},
	// 				boundaryGap: false,
	// 				axisLine: { onZero: false },
	// 				axisLabel: {
	// 					formatter: (value) => {
	// 						const { startDate, endDate, currentResolution } = this.state;
	// 						const date = new Date(value);
	// 						const dd =
	// 							date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	// 						const mm =
	// 							date.getMonth() + 1 < 10
	// 								? `0${date.getMonth() + 1}`
	// 								: date.getMonth() + 1;
	// 						const hh =
	// 							date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	// 						const min =
	// 							date.getMinutes() < 10
	// 								? `0${date.getMinutes()}`
	// 								: date.getMinutes();
	// 						if (currentResolution === 'hourly') {
	// 							// Also show time of the day
	// 							return `${hh}:${min} (${dd}-${mm})`;
	// 						}
	// 						if (startDate.getFullYear() === endDate.getFullYear()) {
	// 							// All values have the same year, don't have to specify it
	// 							return `${dd}-${mm}`;
	// 						}
	// 						if (
	// 							startDate.getFullYear().toString()[-2] !==
	// 							endDate.getFullYear().toString()[-2]
	// 						) {
	// 							// Values from different decades, show more than 2 year values
	// 							return `${dd}-${mm}-${date.getFullYear()}`;
	// 						}
	// 						// Show the classic dd-mm-yy representation
	// 						return `${dd}-${mm}-${date.getFullYear().toString().substr(-2)}`;
	// 					},
	// 				},
	// 			},
	// 			yAxis: [
	// 				{
	// 					scale: true,
	// 					type: 'value',
	// 					axisLabel: {
	// 						formatter: (value) => {
	// 							const { currentResolution } = this.state;
	// 							return getScaledUnit(
	// 								value,
	// 								'MW',
	// 								currentResolution !== 'hourly' ? 'h' : '',
	// 							);
	// 						},
	// 					},
	// 				},
	// 				{
	// 					scale: true,
	// 					type: 'value',
	// 					axisLabel: {
	// 						formatter: (value) => `${value}€`,
	// 					},
	// 				},
	// 			],
	// 			seriesLine: {
	// 				cursor: 'cursor',
	// 				animation: false,
	// 			},
	// 			series: [],

	// 			// Enable graph zoom & pan
	// 			axisPointer: {
	// 				link: { xAxisIndex: 'all' },
	// 			},
	// 			dataZoom: [
	// 				{
	// 					type: 'inside',
	// 					realtime: true,
	// 					start: 50,
	// 					end: 100,
	// 					minValueSpan: 604800000,
	// 				},
	// 			],
	// 			useUTC: true,
	// 		},
	// 	};
	// 	this.data = [];
	// 	this.waiting = null;
	// 	this.interval = 0;
	// }

	// componentDidMount() {
	// 	window.addEventListener('resize', () => {
	// 		this.updateUsableScreenSize();
	// 	});
	// 	window.addEventListener('orientationchange', () => {
	// 		this.updateUsableScreenSize();
	// 	});
	// 	const {
	// 		startDate,
	// 		endDate,
	// 		startDataPoint,
	// 		endDataPoint,
	// 		graphOptions,
	// 		autoUpdate,
	// 	} = this.state;
	// 	startDate.setMonth(startDate.getMonth() - 1);
	// 	if (startDataPoint !== null) {
	// 		const { value } = startDataPoint; // Takes the first value from the array and assigns to the "value" variable
	// 		graphOptions.dataZoom.startValue = value;
	// 		graphOptions.dataZoom.start = null;
	// 	}
	// 	if (endDataPoint !== null) {
	// 		const { value } = startDataPoint; // Takes the first value from the array and assigns to the "value" variable
	// 		graphOptions.dataZoom.endValue = value;
	// 		graphOptions.dataZoom.end = null;
	// 	}

	// 	this.setState({ startDate, graphOptions }, () => {
	// 		this.getLineData();
	// 	});
	// 	if (autoUpdate) {
	// 		this.interval = autoUpdater(this, startDate, endDate);
	// 	}
	// }

	// componentWillUnmount() {
	// 	clearInterval(this.interval);
	// 	window.removeEventListener('resize', () => {
	// 		this.updateUsableScreenSize();
	// 	});
	// 	window.removeEventListener('orientationchange', () => {
	// 		this.updateUsableScreenSize();
	// 	});
	// }

	// legendChangeHandler = (params) => {
	// 	this.setState({ selectedBuildings: params.selected });
	// };


	// dataZoomEventHandler = (params) => {
	// 	// Always update last positions
	// 	if (this.data.length < 1) return;
	// 	const { start, end } = params.batch[0]; // Values are given in percent of data array 0-100
	// 	const { userSelectedResolution } = this.state;
	// 	const startDataPoint = this.data[0].data[
	// 		Math.round(this.data[0].data.length * (start / 100))
	// 	];
	// 	const endDataPoint = this.data[0].data[
	// 		Math.round(this.data[0].data.length * (end / 100)) <
	// 		this.data[0].data.length
	// 			? Math.round(this.data[0].data.length * (end / 100))
	// 			: this.data[0].data.length - 1
	// 	];
	// 	// If we're already waiting for update don't try to change the time
	// 	if (this.waiting) {
	// 		this.setState(
	// 			{
	// 				startDataPoint,
	// 				endDataPoint,
	// 			},
	// 			() => {
	// 				this.waiting = toggleLoadingScreen(
	// 					document.getElementById('chart-container'),
	// 					this.waiting,
	// 					1,
	// 				);
	// 			},
	// 		);
	// 		return;
	// 	}
	// 	// Get required variables
	// 	const { startDate, endDate, currentResolution } = this.state;
	// 	let needNewData = false;

	// 	// Recalculate the start- & endDate
	// 	const { timeDif } = getBufferSize(
	// 		new Date(startDataPoint[0]),
	// 		new Date(endDataPoint[0]),
	// 	);
	// 	let newStartDate = startDate;
	// 	let newEndDate = endDate;

	// 	if (start < 20 || start > 66) {
	// 		newStartDate = new Date(startDataPoint[0]);
	// 		newEndDate = new Date(endDataPoint[0]);
	// 		needNewData = true;
	// 	}

	// 	// Logic for calculating new resolution on zooming in and out
	// 	let newResolution = currentResolution;
	// 	if (!userSelectedResolution) {
	// 		if (
	// 			currentResolution === 'hourly' &&
	// 			timeDif > possibleResolutions.daily * 7
	// 		) {
	// 			needNewData = true;
	// 			newResolution = 'daily';
	// 		} else if (
	// 			currentResolution === 'daily' &&
	// 			timeDif > possibleResolutions.weekly * 7
	// 		) {
	// 			needNewData = true;
	// 			newResolution = 'weekly';
	// 		} else if (
	// 			currentResolution === 'daily' &&
	// 			timeDif < possibleResolutions.daily * 7
	// 		) {
	// 			needNewData = true;
	// 			newResolution = 'hourly';
	// 		} else if (
	// 			currentResolution === 'weekly' &&
	// 			timeDif < possibleResolutions.weekly * 7
	// 		) {
	// 			needNewData = true;
	// 			newResolution = 'daily';
	// 		}
	// 	}
	// 	const summaryData = calucalteSummaryInfo(
	// 		this.data,
	// 		preventFutureDate(new Date(startDataPoint[0])),
	// 		preventFutureDate(new Date(endDataPoint[0])),
	// 	);

	// 	if (needNewData) {
	// 		this.setState(
	// 			{
	// 				currentResolution: newResolution,
	// 				startDate: preventFutureDate(newStartDate),
	// 				endDate: preventFutureDate(newEndDate),
	// 				active_timeframe: 'custom',
	// 				startDataPoint,
	// 				endDataPoint,
	// 				summaryData,
	// 			},
	// 			() => {
	// 				this.getLineData(true);
	// 			},
	// 		);
	// 	} else {
	// 		this.setState({
	// 			startDate: preventFutureDate(newStartDate),
	// 			endDate: preventFutureDate(newEndDate),
	// 			active_timeframe: 'custom',
	// 			startDataPoint,
	// 			endDataPoint,
	// 			summaryData,
	// 		});
	// 	}
	// };

	// setSeries = (data, backgroundUpdate = false) => {
	// 	const {
	// 		graphOptions: options,
	// 		startDate,
	// 		endDate,
	// 		currentResolution,
	// 	} = this.state;
	// 	options.legend.data = [];
	// 	options.series = [];
	// 	let startValue = null;
	// 	let endValue = null;
	// 	if (backgroundUpdate) {
	// 		const { startDataPoint, endDataPoint } = this.state;
	// 		startValue = startDataPoint;
	// 		endValue = endDataPoint;
	// 	} else {
	// 		startValue = data[0].data.find((e) => {
	// 			return (
	// 				e[0] >= startDate.getTime() - possibleResolutions[currentResolution]
	// 			);
	// 		});
	// 		endValue = data[0].data.find((e) => {
	// 			return (
	// 				e[0] >= endDate.getTime() - possibleResolutions[currentResolution]
	// 			);
	// 		});
	// 	}

	// 	const summaryData = calucalteSummaryInfo(data, startDate, endDate);
	// 	const res = data.reduce((acc, current, i) => {
	// 		return {
	// 			...acc,
	// 			legend: {
	// 				x: 'center',
	// 				y: '4%',
	// 				itemWidth: 10,
	// 				type: 'scroll',
	// 				orient: 'horizontal',
	// 				data: [
	// 					...acc.legend.data,
	// 					current.name !== 'Prices'
	// 						? current.name
	// 						: {
	// 								name: current.name,
	// 								icon: 'path://M75 0 25 75 L75 125 L125 75 Z',
	// 						  },
	// 				],
	// 			},
	// 			series: [
	// 				...acc.series,
	// 				{
	// 					name: current.name,
	// 					type: 'line',
	// 					smooth: true,
	// 					animation: false,
	// 					data: current.data
	// 						.map((e) => {
	// 							return e[1] === 0 ? [e[0], null] : e;
	// 						})
	// 						.sort((a, b) => a[0] - b[0]),
	// 					showSymbol: false,
	// 					connectNulls: false,
	// 					yAxisIndex: current.name === 'Prices' ? 1 : 0,
	// 					color:
	// 						current.name === 'Prices'
	// 							? '#ff4500'
	// 							: getDistinctColor(i, data.length),
	// 					lineStyle:
	// 						current.name === 'Prices'
	// 							? {
	// 									type: 'dashed',
	// 							  }
	// 							: {},
	// 					markPoint:
	// 						current.name === 'Campus' || current.name === 'Total'
	// 							? {
	// 									silent: false,
	// 									symbolSize: 12,
	// 									label: {
	// 										show: false,
	// 									},
	// 									data: [
	// 										{
	// 											name: 'maximum',
	// 											type: 'max',
	// 											symbol: 'path://M150 0 L75 250 L225 250 Z',
	// 											symbolOffset: [0, 10],
	// 										},
	// 										{
	// 											name: 'minimum',
	// 											type: 'min',
	// 											symbol: 'path://M150 150 L75 0 L225 0 Z',
	// 											symbolOffset: [0, -10],
	// 										},
	// 									],
	// 							  }
	// 							: null,
	// 				},
	// 			],
	// 			dataZoom: [
	// 				{
	// 					type: 'inside',
	// 					realtime: true,
	// 					startValue: startValue ? startValue[0] : null,
	// 					endValue: endValue ? endValue[0] : null,
	// 					minValueSPan: 604800000,
	// 				},
	// 			],
	// 		};
	// 	}, options);
	// 	this.echarts_react.getEchartsInstance().setOption(res, true);
	// 	this.setState({ graphOptions: res, summaryData });
	// };

	/**
	 * Function to get data from an API.
	 *
	 */
	// getLineData = (backgroundUpdate = false) => {
	// 	this.data = [];
	// 	const { pricesURL, dataURL, houseName } = this.props;
	// 	const {
	// 		currentResolution,
	// 		active_display,
	// 		startDate,
	// 		endDate,
	// 	} = this.state;

	// 	if (this.waiting) {
	// 		console.warn('Already waiting for the data');
	// 		return;
	// 	}
	// 	if (backgroundUpdate) {
	// 		this.waiting = true;
	// 	} else {
	// 		this.waiting = toggleLoadingScreen(
	// 			document.getElementById('chart-container'),
	// 			this.waiting,
	// 			1,
	// 		);
	// 	}

	// 	// Get all data from a single url
	// 	const { pastBuffer, futureBuffer } = getBufferSize(startDate, endDate);
	// 	axios
	// 		.post(dataURL, {
	// 			action: 'get',
	// 			start: pastBuffer.getTime(),
	// 			end: futureBuffer.getTime(),
	// 			houseName,
	// 			resolution: possibleResolutions[currentResolution],
	// 			show: active_display,
	// 		})
	// 		.then((result) => {
	// 			let priceData;
	// 			try {
	// 				priceData = axios.post(pricesURL, {
	// 					start: pastBuffer.getTime(),
	// 					end: futureBuffer.getTime(),
	// 				});
	// 			} catch (error) {
	// 				console.error(error);
	// 			}

	// 			Promise.all([priceData]).then(([prices]) => {
	// 				this.setState({ priceArray: prices.data }, () => {
	// 					const { priceArray } = this.state;
	// 					this.data.push({ name: 'Prices', data: priceArray });
	// 					this.setSeries(this.data, backgroundUpdate);
	// 				});
	// 			});

	// 			this.data = result.data.reduce((acc, i) => {
	// 				if (i.pinned === true && i.numbers !== null) {
	// 					return [
	// 						...acc,
	// 						{
	// 							name: i.displayName,
	// 							// Map the data into an understandable format for the EChart library
	// 							data: Object.entries(i.numbers).reduce(
	// 								(num_acc, [key, value]) => {
	// 									return [
	// 										...num_acc,
	// 										[new Date(parseInt(key, 10)).getTime(), value],
	// 									];
	// 								},
	// 								[],
	// 							),
	// 						},
	// 					];
	// 				}
	// 				return acc;
	// 			}, []);

	// 			this.setSeries(this.data, backgroundUpdate);
	// 			if (backgroundUpdate && this.waiting === true) {
	// 				this.waiting = false;
	// 			} else {
	// 				this.waiting = toggleLoadingScreen(
	// 					document.getElementById('chart-container'),
	// 					this.waiting,
	// 				);
	// 			}
	// 		})
	// 		.catch((e) => {
	// 			console.error(e);
	// 		});
	// };

	// updateUsableScreenSize() {
	// 	const container = [...this.containerRef.current.classList];
	// 	const chartDimensions = container.includes('active')
	// 		? getUsableScreenSize(window.innerHeight > window.innerWidth)
	// 		: { width: '', height: '' };
	// 	this.setState({
	// 		chartDimensions,
	// 	});
	// }

	render() {
		return <div>This is a chart</div>}
			// <div
			// 	id="chart-container"
			// 			className={`over-view${fullscreenGraph ? ' active' : ''}`}
			// 			style={{
			// 				height:
			// 					chartDimensions.height !== '' ? `${chartDimensions.height}px` : '',
			// 				width:
			// 					chartDimensions.width !== '' ? `${chartDimensions.width}px` : '',
			// 				paddingBottom:
			// 					chartDimensions.paddingBottom !== ''
			// 						? `${chartDimensions.paddingBottom}px`
			// 						: '',
			// 			}}
			// 			ref={this.containerRef}
			// >
			// 			<OptionsBar
			// 				state={{
			// 					autoUpdate,
			// 					active_display,
			// 					active_timeframe,
			// 					currentResolution,
			// 					startDate: startDataPoint ? new Date(startDataPoint[0]) : startDate,
			// 					endDate: endDataPoint ? new Date(endDataPoint[0]) : endDate,
			// 					showSummary,
			// 				}}
			// 				parent={this}
			// 			/>
			// 			<OptionsOverlay
			// 				state={{
			// 					autoUpdate,
			// 					fullscreenGraph,
			// 					fullscreenGraphSettings,
			// 					chartDimensions,
			// 					currentResolution,
			// 					active_timeframe,
			// 					active_display,
			// 					startDate: startDataPoint ? new Date(startDataPoint[0]) : startDate,
			// 					endDate: endDataPoint ? new Date(endDataPoint[0]) : endDate,
			// 					showSummary,
			// 				}}
			// 				parent={this}
			// 	/>
			// <div
			// 		id="chart"
			// 		style={showSummary ? { gridTemplateColumns: '70% 30%' } : {}}
			// 	>
			// 				<ReactEcharts
			// 					style={{
			// 						height: '100%',
			// 						minHeight: '40vmin',
			// 						width: '100%',
			// 						gridArea: 'Graph',
			// 					}} // Overwrite default library values
			// 					option={graphOptions}
			// 					opts={{ renderer: 'svg' }}
			// 					ref={(e) => {
			// 						this.echarts_react = e;
			// 					}}
			// 					onEvents={{
			// 						dataZoom: this.dataZoomEventHandler,
			// 						legendselectchanged: this.legendChangeHandler,
			// 					}}
			// 				/>
			// 				{showSummary && (
			// 					<SummaryBlock
			// 						selectedBuildings={selectedBuildings}
			// 						summaryData={summaryData}
			// 						showSummary={showSummary}
			// 						resolution={currentResolution}
			// 					/>
			// 				)}
			// 		</div>
			// 	</div>
		// )
	// };
		}
