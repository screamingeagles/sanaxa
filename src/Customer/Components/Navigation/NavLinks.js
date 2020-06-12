import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLinks.module.css";
import { AuthContext } from "../../../shared/context/auth-context";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);
	const uid = auth.userId;
	return (
		<nav
			className={[classes.NavLink, props.footer && classes.NavLinkFooter].join(
				" "
			)}>
			{props.footer && (
				<NavLink onClick={props.onClick} to='/'>
					Home
				</NavLink>
			)}
			<NavLink onClick={props.onClick} to='/restaurants'>
				Restaurants
			</NavLink>
			<NavLink onClick={props.onClick} to={`/orders/${uid}`}>
				My Orders
			</NavLink>
			<NavLink to='#'>Ramadan Deals</NavLink>
			{!props.footer && <NavLink to='#'>Become a Partner</NavLink>}
			{props.footer && <NavLink to='/'>Offers</NavLink>}
		</nav>
	);
};

export default NavLinks;
