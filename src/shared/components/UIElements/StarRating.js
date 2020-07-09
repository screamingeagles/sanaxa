import React from "react";

import "./StarRating.scss";

const StarRating = (props) => {
	// const rating = "2.3";
	const stars = parseFloat(props.star).toFixed(1);
	// console.log(stars);
	return (
		<div
			className='Stars'
			style={{ "--rating": stars }}
			// aria-label='Rating of this product is 2.3 out of 5.'
		></div>
		// <div>H</div>
	);
};

export default StarRating;
