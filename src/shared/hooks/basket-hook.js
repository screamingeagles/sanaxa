import React, { useState, useEffect, useCallback } from "react";
import Modal from "../components/UIElements/Modal";
import Basket from "../../Customer/Components/Basket/Basket";
import { useHttpClient } from "./http-hook";
// import { AuthContext } from "../context/auth-context";
import { useAuth } from "./auth-hook";

import openSocket from "socket.io-client";

export const useBasket = () => {
	// const auth = useContext(AuthContext);
	const { token, userId } = useAuth();
	const [showBasket, setShowBasket] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	// const [items, setItems] = useState([]);
	const [cart, setCart] = useState({ items: [] });
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const showBasketHandler = () => {
		return setShowBasket((prevState) => !prevState);
	};

	//  ------------------------------------------------------------------- SOCKET IMPLEMENTATION

	const fetchCart = useCallback(
		async (cart, remove) => {
			const tempCart = JSON.parse(localStorage.getItem("cart"));
			if (cart.items.length === 0) {
				console.log("If");
				localStorage.setItem("cart", JSON.stringify({ items: [] }));
				if (token && userId) {
					try {
						await sendRequest(
							`${process.env.REACT_APP_BACKEND_URL}/oldbasket`,
							"POST",
							{
								"Content-Type": "application/json",
								Authorization: "Bearer " + token,
							},
							JSON.stringify({
								userId,
								tempCart,
							})
						);
						setCart(tempCart);
					} catch (error) {}
				}
			} else {
				console.log("Else");
				setCart(cart);
				localStorage.setItem("cart", JSON.stringify(cart));
			}

			let totPrice = 0;
			tempCart.items.map((i) => {
				return totPrice += parseFloat(i.quantity) * parseFloat(i.price);
			});
			setTotalPrice(totPrice);
		},
		[sendRequest, token, userId]
	);

	useEffect(() => {
		const socket = openSocket(`${process.env.REACT_APP_BACKEND_URL}`);
		socket.on("add", (data) => {
			if (data.userId === userId && data.action === "add") {
				fetchCart(data.user);
			}
			if (
				data.userId === userId &&
				data.action === "add" &&
				data.remove === false
			) {
				fetchCart(data.user, data.remove);
			}
		});
	}, [userId, fetchCart]);

	//  ------------------------------------------------------------------- SOCKET IMPLEMENTATION

	//  ------------------------------------------------------------------- FIRST CART GETTING FROM DB

	const fetchBasket = useCallback(async () => {
		let tempCart;
		// let tempCartTrue;
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
			tempCart = responseData.user;
			// tempCartTrue = responseData.user.items.length > 0;
			setCart(responseData.user);
			let totPrice = 0;
			tempCart.items.map((i) => {
				return (totPrice += parseFloat(i.quantity) * parseFloat(i.price));
			});
			setTotalPrice(totPrice);
			// localStorage.setItem("cart", JSON.stringify(responseData.user));
			// if (responseData.user.items.length > 0) return;
		} catch (error) {}
	}, [sendRequest, token, userId]);

	const fetchOfflineBasket = () => {
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
	};

	useEffect(() => {
		if (token && userId) fetchBasket();
		if (!token && !userId) fetchOfflineBasket();
	}, [token, userId, fetchBasket]);
	//  ------------------------------------------------------------------- FIRST CART GETTING

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
			try {
				await sendRequest(
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
				console.log("WTF", userId, token);
			} catch (error) {}
		};

		if (token && userId) uploadBasket();

		const itemExisted = cart.items.find((i) => i.productId === productId);
		const itemExistedIndex = cart.items.findIndex(
			(i) => i.productId === productId
		);

		if (cart.restaurantId === restaurantId)
			if (itemExisted) {
				console.log("Item exist");
				const updatedItem = itemExisted;
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
				fetchOfflineBasket();
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
	};

	const addQuantityToBasket = async (quantity, productId) => {
		if (token && userId) {
			try {
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/addquantity`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						productId,
						quantity,
					})
				);
			} catch (error) {}
		}
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
			fetchOfflineBasket();
			return;
		}
	};

	const removeProduct = async (productId) => {
		let itemExisted;
		if (cart.items) {
			itemExisted = cart.items.filter((i) => i.productId === productId);
		}
		if (itemExisted) {
			const updatedList = [...cart.items];

			const updatedListItems = updatedList.filter((j) => {
				return j.productId.toString() !== itemExisted[0].productId.toString();
			});
			cart.items = updatedListItems;
			if (cart.items.length === 0) {
				const Tempcart = { items: [] };
				setCart({ items: [] });
				localStorage.setItem("cart", JSON.stringify(Tempcart));
			} else localStorage.setItem("cart", JSON.stringify(cart));
			if (!token && !userId) {
				fetchOfflineBasket();
			}
		}
		if (token && userId) {
			try {
				await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/removeproduct`,
					"POST",
					{
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
					JSON.stringify({
						userId,
						productId,
					})
				);
			} catch (error) {}
		}
	};

	const clearBasket = async () => {
		localStorage.setItem("cart", JSON.stringify({ items: [] }));
		setCart({ items: [] });
		if (token && userId) {
			try {
				await sendRequest(
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
