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
	const [totalPrice, setTotalPrice] = useState(1);
	const [addOnItems, setAddOnItems] = useState([]);
	const restaurantId = useParams().id;
	const RestaurantName = useParams().name.replace("+", " ");
	const { isLoading, sendRequest } = useHttpClient();

	const increaseQuantity = (number) => {
		number = parseInt(number);
		if (quantity + -number < 1) setQuantity(1);
		setQuantity((prevQuantity) => prevQuantity + -number);
	};

	const [formState, inputHandler, setFormData] = useForm({}, true);
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
				const arr = [];
				responseData.addOns.map((i) => {
					const object = {
						[`${i.addOnName}`.replace(/\s/g, "")]: {
							id: i._id,
							value: i.multiSelection ? [] : {},
							isValid: i.requiredStatus ? false : true,
							multiSelection: i.howMany,
							howManyMaximum: i.howManyMaximum,
							selectAll: i.selectAll,
						},
					};
					return arr.push(object);
				});
				let arr2 = {};
				arr.map((i) => {
					// console.log(i);
					return (arr2 = { ...arr2, ...i });
				});
				setFormData(arr2, false);
				setAddOnItems(responseData.addOns);
			} catch (error) {}
		};
		fetchAllAddOns();
	}, [restaurantId, sendRequest, props.addOnList, setFormData]);

	if (addOnItems.length > 1) {
		// console.log(formState.inputs["YourChoiceofSoup"], formState.isValid);
		// console.log(formState.inputs, "Valid", formState.isValid);
	}

	useEffect(() => {
		let addOnsPrice = 0;
		let inputs = Object.values(formState.inputs);
		inputs.map((i) => {
			if (i.value.length > 0)
				return i.value.map((j) => {
					if (j.price) {
						return (addOnsPrice += parseFloat(j.price));
					}
					return addOnsPrice;
				});
			else if (i.value.item) {
				if (i.value.price) return (addOnsPrice += parseFloat(i.value.price));
			}
			return addOnsPrice;
		});
		setTotalPrice(
			parseFloat(quantity) *
				(parseFloat(addOnsPrice.toFixed(2)) + props.price).toFixed(2)
		);
	}, [formState.inputs, quantity, props.price]);

	return (
		<div className={classes.AddOnItems}>
			<div className={classes.AddOnItems__Addons}>
				<h3>Add Item Choices</h3>
				<div className={classes.AddOnItems__List}>
					<div className={classes.AddOnItems__List_ImageHeading}>
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
						<h4 style={{ width: "85px", textAlign: "right" }}>
							AED {totalPrice}
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
						{Object.keys(formState.inputs).length > 0 &&
							addOnItems.length > 0 &&
							addOnItems.map((i) => {
								return (
									<div className={classes.AddOnItems__Extras}>
										<div>
											<div>
												{i.requiredStatus &&
													formState.inputs[`${i.addOnName}`.replace(/\s/g, "")]
														.isTouched && (
														<React.Fragment>
															<Checkbox
																isValid={
																	formState.inputs[
																		`${i.addOnName}`.replace(/\s/g, "")
																	].isError ||
																	!formState.inputs[
																		`${i.addOnName}`.replace(/\s/g, "")
																	].isValid
																}
																backgroundColor={
																	formState.inputs[
																		`${i.addOnName}`.replace(/\s/g, "")
																	].isError
																		? "#8e8e8e	"
																		: formState.inputs[
																				`${i.addOnName}`.replace(/\s/g, "")
																		  ].isValid &&
																		  formState.inputs[
																				`${i.addOnName}`.replace(/\s/g, "")
																		  ].isTouched
																		? "green"
																		: "#8e8e8e	"
																}
																prevState={[]}
																checked={
																	formState.inputs[
																		`${i.addOnName}`.replace(/\s/g, "")
																	].isTouched
																}></Checkbox>
															<span style={{ marginLeft: "30px" }}></span>
														</React.Fragment>
													)}
												{i.addOnName}:{" "}
												<span style={{ fontSize: ".825rem" }}>
													(Choose{" "}
													{!i.requiredStatus
														? "items from the list"
														: i.howManyMaximum
														? `min-of ${i.howMany} & max-of ${i.howManyMaximum}`
														: `${i.howMany}`}
													)
												</span>
												<div className={classes.AddOnItems__Extras_Span}>
													{formState.inputs[`${i.addOnName}`.replace(/\s/g, "")]
														.value.length > 0
														? formState.inputs[
																`${i.addOnName}`.replace(/\s/g, "")
														  ].value
																.map((k) =>
																	i.items
																		.filter(
																			(j) =>
																				`${j.name}`.replace(/\s/g, "") ===
																				k.item
																		)
																		.map((k) => {
																			return (
																				<span>
																					{k.name}
																					{formState.inputs[
																						`${i.addOnName}`.replace(/\s/g, "")
																					].value.length -
																						1 >
																						0 && ", "}{" "}
																				</span>
																			);
																		})
																)
																.slice(
																	0,
																	i.howManyMaximum
																		? i.howManyMaximum
																		: i.howMany
																)
														: i.items
																.filter(
																	(k) =>
																		formState.inputs[
																			`${i.addOnName}`.replace(/\s/g, "")
																		].value.item ===
																		`${k.name}`.replace(/\s/g, "")
																)
																.map((j) => <span>{j.name}</span>)}
												</div>
												{/* <p>{"Error"}</p> */}
											</div>
										</div>
										<div>
											<form className={classes.AddOnItems__Extras__Checkboxes}>
												{i.items.map((j) => {
													return (
														<div>
															{(i.requiredStatus && !i.multiSelection) ||
															(!i.requiredStatus && !i.multiSelection) ? (
																<RadioButton
																	addOnId={i._id}
																	onInput={inputHandler}
																	value={`${j.name}`.replace(/\s/g, "")}
																	validators={true}
																	name={`${i.addOnName}`.replace(/\s/g, "")}
																	price={`${j.price}`}>
																	{j.name}
																	{j.price && ` (${j.price})`}
																</RadioButton>
															) : (
																<Checkbox
																	addOnId={i._id}
																	onInput={inputHandler}
																	value={`${j.name}`.replace(/\s/g, "")}
																	validators={true}
																	name={`${i.addOnName}`.replace(/\s/g, "")}
																	price={`${j.price}`}
																	howMany={i.howMany}
																	howManyMaximum={i.howManyMaximum}
																	selectAll={i.selectAll}
																	requiredStatus={i.requiredStatus}
																	prevState={
																		formState.inputs[
																			`${i.addOnName}`.replace(/\s/g, "")
																		].value
																	}>
																	{j.name}
																	{j.price && ` (${j.price})`}
																</Checkbox>
															)}
														</div>
													);
												})}
											</form>
										</div>
									</div>
								);
							})}

						<div className={classes.AddOnItems__Extras_Notes}>
							<textarea rows='3' placeholder='Additional Notes...'></textarea>
						</div>
					</div>
					<div className={classes.AddOnItems__Button}>
						<Button
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
									totalPrice,
									formState.inputs
								);
								// quantity * props.price,
							}}
							disabled={!formState.isValid}
							backgroundColor='#0dd6ff'
							color='white'
							padding='10px 20%'>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddOnItems;
