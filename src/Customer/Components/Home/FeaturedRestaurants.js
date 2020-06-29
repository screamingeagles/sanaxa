import React from "react";
import { NavLink } from "react-router-dom";

import featuredRestaurants from "../../../shared/assets/Images/featuredRestaurants.png";

import classes from "./FeaturedRestaurants.module.css";
import Button from "../../../shared/components/FormElements/Button";

const FeaturedRestaurants = (props) => {
	return (
		<div className={classes.FeaturedRestaurants}>
			<h2>Featured Restaurants</h2>
			<p>Based on Rating</p>
			<div className={classes.FeaturedRestaurants__Features}>
				<NavLink
					to='/restaurant/5ee3da23ae39d61ee8605795/Alaska+Hotel'
					className={classes.FeaturedRestaurants__Features_Block}>
					<div className={classes.FeaturedRestaurants__Features_img}>
						<img src={featuredRestaurants} alt='Customer' width='100%' />
					</div>
					<div className={classes.FeaturedRestaurants__Features_Text}>
						<h4>Alaska Restaurant</h4>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</NavLink>
				<NavLink
					to='/restaurant/5ee3da23ae39d61ee8605795/Alaska+Hotel'
					className={classes.FeaturedRestaurants__Features_Block}>
					<div className={classes.FeaturedRestaurants__Features_img}>
						<img src={featuredRestaurants} alt='Restaurant' width='100%' />
					</div>
					<div className={classes.FeaturedRestaurants__Features_Text}>
						<h4>Alaska Restaurant</h4>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</NavLink>
				<NavLink
					to='/restaurant/5ee3da23ae39d61ee8605795/Alaska+Hotel'
					className={classes.FeaturedRestaurants__Features_Block}>
					<div className={classes.FeaturedRestaurants__Features_img}>
						<img src={featuredRestaurants} alt='Driver' width='100%' />
					</div>
					<div className={classes.FeaturedRestaurants__Features_Text}>
						<h4>Alaska Restaurant</h4>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</NavLink>
			</div>
			<div className={classes.FeaturedRestaurants__Button_ViewAll}>
				<Button
					to='/restaurants'
					backgroundColor='#0dd6ff'
					borderRadius='20px'
					padding='10px 35px'>
					View All
				</Button>
			</div>
		</div>
	);
};

export default FeaturedRestaurants;
