import React from "react";
import classes from "./OrderItem.module.css";

import respic from "../../../shared/assets/Images/respic.jpg";
import restaurantIconSmall from "../../../shared/assets/Images/restaurantIconSmall.png";
import clockTick from "../../../shared/assets/Images/clockTick.JPG";
import codSmallIcon from "../../../shared/assets/Images/codSmallIcon.JPG";

const OrderItem = (props) => {
	return (
		<div className={classes.OrderList}>
			<div>
				{props.order.items.map((i) => (
					<div className={classes.OrdersLists_Items}>
						<div className={classes.OrderItem}>
							<div>
								<img src={respic} alt='Res Pic' height='90px' />
							</div>
							<div className={classes.OrderItem__Names}>
								<h4>{i.name}</h4>
								<div className={classes.OrderItem__NamesRestaurant}>
									<img src={restaurantIconSmall} alt='restaurantIconSmall' />
									<h5>{props.order.RestaurantName}</h5>
								</div>
								<h4 style={{ color: "black" }}>${i.price}</h4>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={classes.SideDetails}>
				<div className={classes.Line}></div>
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
		</div>
	);
};

export default OrderItem;
