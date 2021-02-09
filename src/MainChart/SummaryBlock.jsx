import React from 'react';
import { getDistinctColor, getScaledUnit } from '../FakeData';

export default function SummaryBlock(props) {
	const { summaryData, showSummary, resolution, selectedBuildings } = props;
	if (summaryData === undefined) return <></>;
	const colorPalletSize = summaryData.length;
	return (
		<div id="summary-container">
			<div className="summary-data-row">
				<strong />
				<strong>Peak</strong>
				<strong>Sum</strong>
				<strong>Cost</strong>
			</div>
			{/* {summaryData.map((el, i) => {
				const { name, peak, sum, price = 0 } = el;
				if (name === 'Prices') return <></>;
				if (selectedBuildings !== {} && selectedBuildings[name] === false)
					return <></>;
				return (
					<div className="summary-data-row" key={name}>
						<strong className="summary-icon-container">
							<div
								className="summary-icon"
								style={{
									backgroundColor: getDistinctColor(i, colorPalletSize),
								}}
							/>
						</strong>
						<i>
							{getScaledUnit(peak[1], 'MW', resolution !== 'hourly' ? 'h' : '')}
						</i>
						<i>{getScaledUnit(sum, 'MW', 'h')}</i>
						<i>{price.toFixed(2)} €</i>
					</div>
				);
			})} */}
		</div>
	);
}
