import React, { useState } from "react";
import classes from "./MethodSelect.module.scss";

import masterCard from "../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../shared/assets/Images/cashIcon.png";

const MethodSelect = (props) => {
	const [creditCardForm, setCreditCardForm] = useState(false);
	const creditCardFormHandler = (s) => {
		setCreditCardForm(s);
	};
	let content;
	if (creditCardForm)
		content = (
			<form className={classes.CheckoutForm}>
				<div className={classes.CheckoutForm_Input}>
					<h4>Card Number</h4>
					<input
						type='number'
						min='1111111111111111'
						max='9999999999999999'
						placeholder='1111-1111-1111-1111'
					/>
				</div>
				<div className={classes.CheckoutForm_Input}>
					<h4>Card Expiry Date</h4>
					<div style={{ display: "flex" }}>
						<div className={classes.CheckoutForm_Select}>
							<select>
								<option value='0'>MM</option>
								<option value='1'>01</option>
								<option value='2'>02</option>
								<option value='3'>03</option>
								<option value='4'>04</option>
								<option value='5'>05</option>
								<option value='6'>06</option>
								<option value='7'>07</option>
								<option value='8'>08</option>
								<option value='9'>09</option>
								<option value='10'>10</option>
								<option value='11'>11</option>
								<option value='12'>12</option>
							</select>
						</div>
						<div className={classes.CheckoutForm_Select}>
							<select>
								<option value='0'>YY</option>
								<option value='2020'>2020</option>
								<option value='2021'>2021</option>
								<option value='2022'>2022</option>
								<option value='2023'>2023</option>
								<option value='2024'>2023</option>
								<option value='2025'>2025</option>
								<option value='2026'>2026</option>
								<option value='2027'>2027</option>
								<option value='2028'>2028</option>
								<option value='2029'>2029</option>
								<option value='2030'>2030</option>
							</select>
						</div>
					</div>
				</div>

				<div className={classes.CheckoutForm_Input}>
					<h4>CVC</h4>
					<input type='number' min='000' max='999' placeholder='111' />
				</div>
			</form>
		);
	return (
		<div>
			<form className={classes.Form}>
				<p
					onClick={() => {
						creditCardFormHandler(true);
						props.setMethodHandler("Pay with Credit Card");
					}}>
					<input type='radio' id='test1' name='radio-group' />
					<label for='test1'>
						<span>
							<img
								style={{ marginRight: "10px" }}
								src={masterCard}
								alt=''
								width='30px'
							/>
						</span>
						Pay with Credit Card
					</label>
				</p>
				{content}
				<p
					onClick={() => {
						creditCardFormHandler(false);
						props.setMethodHandler("Pay with Cash");
					}}>
					<input type='radio' id='test2' name='radio-group' />
					<label for='test2'>
						<span>
							<img
								style={{ marginRight: "10px" }}
								src={cashIcon}
								alt=''
								width='30px'
							/>
						</span>
						Pay with Cash
					</label>
				</p>
			</form>
		</div>
	);
};

export default MethodSelect;
