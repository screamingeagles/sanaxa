import React from "react";
import classes from "./SlideBanner2.module.css";
import SearchBarForm from "./../../Home/SearchBarForm";
import StarRating from "./../../../../shared/components/UIElements/StarRating";

import masterCard from "../../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../../shared/assets/Images/cashIcon.png";

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
		</div>
	);
};

export default SlideBanner2;
