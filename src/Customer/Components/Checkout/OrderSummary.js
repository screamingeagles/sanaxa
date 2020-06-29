import React from "react";
import classes from "./OrderSummary.module.css";
import Checbox from "../Login/Checbox";

const OrderSummary = (props) => {
	return (
		<div className={classes.OrderSummary}>
			<div className={classes.OrderSummary_Heading}>
				<h3>Order Summary</h3>
				<p>MODIFY ORDER</p>
			</div>
			<div className={classes.OrderSummary_Details}>
				<h4>{props.restaurantName}</h4>
				<table className={classes.OrderSummary_Details_Table}>
					<tbody>
						<tr>
							<th>Item(s)</th>
							<th>Special Request</th>
							<th style={{ width: "15%" }}>Qty</th>
							<th style={{ width: "15%" }}>Price</th>
							<th style={{ width: "15%" }}>Total</th>
						</tr>
						<tr>
							<td>
								<div>Mighty Burger</div>
								<div
									className={[
										classes.SpecialRequest,
										classes.speicalReqHidden,
									].join(" ")}>
									Add Speical Request
								</div>
							</td>
							<td className={classes.SpecialRequest}>Add Speical Request</td>
							<td>1</td>
							<td>AED 8.00</td>
							<td>AED 8.00</td>
						</tr>
					</tbody>
				</table>
				{!props.myOrders && (
					<div>
						<Checbox>No cutlery. Make your order eco-friendly</Checbox>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderSummary;
