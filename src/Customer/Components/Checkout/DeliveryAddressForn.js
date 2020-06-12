import React from "react";
import classes from "./DeliveryAddressForn.module.css";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "./../../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "./../../../shared/util/validators";

const DeliveryAddressForn = (props) => {
	const [formState, inputHandler, setFormData] = useForm(
		{
			address1: {
				value: "",
				isValid: false,
			},
			address2: {
				value: "",
				isValid: false,
			},
			mobileNumber: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	return (
		<div className={classes.DeliveryAddressForn}>
			<form onSubmit={(e) => e.preventDefault()}>
				<Input
					id='address1'
					element='input'
					placeholder='Address 1'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid data'
					type='text'
				/>
				<Input
					id='address2'
					element='input'
					placeholder='Address 2'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid data'
					type='text'
				/>
				<Input
					id='mobileNumber'
					element='input'
					placeholder='Mobile Number'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid data'
					type='text'
				/>
			</form>
		</div>
	);
};

export default DeliveryAddressForn;
