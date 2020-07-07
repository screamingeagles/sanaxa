import React, { useReducer } from "react";

import "./Checkbox.scss";

const checkBoxReducer = (state, action) => {
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

const Checkbox = (props) => {
	const [, dispatch] = useReducer(checkBoxReducer, {
		value: props.initialValue || "",
	});

	const onChangeHandler = (
		id,
		price,
		event,
		prevState,
		howMany,
		howManyMaximum,
		requiredStatus,
		addOnId
	) => {
		let arr = [...prevState];
		let tempArray, newArray;
		const itemExisted = arr.find((i) => i.item === event.target.value);
		if (itemExisted) {
			tempArray = arr.filter((i) => {
				// console.log("t/f", i.item !== event.target.value);
				return i.item !== event.target.value;
			});
			newArray = tempArray.slice(0, howManyMaximum ? howManyMaximum : howMany);
			onInput(
				id,
				tempArray,
				!requiredStatus && tempArray.length <= howMany
					? true
					: tempArray.length !== 0
					? howManyMaximum
						? tempArray.length <= howManyMaximum
						: tempArray.length > howManyMaximum
						? howManyMaximum === tempArray.length
						: howMany === tempArray.length
						? true
						: false
					: false,
				howMany,
				howManyMaximum,
				howManyMaximum
					? tempArray.length > howManyMaximum
					: tempArray.length > howMany,
				tempArray.length === 0 ? false : true,
				addOnId
			);
			return;
		}
		if (!itemExisted) {
			tempArray = [
				...arr,
				{ _id: props.addOnItemId, item: event.target.value, price },
			];
			newArray = tempArray.slice(0, howManyMaximum ? howManyMaximum : howMany);
			if (newArray.length <= howMany || howManyMaximum >= newArray.length) {
				onInput(
					id,
					tempArray,
					!requiredStatus && tempArray.length <= howMany
						? true
						: tempArray.length !== 0
						? howManyMaximum
							? tempArray.length <= howManyMaximum
							: tempArray.length > howManyMaximum
							? howManyMaximum === tempArray.length
							: howMany === tempArray.length
							? true
							: false
						: false,
					howMany,
					howManyMaximum,
					howManyMaximum
						? tempArray.length > howManyMaximum
						: tempArray.length > howMany,
					tempArray.length === 0 ? false : true,
					addOnId
				);
			}
		}
		dispatch({
			type: "CHANGE",
			val: tempArray,
			isValid: true,
		});
	};

	const { onInput } = props;

	return (
		<label
			style={
				(props.style,
				{
					"--background-color-checkbox": props.backgroundColor || "#ed1b24",
					"--radius-check": props.backgroundColor ? "100%" : "0px",
					"--height-width": props.backgroundColor ? "20px" : "17px",
					"--tick-top": props.backgroundColor ? "3px" : "2px",
					"--tick-left": props.isValid
						? "8px"
						: props.backgroundColor
						? "6px"
						: "5px",
					"--tick-box": props.isValid ? "0px" : "2px",
					"--tick-height": props.isValid ? "11px" : "8px",
					"--tick-width": props.isValid ? "2px" : "3px",
					"--tick-degree": props.isValid ? "180deg" : "45deg",
				})
			}
			class='control control-checkbox'
			onClick={props.onClick}>
			<p style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
				{props.children}
			</p>
			<input
				checked={props.checked}
				disabled={props.disabled}
				type='checkbox'
				value={props.value}
				name={props.name}
				onChange={(e) =>
					onChangeHandler(
						props.name,
						props.price,
						e,
						props.prevState,
						props.howMany,
						props.howManyMaximum,
						props.requiredStatus,
						props.addOnId
					)
				}
			/>
			<div class='control_indicator'></div>
		</label>
	);
};

export default Checkbox;
