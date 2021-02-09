import { useState } from 'react';
import Chart from 'react-apexcharts';
function ApexLineGraph(props) {
	const { data } = props;
	console.log(data);
	const [options, updateOptions] = useState({
		// legend: { show: false },
		dataLabels: { enabled: false },
		chart: {
			type: 'line',
			stacked: false,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
			toolbar: {
				autoSelected: 'zoom',
			},
			animations: {
				animateGradually: {
					enabled: true,
				},
				speed: 1000,
				enabled: true,
				easing: 'linear',
				dynamicAnimation: {
					enabled: true,
					speed: 1000,
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		xaxis: {
			// type: 'datetime',
			labels: {
				datetimeFormatter: {
					year: 'yyyy',
					month: "MMM 'yy",
					day: 'dd MMM',
					hour: 'HH:mm',
				},
			},
		},
		yaxis: [
			{
				seriesName: 'House 0',
				max: 110,
				labels: {
					formatter: (val) => {
						if (val !== null) {
							return val.toFixed(2);
						} else {
							return 'No Data';
						}
					},
				},
			},
			{
				// seriesName: 'Prices',
				opposite: true,
				labels: {
					formatter: (val) => {
						if (val !== null) {
							return `${Math.round(val)} €`;
						} else {
							return 'No Data';
						}
					},
				},
			},
		],
	});
	return (
		<div className="line-chart">
			<Chart options={options} series={data} height="100%" width="100%" />
		</div>
	);
}

export default ApexLineGraph;
