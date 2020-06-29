import React from "react";
import classes from "./Subtotal.module.css";
import Button from "../../../shared/components/FormElements/Button";

const Subtotal = (props) => {
	return (
		<div className={classes.Subtotal}>
			<div className={classes.Subtotal_Details}>
				<div className={classes.Subtotal_Details_List}>
					<p>Subtotal</p>
					<p>AED 8.00</p>
				</div>
				<div className={classes.Subtotal_Details_List}>
					<p>Delivery Charges</p>
					<p>AED 8.00</p>
				</div>
				<div className={classes.Subtotal_Details_List}>
					<p>Discounted Amount</p>
					<p>AED 0.00</p>
				</div>
				<div className={classes.Subtotal_Details_List}>
					<h4>Total Amount</h4>
					<h4>AED 8.00</h4>
				</div>
				<div
					style={{ borderTop: "1px solid #ccc" }}
					className={classes.Subtotal_Details_List}>
					<h4>{props.pay}</h4>
					<h4>AED 8.00</h4>
				</div>
			</div>
			<div className={classes.Subtotal_Button}>
				<Button width='100%'>PLACE ORDER</Button>
			</div>
		</div>
	);
};

export default Subtotal;
