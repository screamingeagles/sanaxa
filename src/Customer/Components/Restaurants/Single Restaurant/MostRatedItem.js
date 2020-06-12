import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MostRatedItem.module.css";

const MostRatedItem = (props) => {
	return (
		<NavLink to='#' className={classes.MostRatedItem}>
			<div>
				<img src={props.img} alt={props.alt} width={props.width} />
			</div>
			<div className={classes.MostRatedItem__Content}>
				<h4>{props.name}</h4>
				<p>{props.description}</p>
				<p
					style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.1em" }}>
					${props.price}
				</p>
			</div>
		</NavLink>
	);
};

export default MostRatedItem;
