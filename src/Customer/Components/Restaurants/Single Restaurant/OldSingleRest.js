import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";

import Button from "../../../../shared/components/FormElements/Button";
import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";

import ResPic from "../../../../shared/assets/Images/respic.jpg";
import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";

import { AuthContext } from "../../../../shared/context/auth-context";
import { useHttpClient } from "./../../../../shared/hooks/http-hook";

import SlideBanner from "../SlideBanner";
import AllRestaurantsSearchForm from "../AllRestaurantsSearchForm";
import MostRelatedItems from "./MostRatedItems";

import classes from "./SingleRestaurant.module.css";
import DescriptionReviews from "./DescriptionReviews";

const NAMES = [
	{
		name: "Restaurant 1",
		address: "Sharah E Faisal",
		id: 1,
		food: [
			{ name: "Name1", price: 20, id: 1 },
			{ name: "Name2", price: 30, id: 2 },
			{ name: "Name3", price: 40, id: 3 },
		],
	},
	{
		name: "Restaurant 2",
		address: "Tariq Road",
		id: 2,
		food: [
			{ name: "Name4", price: 25, id: 4 },
			{ name: "Name5", price: 35, id: 5 },
			{ name: "Name6", price: 45, id: 6 },
		],
	},
	{
		name: "Restaurant 3",
		address: "Defence",
		id: 3,
		food: [
			{ name: "Name7", price: 30, id: 7 },
			{ name: "Name8", price: 35, id: 8 },
			{ name: "Name9", price: 40, id: 9 },
		],
	},
	// {
	// 	name: "Restaurant 4",
	// 	address: "Bahadurabad",
	// 	id: 4,
	// },
];

const SingleRestaurant = (props) => {
	const [restaurant, setRestaurant] = useState([]);
	const restaurantId = useParams().id;

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [menu, setMenu] = useState([]);
	const params = useParams().id;
	const RestaurantName = useParams().name;

	const Temprestaurant = NAMES.filter((name) => {
		return name.id === +params;
	});

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
				console.log(responseData);
				setRestaurant(responseData.details);
			} catch (error) {}
		};
		fetchAllRestaurants();
	}, []);

	let contentFood;
	if (restaurant.length > 0)
		contentFood = (
			<React.Fragment>
				{restaurant.map((i) => (
					<div key={i.id} className={classes.SingleFoodItem}>
						<div className={classes.ImageName}>
							<img src={ResPic} alt='Food' width='100px' />
							<h3>{i.foodList.name}</h3>
						</div>
						<div className={classes.priceButton}>
							<h4>${i.foodList.price}</h4>
							<Button onClick={() => {}}>
								Add to Cart{" "}
								<span
									style={{
										marginLeft: "5px",
										fontWeight: "bold",
										fontSize: "20px",
									}}>
									+
								</span>
							</Button>
						</div>
					</div>
				))}
			</React.Fragment>
		);

	let content = <LoadingSpinner />;
	if (restaurant) {
		content = <div>{contentFood}</div>;
	}
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
