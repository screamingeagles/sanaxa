import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";
import SlideBanner from "../SlideBanner";
import SortBy from "./SortBy";
import SideBar from "./SideBar";

import ResPic from "../../../../shared/assets/Images/restaurantpic.png";
import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";
import Star from "../../../../shared/assets/Images/Star.svg";
import myLocationIcon from "../../../../shared/assets/Images/myLocationIcon.png";
import clockIcon from "../../../../shared/assets/Images/clockIcon.png";

import { useHttpClient } from "./../../../../shared/hooks/http-hook";

import classes from "./AllRestaurants.module.css";
import Categories from "./Categories";
import StayUpToDateForm from "./StayUpToDateForm";

const AllRestaurants = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [allRestaurants, setAllRestaurants] = useState([]);

	useEffect(() => {
		const fetchAllRestaurants = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/allrestaurants`
				);
				setAllRestaurants(responseData.allRestaurants);
			} catch (error) {}
		};
		fetchAllRestaurants();
	}, []);

	let content;

	if (isLoading)
		content = (
			<div style={{ textAlign: "center" }}>
				<LoadingSpinner />
			</div>
		);

	if (!isLoading)
		content = allRestaurants.map((name) => {
			return (
				<NavLink
					to={`/restaurant/${name._id}/${name.name.replace(" ", "+")}`}
					key={name.id}
					className={classes.Restaurant}>
					<div className={classes.Image}>
						<img src={ResPic} alt='Res' width='100%' height='100%' />
					</div>
					<div className={classes.detail}>
						<h3>{name.name}</h3>
						<div className={classes.Location}>
							<img src={myLocationIcon} alt='Location' height='12px' />
							<p>{name.address}</p>
						</div>
						<span>{name.tags}</span>
						<div className={classes.DeliveryRatings}>
							<div className={classes.deliveryTime}>
								<img src={clockIcon} alt='deliveryTime' height='20px' />
								<p>Deliver within {name.deliveryTime} mins</p>
							</div>
							<div className={classes.ratingIcon}>
								<img src={Star} alt='Rating' height='20px' />
								<p>{name.rating}</p>
							</div>
						</div>
					</div>
				</NavLink>
			);
		});

	return (
		<React.Fragment>
			<SlideBanner
				img={allRestaurant}
				alt='All Restaurants'
				name='All Restaurants'
				form
				shortDescription='Here are the list and details of all restaurants. Choose your fav cusine and enjoy your meal'
			/>
			<div className='Container'>
				<div className='RightContainer'>
					<SortBy />
					<div className={classes.AllRestaurants}>{content}</div>
				</div>
				<div className='LeftContainer'>
					<SideBar />
					<Categories />
					<StayUpToDateForm />
				</div>
			</div>
		</React.Fragment>
	);
};

export default AllRestaurants;
