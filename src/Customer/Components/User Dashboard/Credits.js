import React, { useState } from "react";
import classes from "./Credits.module.css";

const Credits = (props) => {
	const [description, setDescription] = useState(true);

	const changeStatement = () => {
		setDescription(true);
	};
	const changeToRedeem = () => {
		setDescription(false);
	};

	let content = (
		<>
			<h3>Snaxa Credit Statement History</h3>
			<table className={classes.CreditsDetail_Table}>
				<tr>
					<th>Date</th>
					<th>Time</th>
					<th>Details</th>
					<th>Amount</th>
					<th>Balance</th>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
			<p>Transactions made using Snaxa credit will appear here.</p>
		</>
	);

	if (!description) content = "Redeem";

	return (
		<div className={classes.Credits}>
			<div className={classes.CreditsDetail}>
				<h2>
					Available Balance: <span>AED 0.00</span>
				</h2>
			</div>
			<div className={classes.CreditsDetail_Toggle}>
				<h5
					onClick={changeStatement}
					style={{
						borderRadius: "4px 0 0 4px",
						borderRightColor: "transparent",
					}}
					className={[!description && classes.Inactive]}>
					View Statement
				</h5>
				<h5
					onClick={changeToRedeem}
					style={{
						borderRadius: "0 4px 4px 0",
						borderLeftColor: "transparent",
					}}
					className={[description && classes.Inactive]}>
					Redeem Credit Code
				</h5>
			</div>
			<div className={classes.CreditsDetail__Content}>{content}</div>
		</div>
	);
};

export default Credits;
