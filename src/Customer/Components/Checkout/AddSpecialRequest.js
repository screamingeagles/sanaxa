import React, { useState } from "react";
import classes from "./AddSpecialRequest.module.css";

import arrrow from "../../../shared/assets/Images/next.svg";

const AddSpecialRequest = (props) => {
	const [specialReq, setSpecialReq] = useState(false);
	const specialReqHandler = () => {
		setSpecialReq((pr) => !pr);
	};

	return (
		<div className={classes.AddSpecialRequest}>
			<div
				onClick={() => specialReqHandler()}
				className={classes.AddSpecialRequest_Heading}>
				<img src={arrrow} alt='' width='15px' />
				<p>Add special requests here.</p>
			</div>
			<div
				className={[
					classes.AddSpecialRequest_Details,
					specialReq && classes.Active,
				].join(" ")}>
				<textarea placeholder='e.g. If you have a food allergy or a request for the driver'></textarea>
				<p>
					Do not add chargeable items, as this may cause your order to be
					cancelled.
				</p>
			</div>
		</div>
	);
};

export default AddSpecialRequest;
