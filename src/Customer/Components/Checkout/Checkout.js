import React, { useEffect, useContext, useCallback } from "react";
import classes from "./Checkout.module.css";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import AddSpecialRequest from "./AddSpecialRequest";
import PaymentSummary from "./PaymentSummary";
import { useParams } from "react-router-dom";
// import { BasketContext } from "../../../shared/context/basket-context";
import { useBasket } from "./../../../shared/hooks/basket-hook";

const Checkout = (props) => {
	// const basket = useContext(BasketContext);
	const basket = useBasket();
	const params = useParams().id;

	const showBasket = useCallback(() => {}, [basket, params]);

	useEffect(() => {
		if (params) {
			document.getElementById("showBasket").addEventListener("click", () => {
				console.log("1");
				basket.showBasketHandler();
			});
		}
	}, []);

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
