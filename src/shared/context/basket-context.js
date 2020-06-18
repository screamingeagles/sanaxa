import { createContext } from "react";

export const BasketContext = createContext({
	//  isLoggedIn: false,
	// userId: null,
	// token: null,
	// login: () => {},
	// logout: () => {},
	setBasketContent: () => {},
	showBasketHandler: () => {},
	addQuantityToBasket: () => {},
	removeProduct: () => {},
	fetchBasket: () => {},
	clearBasket: () => {},
	cart: { items: [] },
	// totalPrice: 0,
	error: false,
	isLoading: false,
});
