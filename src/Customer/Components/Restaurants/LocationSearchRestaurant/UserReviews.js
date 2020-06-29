import React from "react";

import classes from "./UserReviews.module.css";
import StarRating from "../../../../shared/components/UIElements/StarRating";

const UserReviews = (props) => {
	return (
		<React.Fragment>
			<div className='Container'>
				<div className={classes.MainReviewsSection}>
					<p>{props.name} Reviews (17)</p>
					<div className={classes.MainReviewsSection__Rating}>
						<p>2.8</p>
						<StarRating star='2.8' />
					</div>
				</div>
			</div>
			<div className='Container'>
				<div className={classes.RatingFeatures}>
					<div
						style={{ borderRight: "1px solid #ccc" }}
						className={classes.RatingFeatures_Section}>
						<div className={classes.RatingFeatures_Section_Single}>
							<p>2.8</p>
							<StarRating star='2.8' />
						</div>
						<div>Order Packaging</div>
					</div>
					<div
						style={{ borderRight: "1px solid #ccc" }}
						className={classes.RatingFeatures_Section}>
						<div className={classes.RatingFeatures_Section_Single}>
							<p>3.5</p>
							<StarRating star='3.5' />
						</div>
						<div>Value for Money</div>
					</div>
					<div
						style={{ borderRight: "1px solid #ccc" }}
						className={classes.RatingFeatures_Section}>
						<div className={classes.RatingFeatures_Section_Single}>
							<p>4.5</p>
							<StarRating star={4.5} />
						</div>
						<div>Delivery Time</div>
					</div>
					<div className={classes.RatingFeatures_Section}>
						<div className={classes.RatingFeatures_Section_Single}>
							<p>3.1</p>
							<StarRating star={3.1} />
						</div>
						<div>Quality of Food</div>
					</div>
				</div>
			</div>
			<div className='Container'>
				<div style={{ display: "flex", flexFlow: "column", width: "100%" }}>
					<div className={classes.ReviewContainer}>
						<div className={classes.ReviewContainer_Text}>
							<div className={classes.ReviewName}>
								<StarRating star='2.8' />
								<p>John Doe</p>
							</div>
							<div>31 June 2020</div>
						</div>
						<p>
							The food packaging was perfect, I was impressed with how fast my
							order arrived
						</p>
					</div>
					<div className={classes.ReviewContainer}>
						<div className={classes.ReviewContainer_Text}>
							<div className={classes.ReviewName}>
								<StarRating star='2.8' />
								<p>John Jack</p>
							</div>
							<div>22 June 2020</div>
						</div>
						<p>first time i order and was really yummy</p>
					</div>
				</div>
			</div>
			<div className={[classes.ReadMoreButton, "Container"].join(" ")}>
				<p>Read More...</p>
			</div>
		</React.Fragment>
	);
};

export default UserReviews;
