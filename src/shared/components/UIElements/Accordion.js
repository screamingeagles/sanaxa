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
			<div
				className={[classes.Label, body && classes.Active].join(" ")}
				onClick={() => bodyHandler()}>
				<h4>{props.title}</h4>
				<div>
					<h4>{props.title2}</h4>
					<img src={props.dropIcon} alt='' width='10px' />
				</div>
			</div>
			<div className={[classes.Body, body && classes.Active].join(" ")}>
				{props.children}
			</div>
		</div>
	);
};

export default Accordion;
