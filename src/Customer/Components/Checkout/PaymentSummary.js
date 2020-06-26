import React, { useState } from "react";
import classes from "./PaymentSummary.module.css";
import LabelInput from "./../../../shared/components/FormElements/LabelInput";
import Button from "../../../shared/components/FormElements/Button";
import Subtotal from "./Subtotal";
import MethodSelect from "./MethodSelect";

const PaymentSummary = (props) => {
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
					<Subtotal pay={method} />
				</div>
			</div>
		</div>
	);
};

export default PaymentSummary;
