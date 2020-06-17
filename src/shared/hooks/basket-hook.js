import React, { useState, useEffect, useCallback, useContext } from "react";
import Modal from "../components/UIElements/Modal";
import Basket from "../../Customer/Components/Basket/Basket";
import { useHttpClient } from "./http-hook";
import { AuthContext } from "../context/auth-context";
import { useAuth } from "./auth-hook";

export const useBasket = () => {
	const auth = useContext(AuthContext);
	const { token, userId } = useAuth();
	const [showBasket, setShowBasket] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState({ items: [] });
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const showBasketHandler = () => {
		return setShowBasket((prevState) => !prevState);
	};

	useEffect(() => {
		fetchCart();
	}, [token, userId]);

	const fetchCart = async () => {
		let tempCart;
		let tempCartTrue;
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/fetchbasket`,
				"POST",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				JSON.stringify({
					userId,
				})
			);
			// console.log(responseData);
			// console.log(responseData.user.items);
			tempCart = responseData.user;
			tempCartTrue = responseData.user.items.length > 0;
			// console.log(tempCart);
			setCart(responseData.user);
			let totPrice = 0;
			tempCart.items.map((i) => {
				console.log(i.quantity, i.price);
				totPrice += parseFloat(i.quantity) * parseFloat(i.price);
			});
			setTotalPrice(totPrice);
			localStorage.setItem("cart", JSON.stringify(responseData.user));
			if (responseData.user.items.length > 0) return;
		} catch (error) {}
		if (!tempCartTrue) {
			// console.log("update old");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/oldbasket`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						cart,
					})
				);
				setCart(responseData.user);
				localStorage.setItem("cart", JSON.stringify(responseData.user));
			} catch (error) {}
			return;
		}
	};

	useEffect(() => {
		if (!token && !userId) fetchBasket();
	}, []);

	const fetchBasket = useCallback(() => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		if (cart) {
			// console.log("Updating cart", cart);
			setCart(cart);
		}
		if (!cart) {
			setCart({ items: [] });
			localStorage.setItem("cart", JSON.stringify({ items: [] }));
			return;
		}
		let totPrice = 0;
		// console.log(cart);
		cart.items.map((i) => (totPrice += i.totalPrice));
		setTotalPrice(totPrice);
		// console.log(totPrice);
		setCart(cart);
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
		const cartData = {
			quantity,
			productId,
			name,
			price,
			totalPrice,
		};

		const uploadBasket = async () => {
			console.log(token);
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/addtobasket`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						restaurantId,
						RestaurantName,
						quantity,
						productId,
						name,
						price,
						totalPrice,
						userId,
					})
				);
				// console.log(responseData);
				// setRestaurant(responseData);
			} catch (error) {}
		};

		uploadBasket();

		const itemExisted = cart.items.find((i) => i.productId === productId);
		const itemExistedIndex = cart.items.findIndex(
			(i) => i.productId === productId
		);

		if (cart.restaurantId === restaurantId)
			if (itemExisted) {
				console.log("Item exist");
				const updatedItem = itemExisted;
				console.log(updatedItem);
				updatedItem.quantity = updatedItem.quantity + quantity;
				updatedItem.totalPrice = updatedItem.quantity * price;
				const updatedList = [...cart.items];
				updatedList[itemExistedIndex] = updatedItem;
				// items.push(upda);
				// setItems(updatedList);
				const tempCart = cart;
				tempCart.items = updatedList;
				setCart(tempCart);
				localStorage.setItem("cart", JSON.stringify(tempCart));
				fetchBasket();
				return;
			} else {
				console.log("!Item exist");
				const tempCart = cart;
				tempCart.items.push(cartData);
				setCart(tempCart);
				localStorage.setItem("cart", JSON.stringify(tempCart));
				fetchBasket();
				return;
			}

		if (!cart.restaurantId && cart.restaurantId !== restaurantId) {
			console.log("!restaurant");
			const tempCart = {
				restaurantId,
				RestaurantName,
				items: [
					{
						quantity,
						productId,
						name,
						price,
						totalPrice,
					},
				],
			};
			cart.items.push(cartData);
			setCart(tempCart);
			localStorage.setItem("cart", JSON.stringify(tempCart));
			return;
		}

		fetchBasket();
	};

	const addQuantityToBasket = (quantity, productId) => {
		// console.log(quantity, productId);
		const itemExisted = cart.items.find((i) => i.productId === productId);
		const itemExistedIndex = cart.items.findIndex(
			(i) => i.productId === productId
		);
		if (itemExisted) {
			// console.log(itemExisted);
			const updatedItem = itemExisted;
			updatedItem.quantity = updatedItem.quantity + quantity;
			updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
			const updatedList = [...cart.items];
			updatedList[itemExistedIndex] = updatedItem;
			const tempCart = cart;
			tempCart.items = updatedList;
			setCart(tempCart);
			// // items.push(upda);
			// setItems(updatedList);
			localStorage.setItem("cart", JSON.stringify(tempCart));
			fetchBasket();
			return;
		}
	};

	const removeProduct = (productId) => {
		// console.log(productId);
		let itemExisted;
		if (cart.items) {
			itemExisted = cart.items.filter((i) => i.productId === productId);
		}
		if (itemExisted) {
			// updatedItem.quantity = updatedItem.quantity + quantity;
			// updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
			// console.log(updatedItem.totalPrice);
			const updatedList = [...cart.items];

			// console.log("itemExisted", itemExisted[0].productId);
			const updatedListItems = updatedList.filter((j) => {
				// console.log(j);
				return j.productId.toString() !== itemExisted[0].productId.toString();
			});
			// console.log(updatedListItems);
			// updatedList[itemExistedIndex] = updatedItem;
			// items.push(upda);
			cart.items = updatedListItems;
			if (cart.items.length === 0) {
				const Tempcart = { items: [] };
				setCart({ items: [] });
				localStorage.setItem("cart", JSON.stringify(Tempcart));
				return;
			}
			localStorage.setItem("cart", JSON.stringify(cart));
			fetchBasket();
			return;
		}
	};

	const clearBasket = async () => {
		localStorage.setItem("cart", JSON.stringify({ items: [] }));
		setCart({ items: [] });
		if (token && userId) {
			console.log("Clear Basket");
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/clearbasket`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
					})
				);
			} catch (error) {}
		}
	};

	let basketContent;
	basketContent = (
		<Modal
			// syle={{ width: "0% !important" }}
			className='basketContainer'
			show={showBasket}
			onCancel={showBasketHandler}>
			<Basket onCancel={showBasketHandler} cart={cart} />
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
		cart,
		error,
		clearBasket,
		isLoading,
		clearError,
	};
};
