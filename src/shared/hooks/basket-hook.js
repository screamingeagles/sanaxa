import React, { useState, useEffect, useCallback } from "react";
import Modal from "../components/UIElements/Modal";
import Basket from "../../Customer/Components/Basket/Basket";

export const useBasket = () => {
	const [showBasket, setShowBasket] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
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
			return;
		}
		let totPrice = 0;
		cart.map((i) => (totPrice += i.totalPrice));
		setTotalPrice(totPrice);
		// console.log(totPrice);
		// console.log("cart", cart);
		return items;
	}, [items]);

	const setBasketData = (
		restaurantId,
		RestaurantName,
		quantity,
		productId,
		name,
		price,
		totalPrice
	) => {
		// console.log(restaurantId, RestaurantName, quantity, productId, name, price);
		const cartItems = {
			restaurantId,
			RestaurantName,
			quantity,
			productId,
			name,
			price,
			totalPrice,
		};

		const itemExisted = items.find((i) => i.productId === productId);
		const itemExistedIndex = items.findIndex((i) => i.productId === productId);

		if (itemExisted) {
			const updatedItem = itemExisted;
			// console.log(updatedItem);
			updatedItem.quantity = updatedItem.quantity + quantity;
			updatedItem.totalPrice = updatedItem.quantity * price;
			const updatedList = [...items];
			updatedList[itemExistedIndex] = updatedItem;
			// items.push(upda);
			setItems(updatedList);
			localStorage.setItem("cart", JSON.stringify(updatedList));
			fetchBasket();
			return;
		}
		items.push(cartItems);
		setItems(items);
		localStorage.setItem("cart", JSON.stringify(items));
		fetchBasket();
	};

	const addQuantityToBasket = (quantity, productId) => {
		// console.log(quantity, productId);
		const itemExisted = items.find((i) => i.productId === productId);
		const itemExistedIndex = items.findIndex((i) => i.productId === productId);
		if (itemExisted) {
			const updatedItem = itemExisted;
			// console.log(updatedItem);
			updatedItem.quantity = updatedItem.quantity + quantity;
			updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
			// console.log(updatedItem.totalPrice);
			const updatedList = [...items];
			updatedList[itemExistedIndex] = updatedItem;
			// items.push(upda);
			setItems(updatedList);
			localStorage.setItem("cart", JSON.stringify(updatedList));
			fetchBasket();
			return;
		}
	};

	const removeProduct = (productId) => {
		// console.log(productId);
		const itemExisted = items.filter((i) => i.productId === productId);
		if (itemExisted) {
			// updatedItem.quantity = updatedItem.quantity + quantity;
			// updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
			// console.log(updatedItem.totalPrice);
			const updatedList = [...items];

			// console.log("itemExisted", itemExisted[0].productId);
			const updatedListItems = updatedList.filter((j) => {
				// console.log(j);
				return j.productId.toString() !== itemExisted[0].productId.toString();
			});
			// console.log(updatedListItems);
			// updatedList[itemExistedIndex] = updatedItem;
			// items.push(upda);
			setItems(updatedListItems);
			localStorage.setItem("cart", JSON.stringify(updatedListItems));
			fetchBasket();
			return;
		}
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
		addQuantityToBasket,
		removeProduct,
		totalPrice,
		fetchBasket,
		items,
	};
};
