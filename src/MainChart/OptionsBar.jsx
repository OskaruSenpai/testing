import DatePicker from 'react-date-picker';
import { tagType, possibleResolutions, predefinedSections } from '../FakeData';

export default function OptionsBar(props) {
	const {
		currentValues: { summaryVisible, startDate, endDate, currentResolution },
		buttonActions: {
			showSummary,
			setResolution,
			setStartDate,
			setEndDate,
			updateData,
			renderNewData,
		},
	} = props;
	const { production, consumption } = tagType;
	return (
		<div id="options-bar">
			<button>Production</button>
			<button>Consumption</button>
			{Object.entries(predefinedSections)
				.sort((a, b) => a[1] - b[1])
				.map(([key, value]) => (
					<button
						key={key}
						value={value}
						onClick={() => {
							const endDate = new Date();
							const startDate = new Date(endDate.getTime() - value);
							setStartDate(startDate);
							setEndDate(endDate);
						}}
					>
						{key}
					</button>
				))}

			<select
				value={currentResolution}
				onChange={({ target: { value: v } }) => {
					setResolution(parseInt(v));
				}}
			>
				{Object.entries(possibleResolutions)
					.sort((a, b) => a[1] - b[1])
					.map(([key, value]) => (
						<option key={key} value={value}>
							{key}
						</option>
					))}
			</select>
			<button
				onClick={() => {
					showSummary(!summaryVisible);
				}}
			>
				Summary
			</button>
			<button
				onClick={() => {
					updateData(
						startDate.getTime(),
						endDate.getTime(),
						currentResolution,
						renderNewData,
					);
				}}
			>
				Search
			</button>
		</div>
	);
}
