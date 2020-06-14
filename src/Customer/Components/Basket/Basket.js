import React, { useState } from "react";
import classes from "./Basket.module.css";
import basketIcon from "../../../shared/assets/Images/basketIcon.png";
import restaurantIconSmall from "../../../shared/assets/Images/restaurantIconSmall.png";
import respic from "../../../shared/assets/Images/respic.jpg";
import Button from "../../../shared/components/FormElements/Button";
import { NavLink } from "react-router-dom";
import { useBasket } from "./../../../shared/hooks/basket-hook";
import { useAuth } from "./../../../shared/hooks/auth-hook";

const Basket = (props) => {
	const [quantity, setQuantity] = useState(1);
	const { token } = useAuth();

	const increaseQuantity = (number) => {
		number = parseInt(number);
		if (quantity + -number < 1) setQuantity(1);
		setQuantity((prevQuantity) => prevQuantity + -number);
	};

	return (
		<div className={classes.Basket}>
			<div className={classes.Basket__Header}>
				<img src={basketIcon} alt='Basket' width='100px' />
			</div>
			<div className={classes.Basket__Content_Height}>
				{props.cart &&
					props.cart.map((i) => (
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
											<h5>{i.RestaurantName}</h5>
										</div>
									</div>
									<div className={classes.Basket__Content_Price}>
										<h4>{i.price}</h4>
									</div>
								</div>
							</div>
							<div className={classes.Basket__Content_AddItem}>
								<div>
									<form
										onSubmit={(e) => e.preventDefault()}
										className={classes.Bucket__Content_List_Form}>
										<label
											onClick={() => increaseQuantity(1)}
											style={{ paddingLeft: "2px" }}>
											-
										</label>
										<input
											min='1'
											max='100'
											type='number'
											value={quantity}
											onChange={(e) => setQuantity(+e.target.value)}
										/>
										<label onClick={() => increaseQuantity(-1)}>+</label>
									</form>
								</div>
								<div>
									<Button
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
			<div>
				<div
					style={{ marginTop: "2rem" }}
					className={classes.Basket__Content_Flex_Total}>
					<h4>Subtotal</h4>
					<h4>$60</h4>
				</div>
				<div className={classes.Basket__Content_Flex_Total}>
					<h4>Delivery Fee</h4>
					<h4>$20</h4>
				</div>
				<div
					style={{ marginBottom: "1rem", marginTop: "1rem" }}
					className={classes.Basket__Content_Flex_Total}>
					<h4 style={{ color: "#ed1b24" }}>Total</h4>
					<h4 style={{ color: "#ed1b24" }}>$80</h4>
				</div>
			</div>
			{token && (
				<NavLink to='/checkout' onClick={() => props.onCancel()}>
					<div className={classes.Bucket__Content_Checkout_Button}>
						Checkout
					</div>
				</NavLink>
			)}
			{!token && (
				<NavLink to='/authentication' onClick={() => props.onCancel()}>
					<div className={classes.Bucket__Content_Checkout_Button}>
						Please Login to Checkout
					</div>
				</NavLink>
			)}
		</div>
	);
};

export default Basket;
