import React, { useState, useContext } from "react";
import { useHistory, NavLink, useParams } from "react-router-dom";

import Logo from "../../../shared/assets/Images/snaxaLogo.svg";
import google from "../../../shared/assets/Images/google.png";
import facebook from "../../../shared/assets/Images/facebook.png";

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_CONFIRMPASSWORD,
} from "./../../../shared/util/validators";

import { useForm } from "./../../../shared/hooks/form-hook";
import { useHttpClient } from "./../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { BasketContext } from "./../../../shared/context/basket-context";

import Input from "./../../../shared/components/FormElements/Input";
import Button from "./../../../shared/components/FormElements/Button";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

import classes from "./Login.module.css";
import SignUp from "./SignUp";

const Login = (props) => {
	const auth = useContext(AuthContext);
	const basket = useContext(BasketContext);
	const history = useHistory();

	const [isLogin, setIsLogin] = useState(true);
	const [submitting, setIsSubmitting] = useState(false);

	const params = useParams().checkout;

	let heading = "Log In";

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	if (!isLogin) {
		heading = "Sign Up";
	}

	const isLoginModeHandler = () => {
		clearError();
		setIsLogin((prevState) => !prevState);
		if (!isLogin) {
			setFormData({
				...formState.inputs,
				// confirmPassword: undefined,
				name: undefined,
			});
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isVaild: false,
					},
					// confirmPassword: {
					// 	value: "",
					// 	isVaild: false,
					// },
				},
				false
			);
		}
	};

	const isSubmitHandler = async (e) => {
		e.preventDefault();
		// console.log(process.env.REACT_APP_BACKEND_URL);
		if (isLogin) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/login`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						basket: basket.items,
					})
				);
				auth.login(responseData.userId, responseData.token);
				if (params === "checkout") {
					history.push(
						`/checkout/${Math.floor(Math.random() * 1000 * 1000 * 1000)}`
					);
					return;
				}
				history.go("/");
			} catch (err) {}
		} else {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/signup`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						name: formState.inputs.name.value,
					})
				);
				clearError();
				setIsLogin(true);
				// history.push("/authenticate");
				setFormData(
					{
						...formState.inputs,
						name: undefined,
					},
					false
				);
			} catch (err) {}
		}
	};

	let contentForm = (
		<>
			<Input
				id='email'
				element='input'
				type='email'
				validators={[VALIDATOR_EMAIL()]}
				errorText='Please enter a valid email!'
				onInput={inputHandler}
				placeholder='Email Address'
			/>
			<Input
				id='password'
				element='input'
				type='password'
				validators={[VALIDATOR_MINLENGTH(6)]}
				errorText='Please enter a valid password of 6 characters at least!'
				onInput={inputHandler}
				placeholder='Password'
			/>
		</>
	);

	if (!isLogin)
		contentForm = (
			<>
				<Input
					id='name'
					element='input'
					type='text  '
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid name'
					onInput={inputHandler}
					placeholder='Name'
				/>
			</>
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
					{/* {!isLogin && (
								<Input
									id='confirmPassword'
									element='input'
									type='password'
									validators={[
										VALIDATOR_CONFIRMPASSWORD(
											formState.inputs.password.value,
											// formState.inputs.confirmPassword.value
											inputHandler.value
										),
									]}
									errorText='Passwords do not match'
									onInput={inputHandler}
									placeholder='Confirm Password'
								/>
							)} */}
					<Button type='submit' disabled={!formState.isValid}>
						{isLogin ? "Log In" : "Sign Up"}
					</Button>
					{/* <div className={classes.RememberMe} id='remember' name='remember'>
								<label className={classes.checkboxLabel}>
									<input type='checkbox' />
									<span className={classes.checkboxCustom}></span>
								</label>
								<span>Remember Me</span>
							</div> */}
				</form>
				{isLogin && <p className={classes.forgotPassword}>Forgot Password?</p>}
			</div>
			<div>
				<div className={classes.OR}>
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
			{isLogin ? (
				<p className={classes.NewAccount}>
					Don't have an account?{" "}
					<NavLink
						to='/signup'
						onClick={() => {
							// return isLoginModeHandler();
							props.onCancel();
						}}>
						Create new Account!
					</NavLink>
				</p>
			) : (
				<p className={classes.NewAccount}>
					Already have an account?{" "}
					<span onClick={isLoginModeHandler}>Login!</span>
				</p>
			)}
		</React.Fragment>
	);

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
		<div className={classes.LoginScreen}>
			{/* <header className={classes.header}>
				<NavLink to='/'>
					<img src={Logo} alt='Logo Snaxa' width='90px' />
				</NavLink>
			</header> */}
			<section className={classes.section}>
				<div className={classes.FormContainer}>{content}</div>
			</section>
		</div>
	);
};

export default Login;
