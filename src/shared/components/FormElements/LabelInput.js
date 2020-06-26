import React, { useState } from "react";

import classes from "./LabelInput.module.scss";

const LabelInput = (props) => {
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
						style={{ "--color": props.inputcolor }}
					/>
					<label
						style={{ "--color": props.labelcolor }}
						for='search'
						className={classes.Label}>
						<span
							// style={{ color: props.labelcolor }}
							className={classes.ContentSearch}>
							{props.label}
						</span>
					</label>
				</div>
			</form>
		</div>
	);
};

export default LabelInput;
