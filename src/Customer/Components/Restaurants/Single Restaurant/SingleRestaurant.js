import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";

// import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";

import { useHttpClient } from "./../../../../shared/hooks/http-hook";

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
import TopDetailsTabs from "./TopDetailsTabs";
import Menu from "./Menu";
import Reviews from "./Reviews";

const SingleRestaurant = (props) => {
	const [restaurant, setRestaurant] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
	const [menu, setMenu] = useState(true);
	const [reviews, setReviews] = useState(false);
	const [info, setInfo] = useState(false);
	console.log(restaurantId);
	const { isLoading, sendRequest } = useHttpClient();

	useEffect(() => {
		const fetchAllRestaurants = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/restaurant`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						restaurantId,
					})
				);
				// console.log(responseData);
				setRestaurant(responseData);
			} catch (error) {}
		};
		fetchAllRestaurants();
	}, [restaurantId, sendRequest]);

	let mainContent;
	let content;

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

	if (menu && !isLoading) content = <Menu restaurant={restaurant.dish} />;
	if (reviews && !isLoading) content = <Reviews />;
	if (info && !isLoading) content = <Info RestaurantName={RestaurantName} />;

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
	if (isLoading)
		mainContent = (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);

	if (!isLoading)
		mainContent = (
			<React.Fragment>
				<TopDetailsTabs
					setTabHandler={setTabHandler}
					RestaurantName={RestaurantName}
					menu={menu}
					info={info}
					reviews={reviews}
				/>
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

	return mainContent;
};

export default SingleRestaurant;
