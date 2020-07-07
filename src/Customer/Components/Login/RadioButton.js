import React, { useReducer } from "react";

import "./RadioButton.css";

const radioReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE": {
			return {
				...state,
				value: action.val,
				isValid: true,
			};
		}
		default:
			return state;
	}
};

const RadioButton = (props) => {
	const [, dispatch] = useReducer(radioReducer, {
		value: props.initialValue || "",
	});

	const onChangeHandler = (id, price, event, addOnId) => {
		onInput(
			id,
			{ _id: props.addOnItemId, item: event.target.value, price },
			true,
			"",
			"",
			"",
			true,
			addOnId
		);
		dispatch({
			type: "CHANGE",
			val: { item: event.target.value, price },
		});
	};

	const { onInput } = props;

	return (
		<label
			style={props.style}
			class='radiocontrol radiocontrol-checkbox'
			onClick={props.onClick}>
			<p style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
				{props.children}
			</p>
			<input
				checked={props.checked}
				type='radio'
				value={props.value}
				name={props.name}
				onChange={(e) =>
					onChangeHandler(props.name, props.price, e, props.addOnId)
				}
			/>
			<div class='radiocontrol_indicator'></div>
		</label>
	);
};

export default RadioButton;
