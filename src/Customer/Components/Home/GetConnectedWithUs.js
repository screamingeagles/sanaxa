import React from "react";

import Customer from "../../../shared/assets/Images/customerIcon.png";
import Driver from "../../../shared/assets/Images/driverIcon.png";
import Restaurant from "../../../shared/assets/Images/restaurantIcon.png";

import classes from "./GetConnectedWithUs.module.css";

const GetConnectedWithUs = (props) => {
	return (
		<div className={classes.GetConnectedWithUs}>
			<h2>Get Connected With Us!</h2>
			<p>In any way you want to</p>
			<div className={classes.GetConnectedWithUs__Features}>
				<div className={classes.GetConnectedWithUs__Features_Block}>
					<div className={classes.GetConnectedWithUs__Features_Img}>
						<img src={Customer} alt='Customer' width='140px' width='140px' />
					</div>
					<div className={classes.GetConnectedWithUs__Features_Text}>
						<h2>Customers</h2>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</div>
				<div className={classes.GetConnectedWithUs__Features_Block}>
					<div className={classes.GetConnectedWithUs__Features_Img}>
						<img src={Restaurant} alt='Restaurant' width='140px' />
					</div>
					<div className={classes.GetConnectedWithUs__Features_Text}>
						<h2>Restaurants</h2>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</div>
				<div className={classes.GetConnectedWithUs__Features_Block}>
					<div className={classes.GetConnectedWithUs__Features_Img}>
						<img src={Driver} alt='Driver' width='140px' />
					</div>
					<div className={classes.GetConnectedWithUs__Features_Text}>
						<h2>Drivers</h2>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetConnectedWithUs;
