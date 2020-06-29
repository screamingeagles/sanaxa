import React from "react";
import classes from "./SlideBanner2.module.css";
import SearchBarForm from "./../../Home/SearchBarForm";
import StarRating from "./../../../../shared/components/UIElements/StarRating";

import masterCard from "../../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../../shared/assets/Images/cashIcon.png";
import UserReviews from "./UserReviews";

const SlideBanner2 = (props) => {
	return (
		<div>
			<div
				className={classes.SlideBanner}
				style={{ backgroundImage: `url(${props.img})` }}>
				<div className={classes.SlideBanner__Image}>
					{/* <img src={props.img} alt={props.alt} width='100%' /> */}
					<div
						style={props.hotel && { top: "35%" }}
						className={classes.SlideBanner__Content}>
						<img src={props.imgRes} alt={props.alt} className={classes.img} />
						<h2>{props.name}</h2>
						<p>{props.shortDescription}</p>
						<h1>Select your area to see restaurant menu</h1>
						<div>
							<SearchBarForm
								restaurantId={props.restaurantId}
								RestaurantName={props.RestaurantName}
								hotel
								placeholder='Search for area, street name..'
								button='Menu'
							/>
						</div>
						<div className={classes.ReviewsTag}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									// width: "100%",
								}}>
								<div className={classes.Rating}>
									<div className={classes.ratingTag}>2.8</div>
									<div>
										<StarRating star='2.8' />
									</div>
								</div>
								<div className={classes.ReviewsCount}>
									<div></div>
									<div>17 Reviews </div>
								</div>
							</div>
							<div className={classes.Features}>
								<img src={masterCard} alt='' width='35px' />
								<img src={cashIcon} alt='' width='35px' />
							</div>
						</div>
					</div>
				</div>
				<div className={[classes.SlideBannerBottomBar].join(" ")}>
					<h3>{props.name} delivers to you</h3>
					<p>
						{props.name} is a restaurant located in UAE, serving a selection of
						Desserts that delivers across Business Bay, Al Wasl and Al Satwa.
					</p>
					<p>
						Their best selling dishes are Loqmato Honey, Loqmato Chocolate and
						Loqmato White, although they have a variety of dishes and meals to
						choose from, like Loqmato Classic, Loqmato Classic and Loqmato
						Classic.
					</p>
					<p>
						They have been reviewed 23 times by Snaxa users, with a rating of 4.
					</p>
				</div>
			</div>
			<div className={classes.MainReviewsSection}>
				<UserReviews />
			</div>
		</div>
	);
};

export default SlideBanner2;
