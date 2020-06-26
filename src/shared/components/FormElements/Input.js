import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE": {
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		}
		case "TOUCH": {
			return {
				...state,
				isTouched: true,
			};
		}
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);

	const onChangeHandler = (event) => {
		dispatch({
			type: "CHANGE",
			val: event.target.value,
			validators: props.validators,
		});
	};

	const onTouchHandler = () => {
		dispatch({
			type: "TOUCH",
		});
	};

	const element =
		props.element === "select" ? (
			<div></div>
		) : props.element === "input" ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				value={inputState.value}
				onChange={onChangeHandler}
				onBlur={onTouchHandler}
			/>
		) : (
			<textarea
				placeholder={props.placeholder}
				id={props.id}
				rows={props.rows || 1}
				value={inputState.value}
				onChange={onChangeHandler}
				onBlur={onTouchHandler}
			/>
		);

	return (
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
		</div>
	);
};

export default Input;
