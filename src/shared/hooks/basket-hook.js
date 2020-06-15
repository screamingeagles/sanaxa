import React, { useState, useEffect, useCallback } from "react";
import Modal from "../components/UIElements/Modal";
import Basket from "../../Customer/Components/Basket/Basket";

export const useBasket = () => {
	const [showBasket, setShowBasket] = useState(false);
	// const [productDetails, setProductDetails] = useState(undefined);
	const [items, setItems] = useState([]);

	const showBasketHandler = () => {
		return setShowBasket((prevState) => !prevState);
	};

	useEffect(() => {
		fetchBasket();
	}, []);

	const fetchBasket = useCallback(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			// console.log("Updating cart", cart);
			setItems((prevState) => [...cart]);
		}
		if (!cart) {
			setItems([]);
		}
		// console.log("cart", cart);
	}, [items]);

	const setBasketData = (
		restaurantId,
		RestaurantName,
		quantity,
		productId,
		name,
		price
	) => {
		console.log(restaurantId, RestaurantName, quantity, productId, name, price);
		const cartItems = {
			restaurantId,
			RestaurantName,
			quantity,
			productId,
			name,
			price,
		};

		items.map((i) => console.log(i.productId, i.quantity));

		// console.log("items", items);
		// items.push(cartItems);
		// setItems(items);
		// localStorage.setItem("cart", JSON.stringify(items));
		// fetchBasket();
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
