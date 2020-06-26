import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import MainNavigation from "./../Components/Navigation/MainNavigation";
import Login from "../Components/Login/Login";
import Footer from "../Components/Footer/Footer";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";
import { useAuth } from "../../shared/hooks/auth-hook";
// import Basket from "./../Components/Basket/Basket";

import classes from "./Layout.module.css";

const Home = React.lazy(() => import("./../Components/Home/Home"));
const Checkout = React.lazy(() => import("./../Components/Checkout/Checkout"));
const SingleRestaurant = React.lazy(() =>
	import("./../Components/Restaurants/Single Restaurant/SingleRestaurant")
);
const UserDetail = React.lazy(() =>
	import("./../Components/User Dashboard/UserDetail")
);
const AllRestaurants = React.lazy(() =>
	import("../Components/Restaurants/All Restaurants/AllRestaurants")
);
const LocationSearchRestaurant = React.lazy(() =>
	import(
		"./../Components/Restaurants/LocationSearchRestaurant/LocationSearchRestaurant"
	)
);
const SignUp = React.lazy(() => import("../Components/Login/SignUp"));
// import Checkout from "./../Components/Checkout/Checkout";
// import SingleRestaurant from "./../Components/Restaurants/Single Restaurant/SingleRestaurant";
// import UserDetail from "./../Components/User Dashboard/UserDetail";
// import AllRestaurants from "../Components/Restaurants/All Restaurants/AllRestaurants";
// import SignUp from "../Components/Login/SignUp";
// import Home from "./../Components/Home/Home";
// import LocationSearchRestaurant from "./../Components/Restaurants/LocationSearchRestaurant/LocationSearchRestaurant";

const Layout = (props) => {
	const { login, logout, userId, token } = useAuth();
	let routes;
	if (!token) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/signup' component={SignUp} />
				<Route path='/authentication'>
					<Login onCancel={() => {}} />
				</Route>
				<Route path='/restaurants' component={AllRestaurants} />
				<Route
					path='/restaurant/:id/:name/menu'
					exact
					component={SingleRestaurant}
				/>
				<Route
					path='/restaurant/:id/:name'
					component={LocationSearchRestaurant}
				/>

				<Route path='/checkout' exact component={Checkout} />
				<Route component={Home} />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/restaurants' component={AllRestaurants} />
				<Route path='/checkout' exact component={Checkout} />
				<Route path='/user-detail/:id' component={UserDetail} />
				<Route path='/user-detail' component={UserDetail} />
				<Route
					path='/restaurant/:id/:name/menu'
					exact
					component={SingleRestaurant}
				/>
				<Route
					path='/restaurant/:id/:name'
					component={LocationSearchRestaurant}
				/>

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
