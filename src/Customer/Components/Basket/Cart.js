import React from "react";
import classes from "./Cart.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";

const Cart = (props) => {
	return (
		<div className={classes.Cart}>
			<p>Your Cart</p>
			<div
				style={{
					display: "flex",
					height: "75%",
					justifyContent: "center",
					alignItems: "center",
					flexFlow: "column",
				}}>
				<img
					src={myordersempty}
					alt=''
					width='55px'
					style={{ marginBottom: "10px" }}
				/>
				<p>There are no items in your cart</p>
			</div>
		</div>
	);
};

export default Cart;
