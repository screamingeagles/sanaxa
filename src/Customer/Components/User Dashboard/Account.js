import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import Logo from "../../../shared/assets/Images/snaxaLogo.svg";
// import google from "../../../shared/assets/Images/google.png";
// import facebook from "../../../shared/assets/Images/facebook.png";

import {
	VALIDATOR_EMAIL,
	// VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	// VALIDATOR_CONFIRMPASSWORD,
} from "./../../../shared/util/validators";

import { useForm } from "./../../../shared/hooks/form-hook";
import { useHttpClient } from "./../../../shared/hooks/http-hook";
// import { AuthContext } from "../../../shared/context/auth-context";
// import { BasketContext } from "./../../../shared/context/basket-context";

import Button from "./../../../shared/components/FormElements/Button";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";
import SignUpInput from "../../../shared/components/FormElements/SignUpInput";
import Checkbox from "./../Login/Checkbox";

import classes from "./Account.module.css";

const Account = (props) => {
	// const auth = useContext(AuthContext);
	// const basket = useContext(BasketContext);
	const history = useHistory();

	const [newsletter, setNewsletter] = useState(false);
	// const [count, setCount] = useState(0);
	const [SMS, setSMS] = useState(false);
	// const [year, setYear] = useState();
	// const [month, setMonth] = useState();
	// const [date, setDate] = useState();

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			fname: {
				value: "",
				isVaild: false,
			},
			lname: {
				value: "",
				isVaild: false,
			},
			date: {
				value: "",
				isVaild: false,
			},
			gender: {
				value: "",
				isVaild: false,
			},
		},
		false
	);

	const isSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/signup`,
				"POST",
				{
					"Content-Type": "application/json",
				},
				JSON.stringify({
					email: formState.inputs.email.value,
					fname: formState.inputs.fname.value,
					lname: formState.inputs.lname.value,
					gender: formState.inputs.gender.value,
					date: formState.inputs.date.value,
					password: formState.inputs.password.value,
					newsletter,
					SMS,
				})
			);
			clearError();
			history.replace("/authentication");
		} catch (err) {}
	};

	useEffect(() => {
		if (props.u) {
			// console.log(props.u);
			setNewsletter(props.u && props.u.newsletter);
			setSMS(props.u && props.u.SMS);

			// setFormData(
			// 	{
			// 		email: {
			// 			value: "",
			// 			isValid: false,
			// 		},
			// 		fname: {
			// 			value: "",
			// 			isVaild: false,
			// 		},
			// 		lname: {
			// 			value: "",
			// 			isVaild: false,
			// 		},
			// 		date: {
			// 			value: "",
			// 			isVaild: false,
			// 		},
			// 		gender: {
			// 			value: "",
			// 			isVaild: false,
			// 		},
			// 	},
			// 	false
			// );
		}
	}, [props.u]);

	let contentForm;
	if (props.u)
		contentForm = (
			<>
				<SignUpInput
					label='Email'
					id='email'
					element='input'
					type='text'
					disabled
					validators={[VALIDATOR_EMAIL()]}
					errorText='Email is required'
					onInput={inputHandler}
					oldInput={props.u && props.u.email}
				/>
				<SignUpInput
					disabled
					label='First Name'
					id='fname'
					element='input'
					type='text'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='First Name is required'
					onInput={inputHandler}
					oldInput={props.u && props.u.fname}
				/>
				<SignUpInput
					disabled
					label='Last Name'
					id='lname'
					element='input'
					type='text'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Last Name is required'
					onInput={inputHandler}
					oldInput={props.u && props.u.lname}
				/>
				<SignUpInput
					disabled
					label='Gender'
					id='gender'
					element='gender'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Gender is required'
					onInput={inputHandler}
					oldInput={props.u && props.u.gender}
				/>
				<SignUpInput
					disabled
					label='Date Of Birth'
					id='date'
					element='input'
					type='date'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Date of Birth is required'
					onInput={inputHandler}
					oldInput={props.u.date}
				/>
			</>
		);

	let checkboxForm = (
		<div className={classes.checkboxForm_Container}>
			<div className={classes.checkboxForm}>
				<Checkbox
					// checked={newsletter ? true : false}
					onClick={() => setNewsletter((prevState) => !prevState)}>
					Subscribe to our Newsletter
				</Checkbox>
				<Checkbox
					// checked={SMS}
					onClick={() => {
						setSMS((prevState) => !prevState);
					}}>
					Subscribe to SMS
				</Checkbox>
			</div>
			<div>
				<Button type='submit' disabled={!formState.isValid}>
					Click to Update
				</Button>
			</div>
		</div>
	);

	let content = (
		<React.Fragment>
			{error && (
				<h3 style={{ color: "#ed1b24", marginBottom: "10px" }}>{error}</h3>
			)}
			<div className={classes.FormElements}>
				<form onSubmit={isSubmitHandler}>
					{contentForm}
					{checkboxForm}
				</form>
			</div>
		</React.Fragment>
	);

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
		<div className={classes.LoginScreen}>
			<section className={classes.section}>
				<div className={classes.AccountForm}>
					<div className={classes.FormContainer}>{content}</div>
					<div className={classes.ChangeContainer}>
						<p>CHANGE EMAIL</p>
						<p>CHANGE PASSWORD</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Account;
