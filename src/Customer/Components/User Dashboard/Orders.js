import React, { useState, useEffect, useContext } from "react";
import classes from "./Orders.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";
import OrderItem from "./OrderItem";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const Orders = (props) => {
	const [orders, setOrders] = useState(false);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { userId, token } = useContext(AuthContext);

	useEffect(() => {
		orderHandler();
	}, []);

	const orderHandler = async () => {
		try {
			const resp = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/fetchorder`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({ userId })
			);
			setOrders(resp.order);
		} catch (err) {}
	};

	let content;
	content = (
		<React.Fragment>
			<img src={myordersempty} width='120px' />
			<p>There are no orders to display.</p>
		</React.Fragment>
	);

	if (orders) {
		let activeOrders, completedOrders;
		if (orders) {
			activeOrders = orders.filter((i) => i.orderStatus === "Active");
			completedOrders = orders.filter((i) => i.orderStatus === "Completed");
			console.log(completedOrders);
		}
		content = (
			<div className={classes.OrdersList}>
				<h4>Active Orders</h4>
				{activeOrders.map((i) => (
					<OrderItem order={i} />
				))}

				<h4>Completed Orders</h4>
				{completedOrders.map((i) => (
					<OrderItem order={i} />
				))}
			</div>
		);
	}

	return <div className={classes.Orders}>{content}</div>;
};

export default Orders;
