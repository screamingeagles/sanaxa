import React from "react";
import classes from "./TopDetailsTabs.module.css";

import masterCard from "../../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../../shared/assets/Images/cashIcon.png";
import ResPic from "../../../../shared/assets/Images/respic.jpg";
import menuicon from "../../../../shared/assets/Images/menu-ico.png";
import infoIcon from "../../../../shared/assets/Images/infoIcon.png";
import reviewsIcon from "../../../../shared/assets/Images/reviewsIcon.png";

const TopDetailsTabs = (props) => {
	return (
		<React.Fragment>
			<div className='Container'>
				<div className={classes.RestaurantDetails}>
					<div className={classes.RestaurantDetails_Name}>
						<img src={ResPic} alt='' width='130px' />
						<div>
							<h3>{props.RestaurantName}</h3>
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
						className={[classes.Tab, props.menu && classes.Active].join(" ")}
						onClick={() => props.setTabHandler("m")}>
						<img src={menuicon} alt='' width='22px' />
						<p>Menu</p>
					</div>
					<div
						className={[classes.Tab, props.reviews && classes.Active].join(" ")}
						onClick={() => props.setTabHandler("r")}>
						<img src={infoIcon} alt='' width='25px' />
						<p>Reviews</p>
					</div>
					<div
						className={[classes.Tab, props.info && classes.Active].join(" ")}
						onClick={() => props.setTabHandler("i")}>
						<img src={reviewsIcon} alt='' width='25px' />
						<p>Info</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default TopDetailsTabs;
