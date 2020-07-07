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
	const [restaurant, setRestaurant] = useState(false);
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
			// console.log(cart);
			const tempCart = JSON.parse(localStorage.getItem("cart"));
			setRestaurant(tempCart.RestaurantName);
			if (cart.items.length === 0) {
				// console.log("If");
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
						localStorage.setItem("cart", JSON.stringify(tempCart));
					} catch (error) {}
					let totPrice = 0;
					tempCart.items.map(
						(i) => (totPrice += parseFloat(i.quantity) * parseFloat(i.price))
					);
					setTotalPrice(totPrice);
				}
			} else if (cart.items.length > 0) {
				// console.log("Else");
				setCart(cart);
				localStorage.setItem("cart", JSON.stringify(cart));
				let totPrice = 0;
				cart.items.map(
					(i) => (totPrice += parseFloat(i.quantity) * parseFloat(i.price))
				);
				// console.log(totPrice);
				setTotalPrice(totPrice);
			}
		},
		[sendRequest, token, userId]
	);

	useEffect(() => {
		const socket = openSocket(`${process.env.REACT_APP_BACKEND_BASE_URL}`);
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
			setCart(cart);
			let totPrice = 0;
			console.log(cart);
			cart.items.map((i) => {
				return (totPrice += parseFloat(i.quantity) * parseFloat(i.price));
			});
			setTotalPrice(totPrice);
			setCart(cart);
		}
		if (!cart) {
			setCart({ items: [] });
			localStorage.setItem("cart", JSON.stringify({ items: [] }));
			return;
		}
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
		totalPrice,
		addOns
	) => {
		const cartData = {
			quantity,
			productId,
			name,
			price,
			totalPrice,
			addOns: addOns ? addOns : "",
		};

		let tempAddOns;
		if (addOns) {
			tempAddOns = Object.values(addOns).filter(
				(i) => i.value.length > 0 || i.value.item
			);
		}

		console.log(cartData);
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
						tempAddOns
					})
				);
			} catch (error) {}
		};
		if (token && userId) uploadBasket();
		const itemExisted = cart.items.find((i) => i.productId === productId);
		const itemExistedIndex = cart.items.findIndex(
			(i) => i.productId === productId
		);
		let matchAddons = true;
		if (itemExisted && itemExisted.addOns) {
			const obj1 = Object.values(itemExisted.addOns);
			const obj2 = Object.values(tempAddOns);
			// console.log("obj1", obj1);
			// console.log("obj2", obj2);
			if (obj1.length === obj2.length) {
				obj1.map((i) => {
					obj2.map((j) => {
						if (i.addOnId === j.addOnId) {
							if (matchAddons && i.value.item) {
								if (i.value.item !== j.value.item) {
									matchAddons = false;
									return matchAddons;
								}
								matchAddons = matchAddons && true;
							} else if (matchAddons && i.value.length > 0) {
								if (i.value.length === j.value.length) {
									// console.log("i", i.value);
									// console.log("j", j.value);
									i.value.map((k) => {
										let matched = false;
										if (matchAddons) {
											j.value.map((l) => {
												if (k._id === l._id) {
													matchAddons = true;
													matched = true;
													// console.log("trueeeee");
													// console.log("matchAddons", matchAddons);
													return matchAddons;
												}
												// console.log("falseeeee");
												// console.log("matched", matched);
												if (!matched) matchAddons = false;
												return matchAddons;
											});
											// console.log("returnnn");
											matchAddons = matchAddons && true;
										}
										return matchAddons;
									});
								} else {
									matchAddons = false;
								}
							}
						}
						return matchAddons;
					});
					return matchAddons;
				});
				console.log("matchAddons", matchAddons);
				// return true;
			}
		}
		if (cart.restaurantId === restaurantId)
			if (itemExisted && matchAddons) {
				// console.log(itemExisted);
				const updatedItem = itemExisted;
				updatedItem.quantity = updatedItem.quantity + quantity;
				updatedItem.totalPrice = updatedItem.quantity * price;
				const updatedList = [...cart.items];
				updatedList[itemExistedIndex] = updatedItem;
				console.log(updatedList);
				// items.push(upda);
				// setItems(updatedList);
				const tempCart = cart;
				tempCart.items = updatedList;
				setCart(tempCart);
				localStorage.setItem("cart", JSON.stringify(tempCart));
				fetchOfflineBasket();
				fetchBasket();
				return;
			} else {
				const tempCart = cart;
				const tempCartData = {
					_id: new Date() + Math.random(),
					quantity,
					productId,
					name,
					price: totalPrice,
					totalPrice,
					addOns: tempAddOns,
				};
				tempCart.items.push(tempCartData);
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
						_id: new Date().toTimeString() + Math.random(),
						quantity,
						productId,
						name,
						price: totalPrice,
						totalPrice,
						addOns: tempAddOns,
					},
				],
			};
			cart.items.push(cartData);
			setCart(tempCart);
			localStorage.setItem("cart", JSON.stringify(tempCart));
			fetchOfflineBasket();
			return;
		}
	};

	const addQuantityToBasket = async (q, productId) => {
		// const quantity = parseInt(q);
		// // if (token && userId) {
		// let ress;
		// if (token) {
		// 	try {
		// 		ress = await sendRequest(
		// 			`${process.env.REACT_APP_BACKEND_URL}/addquantity`,
		// 			"POST",
		// 			{
		// 				"Content-Type": "application/json",
		// 				Authorization: "Bearer " + token,
		// 			},
		// 			JSON.stringify({
		// 				userId,
		// 				productId,
		// 				quantity,
		// 			})
		// 		);
		// 		let totPrice = 0;
		// 		ress.cart.items.map(
		// 			(i) => (totPrice += parseFloat(i.quantity) * parseFloat(i.price))
		// 		);
		// 		setTotalPrice(totPrice);
		// 		fetchCart(ress.cart);
		// 		// return;
		// 	} catch (error) {}
		// }
		// const itemExisted = cart.items.find((i) => i.productId === productId);
		// const itemExistedIndex = cart.items.findIndex(
		// 	(i) => i.productId === productId
		// );
		// if (itemExisted) {
		// 	// console.log(itemExisted);
		// 	const updatedItem = itemExisted;
		// 	updatedItem.quantity = updatedItem.quantity + quantity;
		// 	updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;
		// 	const updatedList = [...cart.items];
		// 	updatedList[itemExistedIndex] = updatedItem;
		// 	const tempCart = cart;
		// 	tempCart.items = updatedList;
		// 	setCart(tempCart);
		// 	// // items.push(upda);
		// 	// setItems(updatedList);
		// 	localStorage.setItem("cart", JSON.stringify(tempCart));
		// 	fetchOfflineBasket();
		// 	return;
		// }
	};

	const removeProduct = async (productId) => {
		let itemExisted;
		if (cart.items) {
			itemExisted = cart.items.filter((i) => i._id === productId);
		}
		if (itemExisted) {
			const updatedList = [...cart.items];
			console.log(updatedList);
			const updatedListItems = updatedList.filter((j) => {
				return j._id.toString() !== itemExisted[0]._id.toString();
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
			// style={{ width: "40rem" }}
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
		restaurant,
	};
};
