import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
	switch (action.type) {
		case "INPUT_CHANGE":
			let formIsValid = true;
			for (const inputId in state.inputs) {
				// console.log(state.inputs[inputId]);
				if (!state.inputs[inputId]) {
					continue;
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
						isError: action.isError,
						howMany: action.howMany,
						howManyMaximum: action.howManyMaximum,
						isTouched: action.isTouched,
						addOnId: action.addOnId,
					},
				},
				isValid: formIsValid,
			};
		case "SET_DATA":
			return {
				inputs: action.inputs,
				isValid: action.formIsValid,
			};
		default:
			return state;
	}
};

export const useForm = (initialInput, initialFormValidity) => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInput,
		isValid: initialFormValidity,
	});

	const inputHandler = useCallback(
		(
			id,
			value,
			isValid,
			howMany,
			howManyMaximum,
			isError,
			isTouched,
			addOnId
		) => {
			// console.log("IH", id, value, isValid, isError);
			dispatch({
				type: "INPUT_CHANGE",
				inputId: id,
				value: value,
				isValid: isValid,
				howMany,
				howManyMaximum,
				isError,
				isTouched,
				addOnId,
			});
		},
		[]
	);

	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: "SET_DATA",
			inputs: inputData,
			formIsValid: formValidity,
		});
	}, []);

	return [formState, inputHandler, setFormData];
};
