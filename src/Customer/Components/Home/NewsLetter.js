import React from "react";

import classes from "./NewsLetter.module.css";
import Button from "../../../shared/components/FormElements/Button";
import Input from "./../../../shared/components/FormElements/Input";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE,
} from "./../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";

import newsletter from "../../../shared/assets/Images/newsletter.png";

const NewsLetter = (props) => {
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	return (
		<div className={classes.NewsLetter}>
			<img src={newsletter} alt='NewsLetter' width='100%' />
			<h2>Subscribe To Our NewsLetter</h2>
			<p>Recieved deals from all our top restaurants via e-email</p>

			<form
				className={classes.NewsLetter__Form}
				onSubmit={(e) => e.preventDefault()}>
				<input
					id='email'
					type='email'
					validators={[VALIDATOR_EMAIL()]}
					errorText='Please enter a valid email!'
					onInput={inputHandler}
					placeholder='Email Address'
				/>
				<select className={classes.selectCss} name='select' id='emailtype'>
					<option value='osb'>osb</option>
					<option value='gm'>gm</option>
				</select>
			</form>
			<div className={classes.Newsletter__Button_ViewAll}>
				<Button
					to='/restaurants'
					backgroundColor='#0dd6ff'
					borderRadius='5px'
					padding='10px 45px'>
					Send
				</Button>
			</div>
		</div>
	);
};

export default NewsLetter;
