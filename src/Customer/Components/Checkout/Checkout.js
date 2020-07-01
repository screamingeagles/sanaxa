import React, {  useContext} from "react";
import classes from "./Checkout.module.css";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import AddSpecialRequest from "./AddSpecialRequest";
import PaymentSummary from "./PaymentSummary";
import {  useHistory } from "react-router-dom";
// import { BasketContext } from "../../../shared/context/basket-context";
// import { useBasket } from "./../../../shared/hooks/basket-hook";
import { useHttpClient } from "./../../../shared/hooks/http-hook";
import { AuthContext } from "./../../../shared/context/auth-context";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

const Checkout = (props) => {
	// const basket = useContext(BasketContext);
	// const basket = useBasket();
	// const params = useParams().id;
	const { isLoading, sendRequest } = useHttpClient();
	const { userId, token } = useContext(AuthContext);
	const history = useHistory();
	// console.log(basket.cart.items);

	// const showBasket = useCallback(() => {}, [basket, params]);

	// useEffect(() => {
	// 	if (params) {
	// 		document.getElementById("showBasket").addEventListener("click", () => {
	// 			console.log("1");
	// 			basket.showBasketHandler();
	// 		});
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (params) basket.showBasketHandler();
	// }, [params, basket]);

	// useEffect(() => {
	// console.log(1);
	// basket.fetchBasket();
	// }, [basket]);

	const orderHandler = async () => {
		try {
			localStorage.setItem("cart", JSON.stringify({ items: [] }));
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/checkout`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({ userId })
			);
			history.replace("/user-detail/orders");
		} catch (err) {}
	};

	let content;

	content = (
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
				<PaymentSummary orderHandler={orderHandler} />
			</div>
		</div>
	);

	if (isLoading)
		content = (
			<div style={{ padding: "2rem", textAlign: "center" }}>
				<LoadingSpinner />
			</div>
		);

	return content;
};

export default Checkout;
