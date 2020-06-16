import React from "react";
import classes from "./Address.module.css";

import addressesempy from "../../../shared/assets/Images/addressesempy.svg";

const Address = (props) => {
	return (
		<div className={classes.Address}>
			<img src={addressesempy} width='120px' />
			<p>There are no addresses saved to display.</p>
		</div>
	);
};

export default Address;
