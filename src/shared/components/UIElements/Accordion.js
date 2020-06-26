import React, { useState } from "react";
import classes from "./Accordion.module.css";

// import downarrow from "../../assets/Images/downarrow.svg";

const Accordion = (props) => {
	const [body, setBody] = useState(false);

	const bodyHandler = () => {
		setBody((prState) => !prState);
	};

	return (
		<div className={classes.Accordion}>
			<div className={classes.Label} onClick={() => bodyHandler()}>
				Label
			</div>
			<div className={[classes.Body, body && classes.Active].join(" ")}>
				Body
			</div>
		</div>
	);
};

export default Accordion;
