import React, { useState } from "react";

import classes from "./FooterForm.module.css";
import Button from "../../../shared/components/FormElements/Button";

const FooterForm = (props) => {
	const [searchText, setSearchText] = useState(undefined);
	return (
		<div style={{ width: "100%" }} className={classes.FormContainer}>
			<form
				className={classes.Form}
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div>
					<input
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
				</div>
			</form>
			<div style={{ margin: "2rem auto", width: "100%", textAlign: "center" }}>
				<Button backgroundColor='white' color='#950006' padding='10px 35px'>
					Send
				</Button>
			</div>
		</div>
	);
};

export default FooterForm;
