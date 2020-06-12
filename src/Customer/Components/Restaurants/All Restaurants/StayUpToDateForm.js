import React, { useState } from "react";

import emailSendIcon from "../../../../shared/assets/Images/emailSendIcon.svg";

import classes from "./StayUpToDateForm.module.css";

const StayUpToDateForm = (props) => {
	const [searchText, setSearchText] = useState(undefined);
	return (
		<div style={{ width: "100%" }} className={classes.FormContainer}>
			<h4>Stay up to date</h4>
			<form
				className={classes.Form}
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div>
					<input
						className={classes.inputRelative}
						type='search'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						name='search'
						autoComplete='off'
						placeholder=''
						autoFocus={false}
						required
					/>
					<label for='search' className={classes.Label}>
						<span className={classes.ContentSearch}>
							Enter Your Email Address
						</span>
					</label>
					<img
						src={emailSendIcon}
						className={classes.imageAbsolute}
						alt='Email Send Icon'
						height='28px'
					/>
				</div>
			</form>
		</div>
	);
};

export default StayUpToDateForm;
