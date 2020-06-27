import React, { useState, useContext } from "react";
import classes from "./CategoriesList.module.css";
import Button from "../../../../shared/components/FormElements/Button";
import Modal from "./../../../../shared/components/UIElements/Modal";
import AddOnItems from "./../../Basket/AddOnItems";
// import { useBasket } from "./../../../../shared/hooks/basket-hook";
import { BasketContext } from "../../../../shared/context/basket-context";

import Scroll from "react-scroll";
const Element = Scroll.Element;

const CategoriesList = (props) => {
	const [addingToCart, setAddingToCart] = useState(false);
	const [productId, setProductId] = useState(false);
	const [productName, setProductName] = useState(false);
	const [productPrice, setProductPrice] = useState(false);
	const [error, setError] = useState(false);
	// const { showBasketHandler, basketContent, setBasketData } = useBasket();
	const basket = useContext(BasketContext);
	// console.log(basket.cart);

	const contentChange = (e, x) => {
		if (x === "+") {
			e.target.innerHTML = "+";
			return;
		}
		console.log(e.target.innerHTML);
		e.target.innerHTML =
			"<span style='font-size:.65rem; font-weight:bold'>Add</span>";
	};

	const addToCart = (id, name, price) => {
		if (
			basket.cart.restaurantId &&
			props.restaurantId !== basket.cart.restaurantId
		) {
			setError(true);
			setProductId(id);
			setProductName(name);
			setProductPrice(price);
			return;
		}
		if (
			!basket.cart.restaurantId ||
			props.restaurantId === basket.cart.restaurantId
		) {
			setProductId(id);
			setProductName(name);
			setProductPrice(price);
			setAddingToCart(true);
			return;
		}
	};

	const closeCart = () => {
		setAddingToCart(false);
	};

	return (
		<div className={classes.CategoryView}>
			{basket.basketContent}
			<Modal
				header='Alert'
				show={error}
				onCancel={() => setError(false)}
				footer={
					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<div style={{ margin: "0 1rem" }}>
							<Button
								onClick={() => {
									setError(false);
									basket.clearBasket();
									setAddingToCart(true);
								}}
								inverse>
								Yes
							</Button>
						</div>
						<div style={{ margin: "0 1rem" }}>
							<Button onClick={() => setError(false)}>No</Button>
						</div>
					</div>
				}>
				<p style={{ fontWeight: "bold" }}>
					There are items in your cart from{" "}
					<span style={{ color: "#ed1b24" }}>{basket.cart.RestaurantName}</span>
					. Do you want to clear your cart?
				</p>
			</Modal>
			<Modal show={!error && addingToCart} onCancel={closeCart}>
				<AddOnItems
					onCancel={closeCart}
					basketHandler={basket.showBasketHandler}
					setBasketData={basket.setBasketData}
					id={productId}
					img={props.img}
					name={productName}
					price={productPrice}
					productId={productId}
				/>
			</Modal>
			<Element id={`${props.category}`.replace(" ", "")}>
				<p>{props.category}</p>
			</Element>
			{props.dishes.map((j) => {
				return (
					<React.Fragment>
						<div className={classes.CategoryView__Container}>
							<div className={classes.CategoryView__Container_ImageName}>
								<img src={props.img} alt={props.alt} height='60px' />
								<div className={classes.FoodNameDescription}>
									<p>{j.foodList.name}</p>
									<p>{props.shortDescription}</p>
								</div>
							</div>
							<div className={classes.CategoryView__Container_ButtonPrice}>
								<p style={{ fontWeight: "bold" }}>AED {j.foodList.price}</p>
								<div
									className={classes.AddToCart__Button}
									onMouseEnter={(e) => {
										contentChange(e);
									}}
									onMouseLeave={(e) => {
										contentChange(e, "+");
									}}
									onClick={() =>
										addToCart(j._id, j.foodList.name, j.foodList.price)
									}>
									+
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default CategoriesList;
