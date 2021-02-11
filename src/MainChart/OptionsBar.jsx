import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { possibleResolutions, predefinedSections } from '../FakeData';

export default function OptionsBar(props) {
	const [valuesDisplayVisible, setValuesDisplayVisibility] = useState(false);
	const {
		currentValues: {
			summaryVisible,
			startDate,
			endDate,
			currentResolution,
			desiredValues,
			dataURL,
			pricesURL,
		},
		buttonActions: {
			setDesiredValues,
			showSummary,
			setResolution,
			setStartDate,
			setEndDate,
			updateData,
			renderNewData,
		},
	} = props;
	return (
		<div id="options-bar">
			<div
				id="desired-values-container"
				onMouseLeave={() => {
					setValuesDisplayVisibility(false);
				}}
			>
				<button
					id="desired-values-toggle-button"
					onClick={() => {
						setValuesDisplayVisibility(!valuesDisplayVisible);
					}}
				>
					Values
					<i className={`arrow ${valuesDisplayVisible ? 'up' : 'down'}`}></i>
				</button>
				<div
					id="desired-values-content"
					style={{ display: valuesDisplayVisible ? 'flex' : '' }}
				>
					{Object.entries(desiredValues).map(([key, value]) => {
						return (
							<button
								key={key}
								value={key}
								className={value ? 'active' : ''}
								onClick={() => {
									setDesiredValues({ ...desiredValues, [key]: !value });
								}}
							>
								{key}
							</button>
						);
					})}
				</div>
			</div>
			{Object.entries(predefinedSections)
				.sort((a, b) => a[1] - b[1])
				.map(([key, value]) => (
					<button
						key={key}
						className={endDate - startDate === value ? 'active' : ''}
						value={value}
						onClick={(e) => {
							console.log(e.target);
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
			<div className="dates">
				<DatePicker
					onChange={(value) => setStartDate(value)}
					value={startDate}
					format="dd-MM-yyyy"
					maxDate={endDate}
					clearIcon={null}
					className={
						!Object.values(predefinedSections).some(
							(value) => value === endDate - startDate,
						)
							? 'active'
							: ''
					}
				/>
				<span> - </span>
				<DatePicker
					onChange={(value) => setEndDate(value)}
					value={endDate}
					format="dd-MM-yyyy"
					maxDate={new Date()}
					clearIcon={null}
					className={
						!Object.values(predefinedSections).some(
							(value) => value === endDate - startDate,
						)
							? 'active'
							: ''
					}
				/>
			</div>
			{/* <button
				className={summaryVisible ? 'active' : ''}
				onClick={() => {
					showSummary(!summaryVisible);
				}}
			>
				Summary
			</button> */}
			<button
				onClick={() => {
					updateData(
						dataURL,
						pricesURL,
						startDate,
						endDate,
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
