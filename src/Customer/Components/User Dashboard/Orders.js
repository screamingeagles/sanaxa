import React from "react";
import classes from "./Orders.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";

const Orders = (props) => {
	return (
		<div className={classes.Orders}>
			<img src={myordersempty} width='120px' />
			<p>There are no orders to display.</p>
		</div>
	);
};

export default Orders;
