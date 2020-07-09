import React, { useState, useContext } from "react";
import classes from "./PaymentSummary.module.css";
import LabelInput from "./../../../shared/components/FormElements/LabelInput";
import Button from "../../../shared/components/FormElements/Button";
import Subtotal from "./Subtotal";
import MethodSelect from "./MethodSelect";
import { BasketContext } from "../../../shared/context/basket-context";

const PaymentSummary = (props) => {
	const basket = useContext(BasketContext);
	const [method, setMethod] = useState("Pay by Cash");
	const setMethodHandler = (x) => {
		setMethod(x);
	};
	return (
		<div className={classes.PaymentSummary}>
			<div className={classes.PaymentSummary_Heading}>
				<h3>Payment Summary</h3>
			</div>
			<div className={classes.PaymentSummary_Details}>
				<div className={classes.LabelInput}>
					<LabelInput labelcolor='#ccc' label='Voucher code' />
				</div>
				<div>
					<Button inverse>Redeem</Button>
				</div>
			</div>
			<div className={classes.PaymentSummary_Method}>
				<div className={classes.PaymentSummary_Method_Div}>
					<h4>Select your payment method</h4>
					<div className={classes.PaymentSummary_Discount}>
						<p>Discounts available for credit card</p>
						<span>MORE</span>
					</div>
					<MethodSelect setMethodHandler={setMethodHandler} />
				</div>
				<div className={classes.PaymentSummary_Method_Div}>
					<Subtotal
						Checkout
						orderHandler={props.orderHandler}
						pay={method}
						subtotal={basket.totalPrice}
						delivery={20}
						discount='0'
						total={basket.totalPrice + 20}
						payby={basket.totalPrice + 20}
					/>
				</div>
			</div>
		</div>
	);
};

export default PaymentSummary;
