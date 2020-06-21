// import React, { useEffect, useContext, useState } from "react";
// import { useHttpClient } from "../../shared/hooks/http-hook";
// import { AuthContext } from "../../shared/context/auth-context";

// const Cart = (props) => {
// 	const { isLoading, error, sendRequest, clearError } = useHttpClient();
// 	const auth = useContext(AuthContext);
// 	const [cart, setCart] = useState();

// 	useEffect(() => {
// 		const fetchCart = async () => {
// 			try {
// 				const responseData = await sendRequest(
// 					`${process.env.REACT_APP_BACKEND_URL}/${auth.userId}/cart`,
// 					"POST",
// 					{
// 						"Content-Type": "application/json",
// 					},
// 					JSON.stringify({
// 						uid: auth.userId,
// 					})
// 				);
// 				setCart(responseData);
// 			} catch (err) {}
// 		};
// 		fetchCart();
// 	}, []);

// 	let content;
// 	if (cart)
// 		content = cart.user.map((i) => {
// 			// return console.log(i);
// 			return (
// 				<div>
// 					<p>{i.restaurantName}</p>
// 					<p>{i.id}</p>
// 				</div>
// 			);
// 		});
// 	return <div>{content}</div>;
// };

// export default Cart;
