import { useState } from 'react';
import { VictoryLine, VictoryChart, VictoryZoomContainer } from 'victory';

const filterData = (
	data,
	zoomedXDomain,
	distanceBetweenPoints = 0,
	maxPoints = 100,
) => {
	const filtered = data.filter(
		(d) => d[0] >= zoomedXDomain[0] && d[0] <= zoomedXDomain[1],
	);

	// new code here...
	if (filtered.length > maxPoints) {
		const k = Math.ceil(filtered.length / maxPoints);
		return filtered.filter((d, i) => i % k === 0);
	}
	return filtered;
};

function VictoryLineGraph(props) {
	const { data, startDate, endDate } = props;
	const [zoomedXDomain, setXDomain] = useState([0, 0]);
	if (data === undefined) return <div>Waiting for data</div>;

	return (
		<div className="line-chart">
			<VictoryChart
				domain={{ x: [startDate, endDate], y: [0, 20] }}
				containerComponent={
					<VictoryZoomContainer
						zoomDimension="x"
						onZoomDomainChange={({ x }) => {
							// @ts-ignore
							setXDomain(x);
						}}
					/>
				}
			>
				{data.map((i) => {
					return (
						<VictoryLine
							key={i.name}
							data={filterData(i.data, zoomedXDomain)}
							x={0}
							y={1}
						/>
					);
				})}
			</VictoryChart>
		</div>
	);
}

export default VictoryLineGraph;
