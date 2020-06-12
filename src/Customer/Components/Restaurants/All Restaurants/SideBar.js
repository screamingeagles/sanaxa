import React from "react";

import allRestaurantQuotePic from "../../../../shared/assets/Images/allRestaurantQuotePic.png";
import quoteIcon from "../../../../shared/assets/Images/quoteIcon.PNG";

import classes from "./SideBar.module.css";

const SideBar = (props) => {
	return (
		<div className={classes.SideBar}>
			<div className={classes.SideBar__Container}>
				<img
					src={allRestaurantQuotePic}
					alt='All Restaurant Quote Pic'
					height='80%'
				/>
				<div>
					<div className={classes.SideBar__Quote}>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
						volutpat. Ut
						<div className={classes.quoteIcon__Image1}>
							<img src={quoteIcon} alt='Quote Icon' height='12px' />
						</div>
						<div className={classes.quoteIcon__Image2}>
							<img src={quoteIcon} alt='Quote Icon' height='12px' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
