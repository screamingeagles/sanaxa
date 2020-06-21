import React, { useReducer, useEffect, useCallback } from "react";

import { validate } from "../../util/validators";

import classes from "./SignUpInput.module.css";
import GenderSelect from "./GenderSelect";

const signUpInputReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE": {
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		}
		case "SELECT": {
			return {
				...state,
				value: action.val,
				isValid: action.validators,
			};
		}
		case "TOUCH": {
			return {
				...state,
				isTouched: true,
			};
		}
		case "OLD": {
			return {
				...state,
				value: action.val,
				isValid: action.validators,
			};
		}
		default:
			return state;
	}
};

const SignUpInput = (props) => {
	const [inputState, dispatch] = useReducer(signUpInputReducer, {
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

	const onSelectHandler = (gender) => {
		dispatch({
			type: "SELECT",
			val: gender,
			validators: true,
		});
	};

	const oldInputHandler = useCallback(
		(id, value, isValid) => {
			if (props.oldInput) {
				let v;
				if (new Date(props.oldInput).getFullYear()) {
					let year = new Date(props.oldInput).getFullYear();
					let month = new Date(props.oldInput).getMonth() + 1;
					let date = new Date(props.oldInput).getDate();
					if (month < 10 && date < 10) v = `${year}-0${month}-0${date}`;
					else if (month < 10) v = `${year}-0${month}-${date}`;
					else if (date < 10) v = `${year}-${month}-0${date}`;
				} else v = props.oldInput;

				dispatch({
					type: "OLD",
					val: v,
					validators: true,
				});
			}
		},
		[props.oldInput]
	);

	useEffect(() => {
		oldInputHandler();
	}, [oldInputHandler]);

	const onTouchHandler = () => {
		dispatch({
			type: "TOUCH",
		});
	};

	const element =
		props.element === "gender" ? (
			<>
				{!props.oldInput && (
					<GenderSelect
						onChangeHandler={(gender) => onSelectHandler(gender)}
						onTouchHandler={onTouchHandler}
					/>
				)}
				{props.oldInput && (
					<GenderSelect
						checked={props.oldInput ? props.oldInput : "false"}
						onChangeHandler={(gender) => onSelectHandler(gender)}
						onTouchHandler={onTouchHandler}
					/>
				)}
			</>
		) : props.element === "input" ? (
			<>
				<input
					id={props.id}
					disabled={props.disabled}
					type={props.type}
					placeholder={props.placeholder}
					value={inputState.value}
					onChange={onChangeHandler}
					onBlur={onTouchHandler}
				/>
			</>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				value={inputState.value}
				onChange={onChangeHandler}
				onBlur={onTouchHandler}
			/>
		);

	return (
		<>
			<div
				className={[
					classes.formControl,
					!inputState.isValid &&
						inputState.isTouched &&
						classes.formControlInvalid,
				].join(" ")}>
				<label htmlFor={props.id}>{props.label}</label>
				{element}
			</div>
			{!inputState.isValid && inputState.isTouched && (
				<p
					className={[
						classes.formControl,
						!inputState.isValid &&
							inputState.isTouched &&
							classes.formControlInvalidP,
					].join(" ")}>
					{props.errorText}
				</p>
			)}
		</>
	);
};

export default SignUpInput;
