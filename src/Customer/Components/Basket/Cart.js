import React, { useContext } from "react";
import classes from "./Cart.module.css";

import myordersempty from "../../../shared/assets/Images/myordersempty.svg";
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
		content = (
			<React.Fragment>
				<h3 style={{ margin: "0 0 15px 15px" }}>{basket.restaurant}</h3>
				{basket.cart.items.map((i) => {
					return (
						<div className={classes.CartListItems}>
							<form
								onSubmit={(e) => e.preventDefault()}
								className={classes.Bucket__Content_List_Form}>
								<label
									onClick={() => increaseQuantity(i.quantity, -1, i.productId)}
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
								<label
									onClick={() => increaseQuantity(i.quantity, 1, i.productId)}>
									+
								</label>
							</form>
							<p>{i.name}</p>
							<div className={classes.CartListItems_PriceRemoveButton}>
								<p>{parseFloat(`${i.quantity}` * `${i.price}`).toFixed(2)}</p>
								<p onClick={() => basket.removeProduct(i.productId)}>-</p>
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
