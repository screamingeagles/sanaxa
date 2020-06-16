import React, { Suspense, useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainNavigation from "./../Components/Navigation/MainNavigation";
import Login from "../Components/Login/Login";
import Home from "./../Components/Home/Home";
import UserDetail from "./../Components/User Dashboard/UserDetail";
import AllRestaurants from "../Components/Restaurants/All Restaurants/AllRestaurants";
import SingleRestaurant from "./../Components/Restaurants/Single Restaurant/SingleRestaurant";
import Footer from "../Components/Footer/Footer";
import Checkout from "./../Components/Checkout/Checkout";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import SignUp from "../Components/Login/SignUp";

import { AuthContext } from "../../shared/context/auth-context";
import { useAuth } from "../../shared/hooks/auth-hook";
import Basket from "./../Components/Basket/Basket";

import classes from "./Layout.module.css";

const Layout = (props) => {
	const { login, logout, userId, firstLogin, token } = useAuth();
	let routes;
	if (!token) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/authentication' exact component={Login} />
				<Route path='/signup' component={SignUp} />
				<Route path='/authentication/:checkout' component={Login} />
				<Route path='/restaurants' component={AllRestaurants} />
				<Route path='/restaurant/:id/:name' component={SingleRestaurant} />
				{/* <Route path='/checkout' exact component={Checkout} /> */}
				{/* <Route path='/checkout/:id' component={Checkout} /> */}
				{/* <Route path='/basket' component={Basket} /> */}
				{/* <Redirect from='/checkout' to='/authentication' /> */}
				{/* <Redirect to='/' /> */}
				{/* <Route exact path='/*' component={() => <Redirect to='/auth' />} /> */}
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/restaurants' component={AllRestaurants} />
				<Route path='/restaurant/:id/:name' component={SingleRestaurant} />
				<Route path='/checkout/:id' component={Checkout} />
				<Route path='/checkout' exact component={Checkout} />
				<Route path='/user-detail/:id' component={UserDetail} />
				<Route path='/user-detail' component={UserDetail} />
				{/* <Route exact path='/*' component={() => <Redirect to='/auth' />} /> */}
				{/* <Route path='/checkout/:id' component={Checkout} /> */}
				{/* <Route path='/cart/:id' component={Cart} /> */}
				{/* <Route path='/orders/:id' component={Restaurant} /> */}
				{/* <Redirect to='/' /> */}
				<Route component={Home} />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login,
				logout,
			}}>
			<div className={classes.Layout}>
				<div className={classes.Layout__Contaienr}>
					<MainNavigation />
					<Suspense
						fallback={
							<div className='center'>
								<LoadingSpinner />
							</div>
						}>
						<div>{routes}</div>
					</Suspense>
				</div>
				<Footer />
			</div>
		</AuthContext.Provider>
	);
};

export default Layout;
