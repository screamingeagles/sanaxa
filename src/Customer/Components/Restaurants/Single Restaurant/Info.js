import React from "react";
import classes from "./Info.module.css";

import masterCard from "../../../../shared/assets/Images/masterCard.png";
import cashIcon from "../../../../shared/assets/Images/cashIcon.png";
import downarrow from "../../../../shared/assets/Images/downarrow.svg";
import Accordion from "../../../../shared/components/UIElements/Accordion";

const Info = (props) => {
	return (
		<div className={classes.Info}>
			<h3>{props.RestaurantName}</h3>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Minimum Order Amount</h4>
				<h4 className={classes.InfoTable_2}>AED 0.00</h4>
			</div>
			<div style={{ cursor: "pointer" }} className={classes.InfoTable}>
				<Accordion
					title='Working Hours (Today)'
					title2='Open 24 Hours'
					dropIcon={downarrow}>
					<div className={classes.InfoTable}>
						<h4
							style={{ marginLeft: "20px", borderTop: "1px solid transparent" }}
							className={classes.InfoTable_1}>
							Sunday
						</h4>
						<h4
							style={{ borderTop: "1px solid transparent" }}
							className={classes.InfoTable_2}>
							Open 24 Hours
						</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Monday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Tuesday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Wednesday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Thursday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Friday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
					<div className={classes.InfoTable}>
						<h4 style={{ marginLeft: "20px" }} className={classes.InfoTable_1}>
							Saturday
						</h4>
						<h4 className={classes.InfoTable_2}>Open 24 Hours</h4>
					</div>
				</Accordion>
				{/* <h4 className={classes.InfoTable_1}>Working Hours (Today)</h4>
				<h4 className={classes.InfoTable_2}>Open 24 Hours</h4> */}
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Delivery Time</h4>
				<h4 className={classes.InfoTable_2}>30 Mins</h4>
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Delivery Fee</h4>
				<h4 className={classes.InfoTable_2}>AED 6.00</h4>
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Pre Order</h4>
				<h4 className={classes.InfoTable_2}>No</h4>
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Payment</h4>
				<div className={classes.InfoTable_2}>
					<img src={masterCard} alt='' width='35px' />
					<img src={cashIcon} alt='' width='35px' />
				</div>
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Rating</h4>
				<h4 className={classes.InfoTable_2}>Very good</h4>
			</div>
			<div className={classes.InfoTable}>
				<h4 className={classes.InfoTable_1}>Cuisines</h4>
				<h4 className={classes.InfoTable_2}>Burgers, Sandwiches, Desserts</h4>
			</div>
		</div>
	);
};

export default Info;
