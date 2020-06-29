import React, { useState } from "react";
import classes from "./Credits.module.css";
// import Input from "./../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

const Credits = (props) => {
	const [description, setDescription] = useState(false);
	const [redeemCode, setRedeemCode] = useState("");

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
					{/* <td>asdasdlkasda</td>
					<td>asdasdlkasda</td>
					<td>asdasdlkas kldmadl lasdmaskld askdlmasldk klasmdaskldm askldmas klsadmsa kasdklasm da</td>
					<td>asdasdlkasda</td>
					<td>asdasdlkasda</td> */}
				</tr>
			</table>
			<p>Transactions made using Snaxa credit will appear here.</p>
		</>
	);

	if (!description)
		content = (
			<div className={classes.RedeemCode}>
				<div>
					<h3>Redeem voucher code below</h3>
				</div>
				<div className={classes.RedeemCode_Enter}>
					<p>Please enter your voucher code here:</p>
					<input
						type='text'
						value={redeemCode}
						placeholder='Voucher Code'
						onChange={(e) => setRedeemCode(e.target.value)}
					/>
				</div>
				<div className={classes.RedeemCode_EnterButton}>

				<Button type='submit'>REDEEM VOUCHER</Button>
				</div>
			</div>
		);

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
