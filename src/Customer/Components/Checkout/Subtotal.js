import React from "react";
import classes from "./Subtotal.module.css";
import Button from "../../../shared/components/FormElements/Button";
import { useAuth } from "../../../shared/hooks/auth-hook";

const Subtotal = (props) => {
	const { token } = useAuth();
	return (
		<div className={classes.Subtotal}>
			<div className={classes.Subtotal_Details}>
				<div className={classes.Subtotal_Details_List}>
					<p>Subtotal</p>
					<p>AED {parseFloat(`${props.subtotal}`).toFixed(2)}</p>
				</div>
				<div className={classes.Subtotal_Details_List}>
					<p>Delivery Charges</p>
					<p>AED {parseFloat(`${props.delivery}`).toFixed(2)}</p>
				</div>
				{props.discount && (
					<div className={classes.Subtotal_Details_List}>
						<p>Discounted Amount</p>
						<p>AED {parseFloat(`${props.discount}`).toFixed(2)}</p>
					</div>
				)}
				<div className={classes.Subtotal_Details_List}>
					<h4>Total Amount</h4>
					<h4>AED {parseFloat(`${props.total}`).toFixed(2)}</h4>
				</div>
				{props.payby && (
					<div
						style={{ borderTop: "1px solid #ccc" }}
						className={classes.Subtotal_Details_List}>
						<h4>{props.pay}</h4>
						<h4>AED {parseFloat(`${props.payby}`).toFixed(2)}</h4>
					</div>
				)}
			</div>
			<div className={classes.Subtotal_Button}>
				{!props.myOrders && props.Checkout && (
					<Button onClick={props.orderHandler} width='100%'>
						PLACE ORDER
					</Button>
				)}
				{!props.myOrders && !props.Checkout && (
					<Button
						textAlign='center'
						to={
							!token
								? `/authentication/checkout/${Math.floor(
										Math.random() * 1000 * 1000 * 100000
								  )}`
								: "/checkout"
						}
						// to={!token ? "/authentication" : "/checkout"}
						width='100%'>
						{!token ? "LOGIN TO CHECKOUT" : "CHECKOUT"}
					</Button>
				)}
			</div>
		</div>
	);
};

export default Subtotal;
