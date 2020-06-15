import React, { Suspense, useEffect, useState } from "react";
import { BasketContext } from "./shared/context/basket-context";
import { useBasket } from "./shared/hooks/basket-hook";

import Layout from "./Customer/Layout/Layout";
import classes from "./App.module.css";

function App() {
	const {
		basketContent,
		setBasketData,
		showBasketHandler,
		showBasket,
		addQuantityToBasket,
		removeProduct,
		totalPrice,
		fetchBasket,
		items,
	} = useBasket();

	return (
		<BasketContext.Provider
			value={{
				basketContent,
				setBasketData,
				showBasketHandler,
				showBasket,
				addQuantityToBasket,
				removeProduct,
				totalPrice,
				fetchBasket,
				items,
			}}>
			<div className={classes.App}>
				<Layout />
			</div>
		</BasketContext.Provider>
	);
}

export default App;
