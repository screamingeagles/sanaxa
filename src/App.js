import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import Layout from "./Customer/Layout/Layout";
import classes from "./App.module.css";

function App() {
	const { login, logout, token, userId } = useAuth();

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}>
			<div className={classes.App}>
				<Layout />
			</div>
		</AuthContext.Provider>
	);
}

export default App;
