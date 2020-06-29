import React from "react";
import classes from "./Reviews.module.css";
import UserReviews from "../LocationSearchRestaurant/UserReviews";

const Reviews = (props) => {
	return (
		<div className={classes.Reviews}>
			<UserReviews />
		</div>
	);
};

export default Reviews;
