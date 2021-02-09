import Chart from 'echarts-for-react';
import { useEffect, useState } from 'react';
import {
	getBackEndData,
	possibleBuildings,
	possibleResolutions,
	predefinedSections,
} from '../FakeData';
import { touchHandler } from './Helpers';
import { getOptionsTemplate, optionsChanger } from './OptionsTemplate';
import SummaryBlock from './SummaryBlock';
import OptionsBar from './OptionsBar';
import './Chart.css';

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
	startTimeStamp,
	endTimeStamp,
	resolution,
	updateFunction,
) => {
	getBackEndData(startTimeStamp, endTimeStamp, resolution).then((data) => {
		console.log('Parsed data:', formatData(data));
		updateFunction(formatData(data));
	});
};

function LineChart(props) {
	const [data, renderNewData] = useState(undefined);
	const [startDate, setStartDate] = useState(
		new Date(new Date().getTime() - predefinedSections['24 hours']),
	);
	const [endDate, setEndDate] = useState(new Date());

	const [currentResolution, setResolution] = useState(
		possibleResolutions['hourly'],
	);
	const [summaryVisible, showSummary] = useState(false);

	useEffect(() => {
		updateData(
			startDate.getTime(),
			endDate.getTime(),
			currentResolution,
			renderNewData,
		);
	}, [startDate, endDate]);

	// Guard clause for empty data
	if (data === undefined)
		return <div className="chart-container">Waiting for data</div>;

	const options = data.reduce(
		optionsChanger,
		getOptionsTemplate(currentResolution, startDate, endDate),
	);
	return (
		<div
			id="chart-container"
			onTouchMove={(e) => touchHandler}
			onTouchStart={(e) => touchHandler}
			onTouchCancel={(e) => touchHandler}
			onTouchEnd={(e) => touchHandler}
		>
			<OptionsBar
				buttonActions={{ showSummary, setResolution, setEndDate, setStartDate }}
				currentValues={{
					summaryVisible,
					startDate,
					endDate,
					currentResolution,
				}}
			/>
			<div id="chart">
				<Chart
					option={options}
					opts={{ renderer: 'svg' }}
					style={{ height: '100%', width: '100%' }}
				/>
				{summaryVisible && (
					<SummaryBlock
						selectedBuildings={possibleBuildings}
						summaryData={data}
						showSummary={summaryVisible}
						resolution={currentResolution}
					/>
				)}
			</div>
		</div>
	);
}

export default LineChart;
