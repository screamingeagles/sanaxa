import React, { useState } from "react";
import classes from "./CheckoutCardForm.module.css";

const CheckoutCardForm = (props) => {
	const [card, setCard] = useState(undefined);
	const [expiry, setExpiry] = useState(undefined);
	const [CVC, setCVC] = useState(undefined);

	return (
		<div className={classes.CheckoutCardForm}>
			<div className={classes.CheckoutCardForm_TOP} style={{ display: "flex" }}>
				<form
					className={classes.Form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<div>
						<input
							type='search'
							value={card}
							onChange={(e) => setCard(e.target.value)}
							name='card'
							autoComplete='off'
							placeholder=''
							autoFocus={false}
							required
						/>
						<label for='card' className={classes.Label}>
							<span className={classes.ContentSearch}>Card Number</span>
						</label>
					</div>
				</form>
				<form
					className={classes.Form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<div>
						<input
							type='search'
							value={CVC}
							onChange={(e) => setCVC(e.target.value)}
							name='cvc'
							autoComplete='off'
							placeholder=''
							autoFocus={false}
							required
							style={{ width: "25%" }}
						/>
						<label style={{ width: "25%" }} for='cvc' className={classes.Label}>
							<span className={classes.ContentSearch}>CVC</span>
						</label>
					</div>
				</form>
			</div>
			<form
				className={classes.Form}
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div>
					<input
						type='search'
						value={expiry}
						onChange={(e) => setExpiry(e.target.value)}
						name='expiry'
						autoComplete='off'
						placeholder=''
						autoFocus={false}
						required
						style={{ width: "25%" }}
					/>
					<label
						for='expiry'
						style={{ width: "25%" }}
						className={classes.Label}>
						<span className={classes.ContentSearch}>MM/YY</span>
					</label>
				</div>
			</form>
		</div>
	);
};

export default CheckoutCardForm;
