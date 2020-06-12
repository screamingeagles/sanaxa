import React, { useState } from "react";
import classes from "./AddOnItems.module.css";
import Button from "../../../shared/components/FormElements/Button";

const AddOnItems = (props) => {
	const [quantity, setQuantity] = useState(1);

	const increaseQuantity = (number) => {
		number = parseInt(number);
		if (quantity + -number < 1) setQuantity(1);
		setQuantity((prevQuantity) => prevQuantity + -number);
	};

	return (
		<div className={classes.AddOnItems}>
			<div className={classes.AddOnItems__Addons}>
				<h3>Add On Items</h3>
				<div className={classes.AddOnItems__List}>
					<div className={classes.AddOnItems__List_ImageHeading}>
						<img src={props.img} alt='' height='35px' />
						<h4>{props.name}</h4>
					</div>
					<div className={classes.AddOnItems__List_PriceForm}>
						<div>
							<form
								onSubmit={(e) => e.preventDefault()}
								className={classes.AddOnItems__List_Form}>
								<label
									onClick={() => increaseQuantity(1)}
									style={{ paddingLeft: "2px" }}>
									-
								</label>
								<input
									min='1'
									max='100'
									type='number'
									value={quantity}
									onChange={(e) => setQuantity(+e.target.value)}
								/>
								<label onClick={() => increaseQuantity(-1)}>+</label>
							</form>
						</div>
						<h4>${props.price}</h4>
					</div>
				</div>
			</div>
			<div className={classes.AddOnItems__Extras}>
				<h4>Add On's</h4>
				<div className={classes.AddOnItems__Extras_List}>
					<p>Cheese Slice</p>
					<p>Mayo Sauce</p>
					<p>Extra Chicken</p>
				</div>
				<div className={classes.AddOnItems__Extras_Notes}>
					<textarea rows='3' placeholder='Additional Notes...'></textarea>
				</div>
			</div>
			<div className={classes.AddOnItems__Button}>
				<Button backgroundColor='#0dd6ff' color='white' padding='10px 20%'>
					Next
				</Button>
			</div>
		</div>
	);
};

export default AddOnItems;
