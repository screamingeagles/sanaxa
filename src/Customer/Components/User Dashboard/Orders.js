import React, { useState, useEffect, useContext } from "react";
import classes from "./Orders.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";
import OrderItem from "./OrderItem";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const Orders = (props) => {
	const [orders, setOrders] = useState(false);
	const { sendRequest } = useHttpClient();
	const { userId, token } = useContext(AuthContext);

	useEffect(() => {
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
		orderHandler();
		// , [sendRequest, token, userId]);
	}, [sendRequest, token, userId]);

	let content;

	if (orders.length === 0)
		content = (
			<React.Fragment>
				<img alt='' src={myordersempty} width='120px' />
				<p>There are no orders to display.</p>
			</React.Fragment>
		);

	if (orders.length > 0) {
		let activeOrders, completedOrders;
		if (orders) {
			activeOrders = orders.filter(
				(i) =>
					i.orderStatus === "Pending" ||
					i.orderStatus === "Dispatched" ||
					i.orderStatus === "Confirmed"
			);
			completedOrders = orders.filter(
				(i) => i.orderStatus === "Cancelled" || i.orderStatus === "Delivered"
			);
			console.log(activeOrders);
		}
		content = (
			<div className={classes.OrdersList}>
				{activeOrders.length > 0 && <h4>Active Orders</h4>}
				{activeOrders.length > 0 &&
					activeOrders.map((i) => <OrderItem order={i} />)}
				{completedOrders.length > 0 && <h4>Completed Orders</h4>}
				{completedOrders.length > 0 &&
					completedOrders.map((i) => <OrderItem order={i} />)}
			</div>
		);
	}

	return <div className={classes.Orders}>{content}</div>;
};

export default Orders;
