import React from "react";
import classes from "./SavedCards.module.css";

import nosavedcards from "../../../shared/assets/Images/nosavedcards.svg";

const SavedCards = (props) => {
	return (
		<div className={classes.SavedCards}>
			<img src={nosavedcards} width='120px' />
			<p>There are no cards saved to display.</p>
		</div>
	);
};

export default SavedCards;
