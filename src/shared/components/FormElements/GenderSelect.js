import React from "react";

import "./GenderSelect.css";

const GenderSelect = (props) => {
	return (
		<div className='toggle'>
			{props.checked && (
				<>
					<input
						type='radio'
						name='gender'
						value='Male'
						id='male'
						onChange={() => props.onChangeHandler("Male")}
						onBlur={props.onTouchHandler}
						checked={props.checked === "Male"}
					/>
					<label for='male'>Male</label>
					<input
						type='radio'
						name='gender'
						value='Female'
						id='female'
						checked={props.checked === "Female"}
						onChange={() => props.onChangeHandler("Female")}
						onBlur={props.onTouchHandler}
					/>
					<label for='female'>Female</label>
				</>
			)}
			{!props.checked && (
				<>
					<input
						type='radio'
						name='gender'
						value='Male'
						id='male'
						onChange={() => props.onChangeHandler("Male")}
						onBlur={props.onTouchHandler}
					/>
					<label for='male'>Male</label>
					<input
						type='radio'
						name='gender'
						value='Female'
						id='female'
						onChange={() => props.onChangeHandler("Female")}
						onBlur={props.onTouchHandler}
					/>
					<label for='female'>Female</label>
				</>
			)}
		</div>
	);
};

export default GenderSelect;
