import React, { useContext } from "react";
import classes from "./OrderSummary.module.css";
import Checkbox from "../Login/Checkbox";
import { BasketContext } from "../../../shared/context/basket-context";

const OrderSummary = (props) => {
	const basket = useContext(BasketContext);
	const items = props.order ? props.order.items : basket.cart.items;
	return (
		<div className={classes.OrderSummary}>
			<div className={classes.OrderSummary_Heading}>
				<h3>Order Summary</h3>
				{!props.myOrders && <p>MODIFY ORDER</p>}
			</div>
			<div className={classes.OrderSummary_Details}>
				<h4>{props.order ? props.order.RestaurantName : basket.restaurant}</h4>
				<table className={classes.OrderSummary_Details_Table}>
					<tbody>
						<tr>
							<th>Item(s)</th>
							<th>Special Request</th>
							<th style={{ width: "15%" }}>Qty</th>
							<th style={{ width: "15%" }}>Price</th>
							<th style={{ width: "15%" }}>Total</th>
						</tr>
						{items.map((i) => (
							<tr>
								<td>
									<div>{i.name}</div>
									<div
										className={[
											classes.SpecialRequest,
											classes.speicalReqHidden,
										].join(" ")}>
										Add Speical Request
									</div>
								</td>
								<td className={classes.SpecialRequest}>Add Speical Request</td>
								<td>{i.quantity}</td>
								<td>AED {parseFloat(`${i.price}`).toFixed(2)}</td>
								<td>
									AED {parseFloat(`${i.quantity}` * `${i.price}`).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{!props.myOrders && (
					<div>
						<Checkbox>No cutlery. Make your order eco-friendly</Checkbox>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderSummary;
