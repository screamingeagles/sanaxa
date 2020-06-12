import React, { Suspense, useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainNavigation from "./../Components/Navigation/MainNavigation";
import Login from "../Components/Login/Login";
import Home from "./../Components/Home/Home";
import UserDetail from "./../Components/User Dashboard/UserDetail";
import AllRestaurants from "../Components/Restaurants/All Restaurants/AllRestaurants";
import SingleRestaurant from "./../Components/Restaurants/Single Restaurant/SingleRestaurant";
import Footer from "../Components/Footer/Footer";

import { AuthContext } from "../../shared/context/auth-context";
import { useAuth } from "../../shared/hooks/auth-hook";

import classes from "./Layout.module.css";
import Checkout from "./../Components/Checkout/Checkout";

const Layout = (props) => {
	const { login, logout, token, userId } = useAuth();
	const auth = useContext(AuthContext);

	useEffect(() => {
		document.getElementById("root").scrollTop = 0;
	}, [document.getElementById("root").scrollTop > 0]);

	let routes;
	if (!token) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/authentication' component={Login} />
				<Route path='/restaurants' component={AllRestaurants} />
				<Route path='/restaurant/:id/:name' component={SingleRestaurant} />
				<Route path='/checkout' component={Checkout} />
				{/* <Redirect from='/checkout' to='/authentication' /> */}
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/user-detail' render={() => <UserDetail />} />
				<Route path='/restaurants' component={AllRestaurants} />
				<Route path='/restaurant/:id/:name' component={SingleRestaurant} />
				<Route path='/checkout' component={Checkout} />
				{/* <Route path='/cart/:id' component={Cart} /> */}
				{/* <Route path='/orders/:id' component={Restaurant} /> */}
				<Redirect to='/' />
			</Switch>
		);
	}
	return (
		<div className={classes.Layout}>
			<div className={classes.Layout__Contaienr}>
				<MainNavigation />
				<div>{routes}</div>
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
