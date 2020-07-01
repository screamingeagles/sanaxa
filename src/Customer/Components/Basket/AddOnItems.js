import React, { useState, useEffect } from "react";
import classes from "./AddOnItems.module.css";
import Button from "../../../shared/components/FormElements/Button";
import { useParams } from "react-router-dom";
import Checkbox from "./../Login/Checkbox";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import RadioButton from "../Login/RadioButton";
import LoadingSpinner from "./../../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../../shared/hooks/form-hook";

const AddOnItems = (props) => {
	const [quantity, setQuantity] = useState(1);
	const [addOnItems, setAddOnItems] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
	const { isLoading, sendRequest } = useHttpClient();

	const increaseQuantity = (number) => {
		number = parseInt(number);
		if (quantity + -number < 1) setQuantity(1);
		setQuantity((prevQuantity) => prevQuantity + -number);
	};

	// const [formState, inputHandler, setFormData] = useForm(
	// 	{
	// 		YourChoiceofSoup: {
	// 			value: "",
	// 			isVaild: true,
	// 		},
	// 	},
	// 	true
	// );

	const [tempState, setTempState] = useState("");

	const inputHandler = (id, value) => {
		console.log(id, value);
	};

	const { addOnList, productId, name, price, onCancel, setBasketData } = props;
	useEffect(() => {
		if (addOnList.length < 1) {
			onCancel(false);
			setBasketData(
				restaurantId,
				RestaurantName,
				quantity,
				productId,
				name,
				price,
				quantity * price
			);
		}
	}, [
		restaurantId,
		RestaurantName,
		quantity,
		productId,
		name,
		price,
		addOnList,
		onCancel,
		setBasketData,
	]);

	useEffect(() => {
		const fetchAllAddOns = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/addons`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						addOnList: props.addOnList,
					})
				);
				setAddOnItems(responseData.addOns);
			} catch (error) {}
		};
		fetchAllAddOns();
	}, [restaurantId, sendRequest, props.addOnList]);

	return (
		<div className={classes.AddOnItems}>
			<div className={classes.AddOnItems__Addons}>
				<h3>Add Item Choices</h3>
				<div className={classes.AddOnItems__List}>
					<div className={classes.AddOnItems__List_ImageHeading}>
						{/* <img src={props.img} height='35px' alt='' /> */}
						<h4>{props.name}</h4>
						<p>{props.description}</p>
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
						<h4 style={{ width: "45px", textAlign: "right" }}>
							${quantity * props.price}
						</h4>
					</div>
				</div>
			</div>
			{isLoading ? (
				<div className='center'>
					<LoadingSpinner />
				</div>
			) : (
				<div>
					<div>
						{/* {console.log(addOnItems)} */}
						{/* {console.log(
							"ChickenSoup" === formState.inputs.YourChoiceofSoup.value
						)} */}
						{addOnItems.length > 0 &&
							addOnItems.map((i) => {
								return (
									<div className={classes.AddOnItems__Extras}>
										<div>
											<h4>
												{i.addOnName}:{" "}
												<span style={{ fontSize: ".825rem" }}>
													(Choose {i.howMany})
												</span>
											</h4>
											{/* <p>{"Error"}</p> */}
										</div>
										{/* <div>{console.log(i.items)}</div> */}
										<div>
											<form className={classes.AddOnItems__Extras__Checkboxes}>
												{i.items.map((j) => (
													<div
													// onChange={(event) =>
													// 	inputHandler(j._id, event.target.value, true)
													// }
													>
														{i.howMany > 1 ? (
															<Checkbox>
																{j.name}
																{j.price && ` (${j.price})`}
															</Checkbox>
														) : (
															<RadioButton
																// onInput={() =>
																// 	inputHandler(
																// 		`${i.addOnName}`.replace(/\s/g, ""),
																// 		`${j.name}`.replace(/\s/g, "")
																// 	)
																// }
																onChange={inputHandler(
																	`${i.addOnName}`.replace(/\s/g, ""),
																	`${j.name}`.replace(/\s/g, "")
																)}
																value={`${j.name}`.replace(/\s/g, "")}
																validators={true}
																name={`${i.addOnName}`.replace(/\s/g, "")}>
																{j.name}
																{j.price && ` (${j.price})`}
															</RadioButton>
														)}
													</div>
												))}
											</form>
										</div>
									</div>
								);
							})}

						<div className={classes.AddOnItems__Extras_Notes}>
							<textarea rows='3' placeholder='Additional Notes...'></textarea>
						</div>
					</div>
					<div
						className={classes.AddOnItems__Button}
						onClick={() => {
							props.onCancel(false);
							// props.basketHandler();
							props.setBasketData(
								restaurantId,
								RestaurantName,
								quantity,
								props.productId,
								props.name,
								props.price,
								quantity * props.price
							);
						}}>
						<Button backgroundColor='#0dd6ff' color='white' padding='10px 20%'>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddOnItems;

// <div style={{ display: "flex" }}>
// 						<Checkbox>Add Bacon Slice (2.00)</Checkbox>
// 						<Checkbox>Add Melted Cheese (2.00)</Checkbox>
// 						<Checkbox>Add Chicken Royal Patty (1.00)</Checkbox>
// 					</div>
// 					<div style={{ display: "flex" }}>
// 						<Checkbox>Add Mayo (2.00)</Checkbox>
// 						<Checkbox>Add Ketchup (2.00)</Checkbox>
// 						<Checkbox>Add Mustard (1.00)</Checkbox>
// 					</div>

// {/* <h4>Have it your way (Choose up to 2 items)</h4>
// 				<div className={classes.AddOnItems__Extras_List}>
// 					<div style={{ display: "flex" }}>
// 						<Checkbox>Add Cheese (2.00)</Checkbox>
// 						<Checkbox>Add Fiery Sauce (2.00)</Checkbox>
// 						<Checkbox>Add Swiss Cheese (1.00)</Checkbox>
// 					</div>
// 					<div style={{ display: "flex" }}>
// 						<Checkbox>Add Bacon Slice (2.00)</Checkbox>
// 						<Checkbox>Add Melted Cheese (2.00)</Checkbox>
// 						<Checkbox>Add Chicken Royal Patty (1.00)</Checkbox>
// 					</div>
// 					<div style={{ display: "flex" }}>
// 						<Checkbox>Add Mayo (2.00)</Checkbox>
// 						<Checkbox>Add Ketchup (2.00)</Checkbox>
// 						<RadioButton>Add Mustard (1.00)</RadioButton>
// 					</div>
// 				</div> */}
