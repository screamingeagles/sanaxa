import React, { useContext } from "react";
import classes from "./Basket.module.css";
import basketIcon from "../../../shared/assets/Images/basketIcon.png";
import restaurantIconSmall from "../../../shared/assets/Images/restaurantIconSmall.png";
import respic from "../../../shared/assets/Images/respic.jpg";
import Button from "../../../shared/components/FormElements/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "./../../../shared/hooks/auth-hook";
import { BasketContext } from "./../../../shared/context/basket-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const Basket = (props) => {
	const basket = useContext(BasketContext);
	const { token } = useAuth();

	const increaseQuantity = (quantity, number, productId) => {
		number = parseInt(number);
		if (quantity + number < 1) return;
		basket.addQuantityToBasket(number, productId);
	};

	let content;

	content = basket.cart.items.length > 0 && (
		<div className={classes.Basket__Content_Height}>
			{basket.cart.items.length > 0 &&
				basket.cart.items.map((i) => (
					<div className={classes.Basket__Content}>
						<div className={classes.Basket__Content_Top}>
							<div>
								<img src={respic} alt='Food Pic' height='80px' />
							</div>
							<div className={classes.Basket__Content_Details}>
								<div className={classes.Basket__Content_Name}>
									<h4>{i.name}</h4>
									<div className={classes.Basket__Content_Name_Restaurant}>
										<img
											src={restaurantIconSmall}
											alt='restaurantIconSmall'
											width='15px'
										/>
										<h5>{basket.cart.RestaurantName}</h5>
									</div>
								</div>
								<div className={classes.Basket__Content_Price}>
									<h4>${i.price * i.quantity}</h4>
								</div>
							</div>
						</div>
						<div className={classes.Basket__Content_AddItem}>
							<div>
								<form
									onSubmit={(e) => e.preventDefault()}
									className={classes.Bucket__Content_List_Form}>
									<label
										onClick={() =>
											increaseQuantity(i.quantity, -1, i.productId)
										}
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
										onClick={() =>
											increaseQuantity(i.quantity, 1, i.productId)
										}>
										+
									</label>
								</form>
							</div>
							<div>
								<Button
									onClick={() => basket.removeProduct(i.productId)}
									backgroundColor='#b40008'
									borderRadius='1px'
									color='white'
									padding='10px 20px'>
									Remove Item
								</Button>
							</div>
						</div>
					</div>
				))}
		</div>
	);

	if (basket.isLoading) {
		content = <LoadingSpinner asOverlay />;
	}

	return (
		<React.Fragment>
			<div className={classes.Basket}>
				<div className={classes.Basket__Header}>
					<img src={basketIcon} alt='Basket' width='100px' />
				</div>
				{content}
				{basket.cart.items && basket.cart.items.length > 0 && (
					<div>
						<div
							style={{ marginTop: "2rem" }}
							className={classes.Basket__Content_Flex_Total}>
							<h4>Subtotal</h4>
							<h4>${basket.totalPrice}</h4>
						</div>
						<div className={classes.Basket__Content_Flex_Total}>
							<h4>Delivery Fee</h4>
							<h4>$20</h4>
						</div>
						<div
							style={{ marginBottom: "1rem", marginTop: "1rem" }}
							className={classes.Basket__Content_Flex_Total}>
							<h4 style={{ color: "#ed1b24" }}>Total</h4>
							<h4 style={{ color: "#ed1b24" }}>${basket.totalPrice + 20}</h4>
						</div>
					</div>
				)}
				{token && basket.cart.items.length > 0 && (
					<NavLink to='/checkout' onClick={() => props.onCancel()}>
						<div className={classes.Bucket__Content_Checkout_Button}>
							Checkout
						</div>
					</NavLink>
				)}
				{!token && basket.cart.items.length > 0 && (
					<NavLink
						to={`/authentication/checkout/${Math.floor(
							Math.random() * 1000 * 1000 * 100000
						)}`}
						onClick={() => props.onCancel()}>
						<div className={classes.Bucket__Content_Checkout_Button}>
							Please Login to Checkout
						</div>
					</NavLink>
				)}
				{basket.cart && basket.cart.items.length < 1 && (
					<>
						<h3
							style={{
								textAlign: "center",
								color: " #ed1b24",
								margin: "2rem 0",
							}}>
							Your Basket Is Empty
						</h3>
						<NavLink
							to='/restaurants'
							onClick={() => {
								props.onCancel();
							}}>
							<div className={classes.Bucket__Content_Checkout_Button}>
								Find Restaurants
							</div>
						</NavLink>
					</>
				)}
			</div>
		</React.Fragment>
	);
};

export default Basket;
