import React from "react";
import { useParams } from "react-router-dom";

// import LoadingSpinner from "./../../../../shared/components/UIElements/LoadingSpinner";
import SlideBanner2 from "./SlideBanner2";

import ResPic from "../../../../shared/assets/Images/restaurantpic.png";
import allRestaurant from "../../../../shared/assets/Images/allRestaurants.jpg";
// import Star from "../../../../shared/assets/Images/Star.svg";
// import myLocationIcon from "../../../../shared/assets/Images/myLocationIcon.png";
// import clockIcon from "../../../../shared/assets/Images/clockIcon.png";

// import { useHttpClient } from "./../../../../shared/hooks/http-hook";

// import classes from "./LocationSearchRestaurant.module.css";
// import SideBar from "./SideBar";
// import Categories from "./Categories";
// import StayUpToDateForm from "./StayUpToDateForm";

const LocationSearchRestaurant = (props) => {
	// const [restaurant, setRestaurant] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
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
	// 			console.log(restaurant);
	// 		} catch (error) {}
	// 	};
	// 	fetchAllRestaurants();
	// }, [restaurantId, sendRequest, restaurant]);

	// const singleRestaurant = (id) => {};

	// let content;

	// if (isLoading)
	// 	content = (
	// 		<div className='center'>
	// 			<LoadingSpinner />
	// 		</div>
	// 	);

	return (
		<React.Fragment>
			<SlideBanner2
				restaurantId={restaurantId}
				RestaurantName={useParams().name}
				imgRes={ResPic}
				img={allRestaurant}
				name={RestaurantName}
				shortDescription='Burgers, Sandwich, Desserts'
			/>
			{/* <div className='Container'>
				<div style={{ width: "100%" }}>
					<div className={classes}>{content}</div>
				</div>
			</div> */}
		</React.Fragment>
	);
};

export default LocationSearchRestaurant;

//{
/* <div className='LeftContainer'>
	<SideBar />
	<Categories />
	<StayUpToDateForm />
</div> */
// }
