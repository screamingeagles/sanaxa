import React from "react";

import MostRatedItem from "./MostRatedItem";

import ResPic from "../../../../shared/assets/Images/respic.jpg";

import classes from "./MostRatedItems.module.css";

const MostRatedItems = (props) => {
	const ar = [1, 2, 3, 4];

	return (
		<div className={classes.MostRatedItems}>
			<div>
				{ar.map((i) => (
					<MostRatedItem
						img={ResPic}
						name='Big Mighty Burger'
						description='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
						price='20'
						width='90px'
					/>
				))}
			</div>
		</div>
	);
};

export default MostRatedItems;
