import React from "react";
import classes from "./Checkout.module.css";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import AddSpecialRequest from "./AddSpecialRequest";
import PaymentSummary from "./PaymentSummary";

const Checkout = (props) => {
	return (
		<div className={[classes.Checkout, "Container"].join(" ")}>
			<div className={classes.OrderSummary}>
				<OrderSummary restaurantName='Alaska Hotel' />
			</div>
			<div className={classes.DeliveryAddress}>
				<DeliveryAddress />
			</div>
			<div className={classes.AddSpecialRequest}>
				<AddSpecialRequest />
			</div>
			<div className={classes.PaymentSummary}>
				<PaymentSummary />
			</div>
		</div>
	);
};

export default Checkout;
