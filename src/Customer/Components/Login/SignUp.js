import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// import Logo from "../../../shared/assets/Images/snaxaLogo.svg";
import google from "../../../shared/assets/Images/google.png";
import facebook from "../../../shared/assets/Images/facebook.png";

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	// VALIDATOR_CONFIRMPASSWORD,
} from "./../../../shared/util/validators";

import { useForm } from "./../../../shared/hooks/form-hook";
import { useHttpClient } from "./../../../shared/hooks/http-hook";
// import { AuthContext } from "../../../shared/context/auth-context";
// import { BasketContext } from "./../../../shared/context/basket-context";

// import Input from "./../../../shared/components/FormElements/Input";
import Button from "./../../../shared/components/FormElements/Button";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

import classes from "./Login.module.css";
import SignUpInput from "../../../shared/components/FormElements/SignUpInput";
import Checkbox from "./Checkbox";

const SignUp = (props) => {
	// const auth = useContex?t(AuthContext);
	// const basket = useContext(BasketContext);
	const history = useHistory();

	const [newsletter, setNewsletter] = useState(false);
	const [SMS, setSMS] = useState(false);

	let heading = "Sign Up";

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
			// confirmPassword: {
			// 	value: "",
			// 	isValid: false,
			// },
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

	let contentForm = (
		<>
			<SignUpInput
				label='First Name'
				id='fname'
				element='input'
				type='text  '
				validators={[VALIDATOR_REQUIRE()]}
				errorText='First Name is required'
				onInput={inputHandler}
			/>
			<SignUpInput
				label='Last Name'
				id='lname'
				element='input'
				type='text  '
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Last Name is required'
				onInput={inputHandler}
			/>
			<SignUpInput
				label='Email'
				id='email'
				element='input'
				type='text  '
				validators={[VALIDATOR_EMAIL()]}
				errorText='Email is required'
				onInput={inputHandler}
			/>
			<SignUpInput
				label='Password'
				id='password'
				element='input'
				type='password'
				validators={[VALIDATOR_MINLENGTH(6)]}
				errorText='Password is required'
				onInput={inputHandler}
			/>
			{/* <SignUpInput
				label='Confirm Password'
				id='confirmPassword'
				element='input'
				type='password'
				validators={[VALIDATOR_CONFIRMPASSWORD()]}
				errorText='Password must match'
				onInput={inputHandler}
			/> */}
			<SignUpInput
				label='Gender'
				id='gender'
				element='gender'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Gender is required'
				onInput={inputHandler}
			/>
			<SignUpInput
				label='Date Of Birth'
				id='date'
				element='input'
				type='date'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Date of Birth is required'
				onInput={inputHandler}
			/>
		</>
	);

	let checkboxForm = (
		<div className={classes.checkboxForm}>
			<Checkbox onClick={() => setNewsletter(true)}>
				Subscribe to our Newsletter
			</Checkbox>
			<Checkbox onClick={() => setSMS(true)}>Subscribe to SMS</Checkbox>
			<p style={{ marginBottom: "20px", fontSize: "11px" }}>
				By creating an account you agree to the{" "}
				<span style={{ color: "#ed1b24", cursor: "pointer" }}>
					Privacy Policy
				</span>{" "}
				and{" "}
				<span style={{ color: "#ed1b24", cursor: "pointer" }}>
					Terms Of Use
				</span>
				.
			</p>
		</div>
	);

	let content = (
		<React.Fragment>
			{error && (
				<h3 style={{ color: "#ed1b24", marginBottom: "10px" }}>{error}</h3>
			)}
			<h2>{heading}</h2>
			<div className={classes.FormElements}>
				<form onSubmit={isSubmitHandler}>
					{contentForm}
					{checkboxForm}
					<Button type='submit' disabled={!formState.isValid}>
						Create Your Account
					</Button>
				</form>
			</div>
			<div>
				<div className={classes.OR} style={{ margin: "2.5rem 0 0 0" }}>
					<h2>
						<span>OR</span>
					</h2>
				</div>

				<div className={classes.SocialContainer}>
					<div>
						<span>Login via Google</span>
						<span>
							<img src={google} alt='Google' width='20px' />
						</span>
					</div>
					<div>
						<span>Login via Facebook</span>
						<img src={facebook} alt='Facebook' width='20px' />
					</div>
				</div>
			</div>
			<p className={classes.NewAccount}>
				Already have an account?{" "}
				<span onClick={() => history.push("/authentication")}>Login!</span>
			</p>
		</React.Fragment>
	);

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
		<div className={classes.LoginScreen}>
			<section className={classes.section}>
				<div className={classes.FormContainer}>{content}</div>
			</section>
		</div>
	);
};

export default SignUp;
