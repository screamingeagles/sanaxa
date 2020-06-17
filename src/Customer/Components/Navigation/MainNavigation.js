import React, { useState, useContext } from "react";
import classes from "./MainNavigation.module.css";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

import Logo from "../../../shared/assets/Images/snaxaLogo.svg";
import User from "../../../shared/assets/Images/awesome-user.svg";
import iconcredit from "../../../shared/assets/Images/icon_credit.svg";
import icon_myorders from "../../../shared/assets/Images/icon_myorders.svg";
import icon_account from "../../../shared/assets/Images/icon_account.svg";
import icon_address2 from "../../../shared/assets/Images/icon_address2.svg";
import icon_logout2 from "../../../shared/assets/Images/icon_logout2.svg";
import ShoppingCart from "../../../shared/assets/Images/shopping-cart.svg";
import CartLineUser from "../../../shared/assets/Images/cart-user-line.svg";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useBasket } from "./../../../shared/hooks/basket-hook";
import { BasketContext } from "../../../shared/context/basket-context";
import Modal from "../../../shared/components/UIElements/Modal";
import Login from "../Login/Login";
import MobileNavLinks from "./MobileNavLinks";

const MainNavigation = (props) => {
	const auth = useContext(AuthContext);
	const basket = useContext(BasketContext);

	const history = useHistory();

	const uid = auth.userId;
	
	const [show, setShow] = useState(false);
	
	const pushHeight = () => {
		setShow(!show);
	};
	
	const [loginShow, setLoginShow] = useState(false);
	const loginShowHandler = () => {
		setLoginShow((prevState) => !prevState);
	};

	const logoutHandler = () => {
		auth.logout();
		history.push("/");
	};

	let link = "/authentication";
	if (auth.token) {
		link = "/user-detail";
	}
	return (
		<MainHeader>
			{basket.basketContent}
			<Modal
				style={{ backgroundColor: "white" }}
				show={loginShow}
				onCancel={loginShowHandler}>
				<Login onCancel={loginShowHandler} />
			</Modal>
			<div className={classes.MainNavigation}>
				<div className={classes.Logo}>
					<NavLink
						style={{ cursor: "pointer" }}
						to='/'
						// onClick={() => history.go("/")}
					>
						<img src={Logo} alt='Logo Snaxa' width='100px' />
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
					{!auth.token && basket.cart.items && basket.cart.items.length > 0 && (
						<img
							src={ShoppingCart}
							width='18px'
							alt='cart'
							style={{ cursor: "pointer", margin: "0 0 0 .5rem" }}
							onClick={() => {
								pushHeight();
								basket.showBasketHandler();
							}}
						/>
					)}
					{!auth.token && (
						<div
							className={classes.LoginContainer}
							onClick={() => loginShowHandler()}>
							Login
						</div>
					)}
					{auth.token && (
						<img
							src={ShoppingCart}
							width='18px'
							alt='cart'
							style={{ cursor: "pointer", margin: "0 0 0 .5rem" }}
							onClick={() => {
								pushHeight();
								basket.showBasketHandler();
							}}
						/>
					)}

					{auth.token && (
						<div className={classes.myAccount}>
							My Account
							<div className={classes.myAccount__Dropdown}>
								<NavLink
									to='/user-detail/credits'
									className={classes.myAccount__Dropdown_Item}>
									<img src={iconcredit} width='20px' />
									<p>Snaxa Credit: AED 0.00</p>
								</NavLink>
								<NavLink
									to='/user-detail/orders'
									className={classes.myAccount__Dropdown_Item}>
									<img src={icon_myorders} width='20px' />
									<p>My Orders</p>
								</NavLink>
								<NavLink
									to='/user-detail/account'
									className={classes.myAccount__Dropdown_Item}>
									<img src={icon_account} width='20px' />
									<p>Account Info</p>
								</NavLink>
								<NavLink
									to='/user-detail/addresses'
									className={classes.myAccount__Dropdown_Item}>
									<img src={icon_address2} width='20px' />
									<p>Saved Adresses</p>
								</NavLink>
								<div
									className={classes.myAccount__Dropdown_Item}
									onClick={() => logoutHandler()}>
									<img src={icon_logout2} width='20px' />
									<p>Logout</p>
								</div>
							</div>
						</div>
					)}
					{/* <div className={classes.Icons}>
						<NavLink to={link}>
							<img
								src={User}
								width='18px'
								alt='user'
								className={classes.userIcon}
							/>
						</NavLink>
						<img src={CartLineUser} alt='line' height='20px' width='1px' />
						<img
							src={ShoppingCart}
							width='18px'
							alt='cart'
							style={{ cursor: "pointer" }}
							onClick={() => {
								pushHeight();
								basket.showBasketHandler();
							}}
						/>
					</div> */}
				</div>
			</div>
			<div
				className={[classes.MobileNavigation, show && classes.height].join(
					" "
				)}>
				<MobileNavLinks
					logoutHandler={logoutHandler}
					loginShowHandler={loginShowHandler}
					onClick={pushHeight}
				/>
				{/* <NavLinks onClick={pushHeight} /> */}

				{/* <div className={classes.Icons}>
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
						onClick={() => {
							pushHeight();
							basket.showBasketHandler();
						}}
					/>
				</div> */}
			</div>
		</MainHeader>
	);
};

export default MainNavigation;
