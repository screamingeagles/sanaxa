import React, { useContext } from "react";
import classes from "./Cart.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";
import informationButton from "../../../shared/assets/Images/information-button.png";
import Subtotal from "./../Checkout/Subtotal";
import { BasketContext } from "../../../shared/context/basket-context";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";

const Cart = (props) => {
	const basket = useContext(BasketContext);
	const increaseQuantity = (quantity, number, productId) => {
		number = parseInt(number);
		if (quantity + number < 1) return;
		basket.addQuantityToBasket(number, productId);
	};

	let content;

	content = basket.cart.items.length < 1 && (
		<div
			style={{
				display: "flex",
				height: "200px",
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
	);
	if (basket.cart.items.length > 0) {
		// console.log("basket", basket.cart.items);
		content = (
			<React.Fragment>
				<h3 style={{ margin: "0 0 15px 15px" }}>
					{basket.cart.RestaurantName}
				</h3>
				{basket.cart.items.map((i) => {
					// console.log("i", i);
					return (
						<div className={classes.CartListItems}>
							<form
								onSubmit={(e) => e.preventDefault()}
								className={classes.Bucket__Content_List_Form}>
								<label
									onClick={() => increaseQuantity(i.quantity, -1, i._id)}
									style={{ paddingLeft: "2px" }}>
									-
								</label>
								<input
									min='1'
									max='100'
									type='number'
									value={i.quantity}
									// onChange={(e) => basket.addQuantityToBasket()}
								/>
								<label onClick={() => increaseQuantity(i.quantity, 1, i._id)}>
									+
								</label>
							</form>
							<div className={classes.CartListItems_Name}>
								<p>{i.name}</p>
								{i.addOns && i.addOns.length > 0 && (
									<div className={classes.toolTip}>
										<img src={informationButton} alt='' width='11px' />
										<span className={classes.toolTipText}>
											{i.addOnList.map((j) => (
												<span>{j}</span>
											))}
										</span>
									</div>
								)}
							</div>
							<div className={classes.CartListItems_PriceRemoveButton}>
								<p>{parseFloat(`${i.quantity}` * `${i.price}`).toFixed(2)}</p>
								<p onClick={() => basket.removeProduct(i._id)}>-</p>
							</div>
						</div>
					);
				})}

				<Subtotal
					// orderHandler={props.orderHandler}
					subtotal={basket.totalPrice}
					delivery={20}
					total={basket.totalPrice + 20}
				/>
			</React.Fragment>
		);
	}

	// if (basket.isLoading) {
	// 	content = (
	// 		<div className='center'>
	// 			<LoadingSpinner />
	// 		</div>
	// 	);
	// }

	return (
		<div className={classes.Cart}>
			<p>Your Cart</p>
			<div className={classes.Cart_Content}>
				{basket.isLoading && <LoadingSpinner asOverlay />}
				{content}
			</div>
		</div>
	);
};

export default Cart;
