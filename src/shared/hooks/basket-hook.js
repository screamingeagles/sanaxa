import React, { useState, useEffect } from "react";
import Modal from "../components/UIElements/Modal";
import Basket from "../../Customer/Components/Basket/Basket";

export const useBasket = () => {
	const [showBasket, setShowBasket] = useState(false);
	// const [productDetails, setProductDetails] = useState(undefined);
	const [items, setItems] = useState([]);

	// useEffect(() => {
	// 	addToCart(productDetails);
	// }, [productDetails]);

	useEffect(() => {
		fetchCart();
	}, []);

	const addToCart = (
		restaurantId,
		RestaurantName,
		quantity,
		productId,
		name,
		price
	) => {
		// if (!productDetails) return;
		// if (productDetails) {
		// items.push(productDetails);
		const bucketData = {
			restaurantId,
			RestaurantName,
			quantity,
			productId,
			name,
			price,
		};
		items.push(bucketData);
		setItems(items);
		localStorage.setItem("cart", JSON.stringify(items));
		// fetchCart();
		// }
	};

	const fetchCart = () => {
		let cart = JSON.parse(localStorage.getItem("cart"));
		if (!cart) return;
		setItems(cart);
		console.log(cart);
	};

	const setBasketData = (
		restaurantId,
		RestaurantName,
		quantity,
		productId,
		name,
		price
	) => {
		console.log(restaurantId, RestaurantName, quantity, productId, name, price);
		addToCart(restaurantId, RestaurantName, quantity, productId, name, price);
	};

	const showBasketHandler = () => {
		return setShowBasket((prevState) => !prevState);
	};

	let basketContent;

	basketContent = (
		<Modal
			// syle={{ width: "0% !important" }}
			className='basketContainer'
			show={showBasket}
			onCancel={showBasketHandler}
			header='True'>
			<Basket onCancel={showBasketHandler} cart={items} />
		</Modal>
	);

	return {
		showBasket,
		showBasketHandler,
		basketContent,
		setBasketData,
	};
};
