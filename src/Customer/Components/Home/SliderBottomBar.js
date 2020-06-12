import React from "react";
import customerInHand from "../../../shared/assets/Images/customerInHand.svg";
import Star from "../../../shared/assets/Images/Star.svg";

import classes from "./SliderBottomBar.module.css";

const SliderBottomBar = (props) => {
	return (
		<React.Fragment>
			<div
				// style={{ width: "35%" }}
				style={{ flex: 1 }}
				className={classes.SliderBottomBar__Container}>
				<div className={classes.img}>
					<img
						src={customerInHand}
						alt='customerInHand'
						height='28px !important'
					/>
				</div>
				<div className={classes.SliderBottomBar__TextInfo}>
					<h4>Over 1 Million</h4>
					<p>Orders successfully delivered to customer</p>
				</div>
			</div>
			<div
				// style={{ width: "30%" }}
				style={{ flex: 1 }}
				className={classes.SliderBottomBar__Container}>
				<div className={classes.img}>
					<img src={Star} alt='Star' height='28px !important' />
				</div>
				<div className={classes.SliderBottomBar__TextInfo}>
					<h4>4.5 Stars</h4>
					<p>Google Rating</p>
				</div>
			</div>
			<div
				// style={{ width: "35%" }}
				style={{ flex: 1 }}
				className={classes.SliderBottomBar__Container}>
				<div className={classes.img}>
					<img
						src={customerInHand}
						alt='customerInHand'
						height='28px !important'
					/>
				</div>
				<div className={classes.SliderBottomBar__TextInfo}>
					<h4>700k Customers</h4>
					<p>Build relationship of trust</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SliderBottomBar;
