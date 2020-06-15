import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { BasketContext } from "./shared/context/basket-context";
import { useBasket } from "./shared/hooks/basket-hook";

import Layout from "./Customer/Layout/Layout";
import classes from "./App.module.css";

function App() {
	const { login, logout, token, userId } = useAuth();
	const {
		basketContent,
		setBasketData,
		showBasketHandler,
		showBasket,
	} = useBasket();

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login,
				logout,
			}}>
			<BasketContext.Provider
				value={{ basketContent, setBasketData, showBasketHandler, showBasket }}>
				<div className={classes.App}>
					<Layout />
				</div>
			</BasketContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
