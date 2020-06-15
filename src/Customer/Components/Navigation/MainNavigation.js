import React, { useState, useContext } from "react";
import classes from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

import Logo from "../../../shared/assets/Images/snaxaLogo.svg";
import User from "../../../shared/assets/Images/awesome-user.svg";
import ShoppingCart from "../../../shared/assets/Images/shopping-cart.svg";
import CartLineUser from "../../../shared/assets/Images/cart-user-line.svg";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useBasket } from "./../../../shared/hooks/basket-hook";
import { BasketContext } from "../../../shared/context/basket-context";

const MainNavigation = (props) => {
	const auth = useContext(AuthContext);
	const uid = auth.userId;

	// const { showBasket, showBasketHandler, basketContent } = useBasket();
	const basket = useContext(BasketContext);

	const [show, setShow] = useState(false);
	const pushHeight = () => {
		setShow(!show);
	};

	let link = "/authentication";
	if (auth.token) {
		link = "/user-detail";
	}
	return (
		<MainHeader>
			{basket.basketContent}
			<div className={classes.MainNavigation}>
				<div className={classes.Logo}>
					<NavLink to='/'>
						<img src={Logo} alt='Logo Snaxa' width='90px' />
					</NavLink>
				</div>
				<div onClick={() => pushHeight()} className={classes.Burger}>
					<div
						className={[show && classes.topDiv, classes.Line].join(" ")}></div>
					<div
						className={[show && classes.middleDiv, classes.Line].join(
							" "
						)}></div>
					<div
						className={[show && classes.bottomDiv, classes.Line].join(
							" "
						)}></div>
				</div>
				<div className={classes.NavLinks}>
					<NavLinks />
					<div className={classes.Icons}>
						<NavLink to={link}>
							<img
								src={User}
								width='18px'
								alt='user'
								className={classes.userIcon}
							/>
						</NavLink>
						<img src={CartLineUser} alt='line' height='20px' width='1px' />
						{/* <NavLink onClick={props.onClick} to={`/cart/${uid}`}> */}
						{/* <NavLink onClick={props.onClick} to='/basket'> */}
						<img
							src={ShoppingCart}
							width='18px'
							alt='cart'
							style={{ cursor: "pointer" }}
							onClick={() => basket.showBasketHandler()}
						/>
						{/* </NavLink> */}
					</div>
				</div>
			</div>
			<div
				className={[classes.MobileNavigation, show && classes.height].join(
					" "
				)}>
				<NavLinks onClick={pushHeight} />
				<div className={classes.Icons}>
					<NavLink to={link}>
						<img
							onClick={pushHeight}
							src={User}
							width='16px'
							alt='user'
							className={classes.userIcon}
						/>
					</NavLink>
					<span className={classes.span}>|</span>
					<img
						src={ShoppingCart}
						width='16px'
						alt='cart'
						style={{ cursor: "pointer" }}
						onClick={() => basket.showBasketHandler()}
					/>
				</div>
			</div>
		</MainHeader>
	);
};

export default MainNavigation;
