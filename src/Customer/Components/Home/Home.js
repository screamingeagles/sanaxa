import React from "react";

import Slider from "../../../shared/assets/Images/sliderhome.jpg";

import SliderBottomBar from "./SliderBottomBar";

import GetConnectedWithUs from "./GetConnectedWithUs";
import FeaturedRestaurants from "./FeaturedRestaurants";

import classes from "./Home.module.css";
import NewsLetter from "./NewsLetter";
import SearchBarForm from "./SearchBarForm";
// import { useParams } from "react-router-dom";

const Home = (props) => {
	// const params = useParams().id;
	return (
		<div className={classes.Home}>
			<div className={classes.SliderBanner}>
				<img src={Slider} alt='Slider Home' width='100%' />
				<div className={classes.SliderBottomBar}>
					<SliderBottomBar />
				</div>
				<div className={classes.SearchBar}>
					<p>
						What do you want to <span style={{ fontWeight: "500" }}>EAT?</span>
					</p>
					<SearchBarForm />
				</div>
			</div>
			<div className={classes.homeContainer}>
				<div className={classes.homeContainer__homeBlock}>
					<GetConnectedWithUs />
				</div>
			</div>
			<div
				style={{ backgroundColor: "#F6F6F6" }}
				className={classes.homeContainer__homeBlock}>
				<FeaturedRestaurants />
			</div>
			<div className={classes.homeContainer__homeBlock}>
				<NewsLetter />
			</div>
		</div>
	);
};

export default Home;
