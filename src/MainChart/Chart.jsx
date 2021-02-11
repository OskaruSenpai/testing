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
	getDistinctColor,
	tagType,
} from '../FakeData';

import { touchHandler, getBufferSize } from './Helpers';
import { getOptionsTemplate, optionsChanger } from './OptionsTemplate';
import SummaryBlock from './SummaryBlock';
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
	const [selectedBuildings, updateSelectedBuildings] = useState(
		possibleBuildings.reduce((acc, curr) => {
			acc[curr] = true;
			return acc;
		}, {}),
	);

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
	}, [startDate, endDate, currentResolution]);

	useEffect(() => {
		const options = (data ?? []).reduce(
			optionsChanger,
			getOptionsTemplate(currentResolution, startDate, endDate, summaryVisible),
		);
		if (chartRef.current !== null)
			chartRef.current.getEchartsInstance().setOption(options, false, true);
	}, [data, summaryVisible]);

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

	const legendselectchanged = ({ selected }) => {
		updateSelectedBuildings(selected);
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
					// onEvents={{
					// 	dataZoom: (params) => {
					// 		console.log(params);
					// 	},
					// 	legendselectchanged,
					// }}
				/>
			</div>
		</div>
	);
}

export default LineChart;
