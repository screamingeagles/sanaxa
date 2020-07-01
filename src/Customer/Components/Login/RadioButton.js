import React, { useReducer, useEffect } from "react";

import "./RadioButton.css";

const radioReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE": {
			return {
				...state,
				// value: action.val,
				// isValid: true,
			};
		}
		// case "TOUCH": {
		// 	return {
		// 		...state,
		// 		isTouched: true,
		// 	};
		// }
		default:
			return state;
	}
};

const RadioButton = (props) => {
	const [inputState, dispatch] = useReducer(radioReducer, {
		value: props.initialValue || "",
		// isTouched: false,
		// isValid: props.initialValid || false,
	});
	// console.log(inputState.value, props.value);

	const onChangeHandler = (event) => {
		// console.log("OC", event.target.value);
		console.log("OC", event);
		// onInput();
		// dispatch({
		// type: "CHANGE",
		// val: event,
		// val: event.target.value,
		// validators: true,
		// });
	};

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	// useEffect(() => {
	// 	onInput();
	// }, [id, onInput, value]);

	return (
		<label
			style={props.style}
			// htmlFor={props.name}
			class='radiocontrol radiocontrol-checkbox'
			onClick={props.onClick}>
			<p style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
				{props.children}
			</p>
			<input
				// checked={props.checked}
				checked={props.value === inputState.value}
				type='radio'
				value={props.value}
				// id={props.name}
				// name={props.name}
				onChange={(e) => console.log(e.target.value)}
			/>
			<div class='radiocontrol_indicator'></div>
		</label>
	);
};

export default RadioButton;
