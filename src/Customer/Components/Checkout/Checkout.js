import React, { useState } from "react";

import restaurantIconSmall from "../../../shared/assets/Images/restaurantIconSmall.png";
import masterCard from "../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../shared/assets/Images/cashIcon.png";

import classes from "./Checkout.module.css";
import Button from "../../../shared/components/FormElements/Button";
import CheckoutCardForm from "./CheckoutCardForm";
import DeliveryAddressForn from "./DeliveryAddressForn";

const Checkout = (props) => {
	const [cod, setCOD] = useState(false);

	const changeCOD = (bool) => {
		setCOD(bool);
	};

	return (
		<div className={[classes.Checkout, "Container"].join(" ")}>
			<div className='RightContainer'>
				<div className={classes.Checkout_PaymentContainer}>
					<ul>
						<li>
							<h2>Payment Mode</h2>
						</li>
					</ul>
					<div className={classes.Checkout__PaymentMode}>
						<div
							onClick={() => changeCOD(false)}
							className={[
								classes.Checkout_PaymentMode_Box,
								cod && classes.Inactive,
							].join(" ")}>
							<img src={masterCard} />
							<p>Pay With Card</p>
						</div>
						<div
							onClick={() => changeCOD(true)}
							className={[
								classes.Checkout_PaymentMode_Box,
								!cod && classes.Inactive,
							].join(" ")}>
							<img src={cashIcon} />
							<p>Cash on Delivery</p>
						</div>
					</div>
					{!cod && (
						<div>
							<div className={classes.Checkout_PaymentContainer_Form}>
								<h3>Card Details</h3>
								<CheckoutCardForm />
								<div style={{ display: "flex" }}>
									<span className={classes.span}>*</span>
									<p>
										Enter your card details so that when you will place order
										the amount will be deducted from your account.
									</p>
								</div>
							</div>
							<div className={classes.Checkout__Button}>
								<Button
									backgroundColor='#0dd6ff'
									color='white'
									padding='10px 40px'>
									Save
								</Button>
							</div>
						</div>
					)}
				</div>
				<div className={classes.Checkout_PaymentContainer}>
					<ul>
						<li>
							<h2>Delivery Details</h2>
						</li>
					</ul>
					<div className={classes.Checkout_PaymentContainer_Form}>
						<DeliveryAddressForn />
						<div style={{ display: "flex" }}>
							<span className={classes.span}>*</span>
							<p>
								Your order will be deliver to you at the above mentioned address
								and the rider will call you on your given number in case of any
								kind of problem.
							</p>
						</div>
					</div>
					<div className={classes.Checkout__Button}>
						<Button backgroundColor='#0dd6ff' color='white' padding='10px 20%'>
							Place Order
						</Button>
					</div>
				</div>
			</div>
			<div className='LeftContainer'>
				<div className={classes.Checkout__Sidebar}>
					{/* <div style={{ flex: 1, textAlign: "right", marginRight: "20px", fontSize:"" }}> */}
					<div className={classes.Checkout__Sidebar_Quantity}>2x</div>
					<div className={classes.Checkout__Sidebar_Details}>
						<div className={classes.Checkout__Sidebar_Flex}>
							<h4>Big Mighty Burger</h4>
							<h4>$20</h4>
						</div>
						<div className={classes.Checkout__Sidebar_Restaurant}>
							<img src={restaurantIconSmall} alt='restaurantIconSmall' />
							<h5>Alaska Restaurant</h5>
						</div>
						<div
							style={{ marginTop: "2rem" }}
							className={classes.Checkout__Sidebar_Flex}>
							<h4>Subtotal</h4>
							<h4>$60</h4>
						</div>
						<div className={classes.Checkout__Sidebar_Flex}>
							<h4>Delivery Fee</h4>
							<h4>$20</h4>
						</div>
						<div
							style={{ marginTop: "1rem" }}
							className={classes.Checkout__Sidebar_Flex}>
							<h4 style={{ color: "#ed1b24" }}>Total</h4>
							<h4 style={{ color: "#ed1b24" }}>$80</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
