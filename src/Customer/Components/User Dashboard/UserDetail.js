import React, { useContext, useEffect, useCallback, useState } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

import classes from "./UserDetail.module.css";

const UserDetail = (props) => {
	const [user, setUser] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	// console.log(auth.userId);

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
				setUser(resp);
			} catch (err) {}
		};
		fetchUser();
	}, [sendRequest]);
	// user && console.log(user.user.name);

	let content = isLoading && <LoadingSpinner />;

	if (!isLoading) {
		content = user && <p>Hello {user.user.name} </p>;
	}

	return <div className={classes.UserDetail}>{content}</div>;
};

export default UserDetail;
