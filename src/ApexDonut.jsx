import { useState } from 'react';
import Chart from 'react-apexcharts';
function ApexDonut(props) {
	const { data } = props;
	const [options, updateOptions] = useState({
		legend: { show: false },
		dataLabels: { enabled: false },
	});
	return (
		<div className="donut-chart">
			<Chart
				options={options}
				series={data}
				type="donut"
				width="100%"
			/>
		</div>
	);
}

export default ApexDonut;
