import React from "react";
import classes from "./Categories.module.css";

const Categories = (props) => {
	return (
		<div className={classes.Categories}>
			<div>
				<h4>Categories</h4>
				<div className={classes.Categories__List}>
					<label>
						<input type='radio' name='category' />
						<span>Italian</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Continental</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Asian</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Chinese</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Arabic</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Fast Food</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Mexican</span>
					</label>
					<label>
						<input type='radio' name='category' />
						<span>Desserts</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Categories;
