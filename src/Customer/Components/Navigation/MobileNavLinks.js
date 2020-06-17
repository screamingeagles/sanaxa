import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";
import { AuthContext } from "../../../shared/context/auth-context";

const MobileNavLinks = (props) => {
	const auth = useContext(AuthContext);
	const uid = auth.userId;
	return (
		<nav
			className={[classes.NavLink, props.footer && classes.NavLinkFooter].join(
				" "
			)}>
			<NavLink onClick={props.onClick} to='/'>
				Home
			</NavLink>
			{!auth.token && (
				<div
					className={classes.LoginContainer}
					onClick={() => props.loginShowHandler()}>
					<p>Login</p>
				</div>
			)}
			{auth.token && (
				<NavLink to='/user-detail/account' className={classes.myAccount}>
					My Account
				</NavLink>
			)}
			<NavLink onClick={props.onClick} to='/restaurants'>
				All Restaurants
			</NavLink>
			{!props.footer && <NavLink to='#'>Become a Partner</NavLink>}
			<NavLink to='/'>Offers</NavLink>
			<NavLink to='#'>Ramadan Deals</NavLink>
			{auth.token && (
				<NavLink to='/' onClick={() => props.logoutHandler()}>
					Logout
				</NavLink>
			)}

			{/* {auth.token && (
				<NavLink onClick={props.onClick} to={`/orders/${uid}`}>
					My Orders
				</NavLink>
			)} */}
		</nav>
	);
};

export default MobileNavLinks;
