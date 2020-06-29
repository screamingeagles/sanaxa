import React from "react";

import searchIcon from "../../../shared/assets/Images/searchIcon.png";
import myLocationIcon from "../../../shared/assets/Images/myLocationIcon.png";
import classes from "./SearchBarForm.module.css";
import Button from "../../../shared/components/FormElements/Button";

const SearchBarForm = (props) => {
	return (
		<div>
			<form className={classes.formContainer}>
				<div className={classes.inputContainer}>
					<img src={searchIcon} alt='searchIcon' />
					{/* {!props.hotel && <img src={searchIcon} alt='searchIcon' />} */}
					<input type='search' placeholder={props.placeholder} />
					{/* <input type='search' placeholder='Try any Restaurant...' /> */}
					<img src={myLocationIcon} alt='myLocationIcon' />
				</div>
				<div className={classes.searchButton}>
					<Button
						to={`/restaurant/${props.restaurantId}/${props.RestaurantName}/menu`}
						width='100%'
						padding='12px 30px'
						borderRadius='40px'
						backgroundColor='#ed1b24'>
						{props.button}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SearchBarForm;
