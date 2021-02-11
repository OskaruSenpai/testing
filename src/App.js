import EchartsDonut from './EchartsDonut';
import ChartWithFilter from './MainChart/Chart';
import OriginalChartWithFilter from './MainChart/OriginalChart';
import './App.css';
import { useState } from 'react';
import { randomValueBetween } from './FakeData';

export const getDistinctColor = (colorNum, colors) => {
	return `hsl(${
		(colorNum * (360 / (colors < 1 ? 1 : colors))) % 360
	},100%,50%)`;
};

function App() {
	return (
		<>
			<section>
				<OriginalChartWithFilter
					dataURL="http://localhost:5000/api/campus/graph-data"
					pricesURL="http://localhost:5000/api/price/date-range"
				/>
			</section>
			<section>
				<ChartWithFilter
					dataURL="http://localhost:5000/api/campus/graph-data"
					pricesURL="http://localhost:5000/api/price/date-range"
				/>
			</section>
		</>
	);
}

export default App;
