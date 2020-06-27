import React from "react";
import classes from "./Menu.module.css";
import CategoriesList from "./CategoriesList";
import ResPic from "../../../../shared/assets/Images/respic.jpg";
import AllRestaurantsSearchForm from "./../AllRestaurantsSearchForm";
import AnchorLink from "react-anchor-link-smooth-scroll";

import Scroll from "react-scroll";
const scroller = Scroll.scroller;

const Menu = (props) => {
	console.log(props.restaurant);

	const changeCategoryActive = (id) => {
		console.log(id);
		const elements = document.getElementsByClassName("CategoriesList");
		for (let i in elements) {
			if (i < 1500) {
				elements[i].classList.remove(classes["Active"]);
				if (`${elements[i].hash}`.replace("#", "") === `${id}`)
					elements[i].classList.add(classes["Active"]);
			}
		}

		scroller.scrollTo(id, {
			duration: 300,
			delay: 0,
			smooth: true,
			containerId: id,
			offset: 100, // Scrolls to element + 50 pixels down the page
		});
	};

	return (
		<div className={classes.Menu}>
			<div className={classes.Categories}>
				<h4>Categories</h4>
				{props.restaurant &&
					props.restaurant.map((i) => (
						<AnchorLink
							offset='100'
							href={`#${i.categoryName}`.replace(" ", "")}
							onClick={() => {
								changeCategoryActive(`${i.categoryName}`.replace(" ", ""));
							}}
							className={["CategoriesList"].join(" ")}>
							{i.categoryName}
						</AnchorLink>
					))}
			</div>
			<div className={classes.FoodList}>
				<AllRestaurantsSearchForm hotel placeholder='Search Menu Item' />
				{props.restaurant &&
					props.restaurant.map((i) => {
						return (
							<CategoriesList
								img={ResPic}
								category={i.categoryName}
								dishes={i.foodItems}
								// name='Zinger 1'
								// price='20'
								// restaurantId={restaurantId}
								shortDescription='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Menu;
