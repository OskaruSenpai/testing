import Chart from 'echarts-for-react';
import { getScaledUnit } from './FakeData';

const calculateBarColors = (values) => {
	return parseFloat(values[0]) > parseFloat(values[1]) ? '#cd3939' : '#42b939';
};

const calculateDisplayValues = (values) => {
	let current = 0;
	const [val0, val1, val2] = values;

	if (!values.some((r) => parseFloat(r) !== 0)) {
		return [0, 0, 1];
	}

	if (parseFloat(val0) > parseFloat(val1)) {
		current = val1;
	} else {
		current = val0;
	}
	const difference = Math.abs(val0 - val1);
	const total = val2 - current - difference;
	return [
		{ value: Math.abs(current) },
		{ value: Math.abs(difference) },
		{ value: Math.abs(total) },
	];
};

function Donut(props) {
	const { series, desc, unit } = props;
	const options = {
		width: '100%',
		height: '100%',
		tooltip: {
			show: true,
			formatter: (params) => {
				return getScaledUnit(
					params.value,
					unit.substring(0, 2),
					unit.length <= 2 ? '' : 'h',
				);
			},
		},
		legend: {
			show: false,
		},
		series: [
			{
				type: 'pie',
				radius: ['75%', '95%'],
				avoidLabelOverlap: true,
				label: {
					normal: {
						show: false,
						position: 'center',
					},
				},
				data: calculateDisplayValues(series),
				animation: true,
				hoverAnimation: false,
				cursor: 'unset',
				emphasis: {
					itemStyle: {
						opacity: 1,
					},
				},
			},
		],
		animation: true,
		color: ['#008ffb', calculateBarColors(series), '#ccc'],
	};
	return (
		<div className="donut-chart">
			<div className="donut-data">
				<h1>
					{getScaledUnit(
						series[0],
						unit.substring(0, 2),
						unit.length <= 2 ? '' : 'h',
						false,
					)}
					<span>{unit}</span>
				</h1>
				<p>{desc}</p>
			</div>
			<Chart
				option={options}
				opts={{ renderer: 'svg' }}
				lazyUpdate={true}
				style={{ height: '100%', width: '100%' }}
			/>
		</div>
	);
}

export default Donut;
