import React, { useState, useContext } from "react";
import classes from "./CategoryView.module.css";
import Button from "../../../../shared/components/FormElements/Button";
import Modal from "./../../../../shared/components/UIElements/Modal";
import AddOnItems from "./../../Basket/AddOnItems";
// import { useBasket } from "./../../../../shared/hooks/basket-hook";
import { BasketContext } from "../../../../shared/context/basket-context";

const CategoryView = (props) => {
	const [addingToCart, setAddingToCart] = useState(false);
	const [productId, setProductId] = useState(false);
	const [productName, setProductName] = useState(false);
	const [productPrice, setProductPrice] = useState(false);
	const [error, setError] = useState(false);
	// const { showBasketHandler, basketContent, setBasketData } = useBasket();
	const basket = useContext(BasketContext);
	// console.log(basket.cart);

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
			<div>
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
						<span style={{ color: "#ed1b24" }}>
							{basket.cart.RestaurantName}
						</span>
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
				<h2>{props.category}</h2>
				{props.dishes.map((j) => {
					return (
						<React.Fragment>
							<div className={classes.CategoryView__Container}>
								<div className={classes.CategoryView__Container_ImageName}>
									<img src={props.img} alt={props.alt} height='80px' />
									<div>
										<h3>{j.foodList.name}</h3>
										<p>{props.shortDescription}</p>
									</div>
								</div>
								<div className={classes.CategoryView__Container_ButtonPrice}>
									<h3>${j.foodList.price}</h3>
									<div
										className={classes.AddToCart__Button}
										onClick={() =>
											addToCart(j._id, j.foodList.name, j.foodList.price)
										}>
										<span>Add To Cart</span>
										<span
											style={{
												// fontWeight: "bold",
												height: "27px",
												fontSize: "28px",
												alignSelf: "Center",
												marginLeft: "12px",
											}}>
											+
										</span>
									</div>
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryView;
