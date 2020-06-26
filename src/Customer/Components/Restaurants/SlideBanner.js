import React from "react";
import classes from "./SlideBanner.module.css";
import RestaurantsSearchForm from "./AllRestaurantsSearchForm";

const SlideBanner = (props) => {
	return (
		<div className={classes.SlideBanner}>
			<div className={classes.SlideBanner__Image}>
				<img src={props.img} alt={props.alt} width='100%' />
				<div
					style={props.hotel && { top: "35%" }}
					className={classes.SlideBanner__Content}>
					{/* <img src={props.imgRes} alt={props.alt} /> */}
					<h1>{props.name}</h1>
					<p style={props.hotel && { width: "100vw" }}>
						{props.shortDescription}
					</p>
					{/* {props.form && ( */}
						<RestaurantsSearchForm placeholder='Search Restaurants' />
					{/* )} */}
				</div>
			</div>
		</div>
	);
};

export default SlideBanner;
