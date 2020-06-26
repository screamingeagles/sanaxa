import React, { useState } from "react";
import { useParams } from "react-router-dom";

import masterCard from "../../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../../shared/assets/Images/cashIcon.png";

// import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";

import ResPic from "../../../../shared/assets/Images/respic.jpg";

// import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";

// import { useHttpClient } from "./../../../../shared/hooks/http-hook";

// import SlideBanner from "../SlideBanner";
// import AllRestaurantsSearchForm from "../AllRestaurantsSearchForm";
// import MostRelatedItems from "./MostRatedItems";

// import DescriptionReviews from "./DescriptionReviews";
// import CategoryView from "./CategoryView";
// import Modal from "./../../../../shared/components/UIElements/Modal";

// import AddOnItems from "./../../Bucket/AddOnItems";

import classes from "./SingleRestaurant.module.css";
import Cart from "../../Basket/Cart";
import Info from "./Info";

const SingleRestaurant = (props) => {
	// const [restaurant, setRestaurant] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
	const [menu, setMenu] = useState(false);
	const [reviews, setReviews] = useState(false);
	const [info, setInfo] = useState(true);
	console.log(restaurantId);
	// const { isLoading, sendRequest } = useHttpClient();

	// useEffect(() => {
	// 	const fetchAllRestaurants = async () => {
	// 		try {
	// 			const responseData = await sendRequest(
	// 				`${process.env.REACT_APP_BACKEND_URL}/restaurant`,
	// 				"POST",
	// 				{
	// 					"Content-Type": "application/json",
	// 				},
	// 				JSON.stringify({
	// 					restaurantId,
	// 				})
	// 			);
	// 			// console.log(responseData);
	// 			setRestaurant(responseData);
	// 		} catch (error) {}
	// 	};
	// 	fetchAllRestaurants();
	// }, [restaurantId, sendRequest]);

	let content;

	// if (!isLoading && restaurant.dish.length > 0)
	// if (!isLoading)
	// 	if (restaurant.dish)
	// 		content = restaurant.dish.map((i) => {
	// 			return (
	// 				<CategoryView
	// 					img={ResPic}
	// 					category={i.categoryName}
	// 					dishes={i.foodItems}
	// 					// name='Zinger 1'
	// 					// price='20'
	// 					restaurantId={restaurantId}
	// 					shortDescription='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'
	// 				/>
	// 			);
	// 		});
	// if (isLoading)
	// 	content = (
	// 		<div style={{ textAlign: "center" }}>
	// 			<LoadingSpinner />
	// 		</div>
	// 	);

	const setTabHandler = (x) => {
		if (x === "m") {
			setMenu(true);
			setInfo(false);
			setReviews(false);
			return;
		}
		if (x === "r") {
			setMenu(false);
			setInfo(false);
			setReviews(true);
			return;
		}
		if (x === "i") {
			setMenu(false);
			setInfo(true);
			setReviews(false);
			return;
		}
	};

	if (menu) content = "menu";
	if (reviews) content = "reviews";
	if (info) content = <Info RestaurantName={RestaurantName} />;

	return (
		<React.Fragment>
			<div className='Container'>
				<div className={classes.RestaurantDetails}>
					<div className={classes.RestaurantDetails_Name}>
						<img src={ResPic} alt='' width='130px' />
						<div>
							<h3>{RestaurantName}</h3>
							<p>Burgers, Sandwiches, Desserts</p>
							<p>Min. Order: AED 0.000</p>
						</div>
					</div>
					<div className={classes.RestaurantDetails_Details}>
						<h4>Open</h4>
						<p>Very Good</p>
						<div>
							<img src={masterCard} alt='' width='35px' />
							<img src={cashIcon} alt='' width='35px' />
						</div>
					</div>
				</div>
			</div>
			<div className='Container'>
				<div className={classes.Tabs}>
					<div
						className={[classes.Tab, menu && classes.Active].join(" ")}
						onClick={() => setTabHandler("m")}>
						<p>Menu</p>
					</div>
					<div
						className={[classes.Tab, reviews && classes.Active].join(" ")}
						onClick={() => setTabHandler("r")}>
						<p>Reviews</p>
					</div>
					<div
						className={[classes.Tab, info && classes.Active].join(" ")}
						onClick={() => setTabHandler("i")}>
						<p>Info</p>
					</div>
				</div>
			</div>
			<div className='Container'>
				<div className={classes.ContentContainer}>
					<div className={classes.Content}>{content}</div>
					<div className={classes.Cart}>
						<Cart />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SingleRestaurant;
