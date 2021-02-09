import EchartsDonut from './EchartsDonut';
import EchartsLine from './EchartsLineGraph';
import VictoryLine from './VictoryLineChart';
import './App.css';
import { useState } from 'react';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getDistinctColor = (colorNum, colors) => {
	return `hsl(${
		(colorNum * (360 / (colors < 1 ? 1 : colors))) % 360
	},100%,50%)`;
};

function randomValueBetween(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

const updateData = async (houses, from, to) => {
	return new Promise(async (resolve, reject) => {
		const waitTime = randomValueBetween(0, 1);
		console.log(`waiting for data for ${waitTime} seconds`);
		await delay(waitTime * 1000);
		const output = houses.map((houseName, index) => {
			let currentTime = from;
			const data = [];
			while (currentTime <= to) {
				if (houseName === 'Prices') {
					data.push([currentTime, randomValueBetween(12, 15)]);
				} else {
					data.push([currentTime, randomValueBetween(0, 10)]);
				}
				currentTime += 3600000;
			}
			// return data;
			return {
				name: houseName,
				data,
			};
		});
		console.log(output);
		resolve(output);
	});
};

function App() {
	const [data3, setData3] = useState([1, 2, 3]);
	const [data4, setData4] = useState([1, 2, 3]);
	const [lineData, setLineData] = useState(undefined);
	const [dateStart, updateDateStart] = useState(
		new Date(2021, 1, 7, 0, 0, 0, 0),
	);
	const [dateEnd, updateDateEnd] = useState(new Date());
	console.log(lineData);
	return (
		<>
			<section>
				<div id="donuts-container">
					{/* <EchartsDonut data={data3} />
					<EchartsDonut data={data4} unit="kW" desc="Power consumption" /> */}
				</div>
				<div id="misc-info">
					<button
						onClick={() => {
							setData3(data3.map(() => Math.round(randomValueBetween(1, 10))));
						}}
					>
						Update left donut
					</button>
					<button
						onClick={() => {
							setData4(data4.map(() => Math.round(randomValueBetween(1, 10))));
						}}
					>
						Update right donut
					</button>
					<button
						onClick={() => {
							updateData(
								['Campus', 'Building 1', 'Building 2', 'Prices'],
								dateStart.getTime(),
								dateEnd.getTime(),
							).then((data) => {
								setLineData(data);
							});
						}}
					>
						Update line data
					</button>
				</div>
			</section>
			<section>
				<EchartsLine data={lineData} startDate={dateStart} endDate={dateEnd} />
				{/* <VictoryLine data={lineData} startDate={dateStart} endDate={dateEnd} /> */}
			</section>
		</>
	);
}

export default App;
