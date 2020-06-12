import React from "react";

import searchIcon from "../../../shared/assets/Images/searchIcon.png";
import classes from "./AllRestaurantsSearchForm.module.css";

const AllRestaurantsSearchForm = (props) => {
	return (
		<div>
			<form
				className={[
					!props.hotel && classes.formContainer,
					props.hotel && classes.formContainer__Hotel,
				].join(" ")}>
				<div
					className={[
						!props.hotel && classes.inputContainer,
						props.hotel && classes.inputContainer__Hotel,
					].join(" ")}>
					<input type='search' placeholder={props.placeholder} />
					<img src={searchIcon} alt='searchIcon' width='100%' />
				</div>
			</form>
		</div>
	);
};

export default AllRestaurantsSearchForm;
