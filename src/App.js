import EchartsDonut from './EchartsDonut';
import EchartsLine from './MainChart/Chart';
import './App.css';
import { useState } from 'react';
import { randomValueBetween } from './FakeData';

export const getDistinctColor = (colorNum, colors) => {
	return `hsl(${
		(colorNum * (360 / (colors < 1 ? 1 : colors))) % 360
	},100%,50%)`;
};

function App() {
	const [data3, setData3] = useState([1, 2, 3]);
	const [data4, setData4] = useState([1, 2, 3]);
	return (
		<>
			<section>
				<div id="donuts-container">
					{/* <EchartsDonut data={data3} unit="kW" desc="Power consumption" />
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
				</div>
			</section>
			<section>
				<EchartsLine />
			</section>
		</>
	);
}

export default App;
