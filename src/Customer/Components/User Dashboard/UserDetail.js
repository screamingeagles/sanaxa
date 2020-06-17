import React, { useContext, useEffect, useCallback, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

import Orders from "./Orders";
import SavedCard from "./SavedCards";
import Address from "./Address";
import Credits from "./Credits";

import classes from "./UserDetail.module.css";
import Account from "./Account";

// const Account = React.lazy(() => import("./Account"));

const UserDetail = (props) => {
	const [user, setUser] = useState();
	const [heading, setHeading] = useState();

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const params = useParams().id;
	const history = useHistory();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const resp = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/userdetail`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({ userId: auth.userId })
				);
				setUser(resp.user);
			} catch (err) {}
		};
		fetchUser();
	}, [sendRequest]);

	useEffect(() => {
		if (params === "account") {
			// window.location.href = "/user-detail/account";
			setHeading("Account");
		}
		if (params === "addresses") {
			setHeading("Address");
		}
		if (params === "orders") {
			setHeading("Orders");
		}
		if (params === "credits") {
			setHeading("Credits");
		}
		if (params === "savedcards") {
			setHeading("SavedCards");
		}
	}, [params]);

	let content;

	content = isLoading && <LoadingSpinner />;

	if (!isLoading && heading === "Account") {
		// history.push("/user-detail/account");
		content = <Account u={user} />;
	}
	if (!isLoading && heading === "Address") {
		content = <Address />;
	}
	if (!isLoading && heading === "Orders") {
		content = <Orders />;
	}
	if (!isLoading && heading === "SavedCards") {
		content = <SavedCard />;
	}
	if (!isLoading && heading === "Credits") {
		content = <Credits />;
	}

	return (
		<div className={[classes.UserDetail, "Container"].join(" ")}>
			<h2 className={classes.UserDetail__Heading}>My Account</h2>
			<div className={classes.UserDetail__SubHeadings}>
				<div className={classes.UserDetail__Sidebar}>
					<p
						onClick={() => {
							setHeading("Account");
							history.push("/user-detail/account");
						}}
						className={[heading === "Account" && classes.active].join(" ")}>
						Account Info
					</p>
					<p
						onClick={() => {
							setHeading("Address");
							history.push("/user-detail/addresses");
						}}
						className={[heading === "Address" && classes.active].join(" ")}>
						Saved Addresses
					</p>
					<p
						onClick={() => {
							setHeading("Orders");
							history.push("/user-detail/orders");
						}}
						className={[heading === "Orders" && classes.active].join(" ")}>
						My Orders
					</p>
					<p
						onClick={() => {
							setHeading("SavedCards");
							history.push("/user-detail/savedcards");
						}}
						className={[heading === "SavedCards" && classes.active].join(" ")}>
						Saved Cards
					</p>
					<p
						onClick={() => {
							setHeading("Credits");
							history.push("/user-detail/credits");
						}}
						className={[heading === "Credits" && classes.active].join(" ")}>
						Snaxa Credits
					</p>
				</div>
				<div className={classes.UserDetail__Main}>{content}</div>
			</div>
		</div>
	);
};

export default UserDetail;
