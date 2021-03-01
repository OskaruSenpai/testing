import Chart from 'echarts-for-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
	getBackEndData,
	possibleBuildings,
	possibleResolutions,
	predefinedSections,
	getScaledUnit,
	toggleLoadingScreen,
	getUsableScreenSize,
	tagType,
} from '../FakeData';

import { touchHandler, getBufferSize } from './Helpers';
import {
	generateDataset,
	getOptionsTemplate,
	optionsChanger,
} from './OptionsTemplate';
import OptionsBar from './OptionsBar';
import './Chart.css';
import axios from 'axios';

const formatData = (data) => {
	return data.map(({ displayName: name, numbers }) => {
		return {
			name,
			data: Object.entries(numbers).map(([timestamp, value]) => [
				parseInt(timestamp),
				value,
			]),
		};
	});
};

const summaryTooltipFormatter = ({
	seriesName,
	data,
	seriesIndex,
	name: type,
}) => {
	let unit = '€';
	if (type === 'Sum') {
		unit = 'MWh';
	} else if (type === 'Peak') {
		unit = 'MW';
	}
	return `${seriesName}: ${data[seriesIndex - 4].toFixed(2)} ${unit}`;
};

const summaryLabelFormatter = ({ data, seriesIndex, name: type }) => {
	let unit = '€';
	if (type === 'Sum') {
		unit = 'MWh';
	} else if (type === 'Peak') {
		unit = 'MW';
	}
	return `${data[seriesIndex - 4].toFixed(2)} ${unit}`;
};

const updateData = (
	dataURL,
	priceURL,
	startDate,
	endDate,
	resolution,
	updateFunction,
	show = 0,
) => {
	console.log(startDate, endDate);
	const { pastBuffer, futureBuffer } = getBufferSize(startDate, endDate);
	const dataRequest = axios.post(dataURL, {
		action: 'get',
		start: pastBuffer.getTime(),
		end: futureBuffer.getTime(),
		houseName: 'Campus',
		resolution,
		show,
	});
	const priceRequest = axios.post(priceURL, {
		start: pastBuffer.getTime(),
		end: futureBuffer.getTime(),
	});
	Promise.all([dataRequest, priceRequest]).then(
		([{ data }, { data: prices }]) => {
			console.log([...formatData(data), ...formatData(prices)]);
			updateFunction([...formatData(data), ...formatData(prices)]);
		},
	);
};

function LineChart(props) {
	const { dataURL, pricesURL } = props;
	const chartRef = useRef(null);
	const [data, renderNewData] = useState(undefined);

	const [desiredValues, setDesiredValues] = useState(
		tagType.reduce((acc, cur, i) => {
			if (i === 0) {
				acc[cur] = true;
			} else {
				acc[cur] = false;
			}
			return acc;
		}, {}),
	);

	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(
		new Date(endDate.getTime() - predefinedSections['24 hours']),
	);

	const [currentResolution, setResolution] = useState(
		possibleResolutions['hourly'],
	);
	const [summaryVisible, showSummary] = useState(false);

	useEffect(() => {
		updateData(
			dataURL,
			pricesURL,
			startDate,
			endDate,
			currentResolution,
			renderNewData,
		);
	}, [
		startDate,
		endDate,
		currentResolution,
		desiredValues,
		dataURL,
		pricesURL,
	]);

	useEffect(() => {
		let options = (data ?? []).reduce(optionsChanger, {
			...getOptionsTemplate(
				currentResolution,
				startDate,
				endDate,
				summaryVisible,
			),
		});

		if (summaryVisible) {
			options.dataset = generateDataset(data ?? []);
			options.series = options.dataset.source.slice(1).reduce((acc, [name]) => {
				return [
					...acc,
					{
						legend: {},
						tooltip: {
							formatter: summaryTooltipFormatter,
						},
						name,
						label: {
							show: true,
							position: 'insideLeft',
							formatter: summaryLabelFormatter,
						},
						seriesLayoutBy: 'row',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 2,
					},
				];
			}, options.series);
		}
		console.log(options);

		if (chartRef.current !== null)
			chartRef.current.getEchartsInstance().setOption(options, false, true);
	}, [data, summaryVisible, startDate, endDate, currentResolution]);

	// Calculate the inital options only once
	const options = useMemo(
		() =>
			getOptionsTemplate(
				possibleResolutions['hourly'],
				new Date(new Date().getTime() - predefinedSections['24 hours']),
				new Date(),
			),
		[],
	);

	// Guard clause for empty data
	if (data === undefined)
		return <div className="chart-container">Waiting for data</div>;

	const dataZoom = (params) => {
		console.log(params);
	};

	// TODO: zoom & pan event handler

	// TODO: render the OptionsOverlay element for mobile
	return (
		<div id="chart-container">
			<OptionsBar
				buttonActions={{
					setDesiredValues,
					showSummary,
					setResolution,
					setEndDate,
					setStartDate,
					updateData,
					renderNewData,
				}}
				currentValues={{
					desiredValues,
					summaryVisible,
					startDate,
					endDate,
					currentResolution,
					dataURL,
					pricesURL,
				}}
			/>
			<div id="chart">
				<Chart
					option={options}
					opts={{ renderer: 'svg' }}
					ref={chartRef}
					style={{
						height: '100%',
						width: '100%',
					}}
					// TODO: Figure out how to enable these without losing the smooth animations
					// onEvents={{
					// 	dataZoom,
					// }}
				/>
			</div>
		</div>
	);
}

export default LineChart;
