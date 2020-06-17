import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";

import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";

import ResPic from "../../../../shared/assets/Images/respic.jpg";
import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";

import { useHttpClient } from "./../../../../shared/hooks/http-hook";

import SlideBanner from "../SlideBanner";
import AllRestaurantsSearchForm from "../AllRestaurantsSearchForm";
import MostRelatedItems from "./MostRatedItems";

import DescriptionReviews from "./DescriptionReviews";
import CategoryView from "./CategoryView";
import Modal from "./../../../../shared/components/UIElements/Modal";

import classes from "./SingleRestaurant.module.css";
// import AddOnItems from "./../../Bucket/AddOnItems";

const SingleRestaurant = (props) => {
	const [restaurant, setRestaurant] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
	}, []);

	let content;

	// if (!isLoading && restaurant.dish.length > 0)
	if (!isLoading)
		if (restaurant.dish)
			content = restaurant.dish.map((i) => {
				return (
					<CategoryView
						img={ResPic}
						category={i.categoryName}
						dishes={i.foodItems}
						// name='Zinger 1'
						// price='20'
						restaurantId={restaurantId}
						shortDescription='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'
					/>
				);
			});
	if (isLoading)
		content = (
			<div style={{ textAlign: "center" }}>
				<LoadingSpinner />
			</div>
		);
	return (
		<React.Fragment>
			<SlideBanner
				hotel
				img={allRestaurant}
				name={RestaurantName}
				shortDescription='It is a long established fact that a reader will be distracted'
			/>
			<div className='Container'>
				<div className='RightContainer'>
					<DescriptionReviews loading={isLoading} description />
					<h1 style={{ margin: "2rem 0" }}>{RestaurantName} Menu</h1>
					{content}
				</div>
				<div className='LeftContainer'>
					<h4>Search</h4>
					<AllRestaurantsSearchForm hotel placeholder='Search Menu Item' />
					<h4>Most Rated Items</h4>
					<MostRelatedItems />
				</div>
			</div>
		</React.Fragment>
	);
};

export default SingleRestaurant;

// const addToCart = async (id) => {
// 	console.log(id);
// 	console.log(restaurant.name);
// 	try {
// 		const responseData = await sendRequest(
// 			`${process.env.REACT_APP_BACKEND_URL}/addtocart`,
// 			"POST",
// 			{
// 				"Content-Type": "application/json",
// 			},
// 			JSON.stringify({
// 				id: id,
// 				restaurantName: restaurant.name,
// 				uid: auth.userId,
// 			})
// 		);
// 	} catch (err) {}
// };

// console.log(restaurant.menu);
