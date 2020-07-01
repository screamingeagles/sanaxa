import React from "react";
import classes from "./OrderItem.module.css";

// import respic from "../../../shared/assets/Images/respic.jpg";
// import restaurantIconSmall from "../../../shared/assets/Images/restaurantIconSmall.png";
import clockTick from "../../../shared/assets/Images/clockTick.JPG";
import codSmallIcon from "../../../shared/assets/Images/codSmallIcon.JPG";
// import PaymentSummary from "../Checkout/PaymentSummary";
import OrderSummary from "./../Checkout/OrderSummary";
// import Subtotal from "../Checkout/Subtotal";

const OrderItem = (props) => {
	let totalPrice = 0;
	props.order.items.map(
		(i) =>
			// console.log(i)
			(totalPrice += parseFloat(i.price) * parseFloat(i.quantity))
	);
	console.log(totalPrice);
	return (
		<div className={classes.OrderList}>
			<OrderSummary myOrders order={props.order} />
			<div className={classes.orderDetails}>
				<div className={classes.SideDetails}>
					<div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
							}}>
							<div style={{ width: "35px", marginLeft: "5px" }}>2x</div>
							<p>Quantity</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
							}}>
							<div style={{ width: "35px" }}>
								<img src={clockTick} alt='Clock Time' width='25px' />
							</div>
							<p>Order {props.order.orderStatus}</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
							}}>
							<div style={{ width: "35px" }}>
								<img src={clockTick} alt='Clock Time' width='25px' />
							</div>
							<p>Home Delivery</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: "10px",
							}}>
							<div style={{ width: "35px" }}>
								<img src={codSmallIcon} alt='Clock Time' width='25px' />
							</div>
							<p>COD</p>
						</div>
					</div>
				</div>
				<div className={classes.Subtotal}>
					<div className={classes.Subtotal_Items}>
						<p>Subtotal</p>
						<p>AED {totalPrice}</p>
					</div>
					<div className={classes.Subtotal_Items}>
						<p>Delivery Charges</p>
						<p>AED 20.00</p>
					</div>
					<div className={classes.Subtotal_Items}>
						<p>Discounted Amount</p>
						<p>AED 0.00</p>
					</div>
					<div className={classes.Subtotal_Items}>
						<p>Total Amount</p>
						<p>AED {totalPrice + 20}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
