import React, { useState } from "react";
import classes from "./AddAddressForm.module.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MAXLENGTH,
} from "./../../../shared/util/validators";
import Button from "../../../shared/components/FormElements/Button";

const AddAddressForm = (props) => {
	const [appartment, setAppartment] = useState(true);
	const [house, setHouse] = useState(false);
	const [office, setOffice] = useState(false);

	const buildingHandler = (x) => {
		if (x === "a") {
			setAppartment(true);
			setHouse(false);
			setOffice(false);
			return;
		}
		if (x === "h") {
			setAppartment(false);
			setHouse(true);
			setOffice(false);
			return;
		}
		if (x === "o") {
			setAppartment(false);
			setHouse(false);
			setOffice(true);
			return;
		}
	};

	const [formState, inputHandler, setFormData] = useForm(
		{
			floor: {
				value: "",
				isValid: false,
			},
			building: {
				value: "",
				isValid: false,
			},
			landline: {
				value: "",
				isValid: true,
			},
			mobilenumber: {
				value: "",
				isValid: true,
			},
			appartment: {
				value: "",
				isValid: true,
			},
			directions: {
				value: "",
				isValid: true,
			},
		},
		false
	);
	console.log(formState, setFormData);

	return (
		<div className={classes.AddAddressForm}>
			<div>
				<p>Contact details</p>
				<div className={classes.AddAddressForm_Col}>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='mobilenumber'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a mobile number'
							onInput={inputHandler}
							placeholder='Mobile Number'
						/>
					</div>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='landline'
							element='input'
							type='text'
							validators={[VALIDATOR_MAXLENGTH(0)]}
							errorText=''
							onInput={inputHandler}
							placeholder='Landline Number (Optional)'
						/>
					</div>
				</div>
				<p>Address details</p>
				<div className={classes.AddAddressForm_Col}>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='city'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a city'
							onInput={inputHandler}
							placeholder='City'
						/>
					</div>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='area'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a area'
							onInput={inputHandler}
							placeholder='Area'
						/>
					</div>
				</div>
				<div
					style={{ alignItems: "center" }}
					className={classes.AddAddressForm_Col}>
					<div className={classes.AddAddressForm_Row}>
						<div className={classes.AddAddressForm_Selection}>
							<div
								onClick={() => buildingHandler("a")}
								className={[
									classes.AddAddressForm_Selection_Cat,
									appartment && classes.Active,
								].join(" ")}>
								Appartment
							</div>
							<div
								onClick={() => buildingHandler("h")}
								className={[
									classes.AddAddressForm_Selection_Cat,
									house && classes.Active,
								].join(" ")}>
								House
							</div>
							<div
								onClick={() => buildingHandler("o")}
								className={[
									classes.AddAddressForm_Selection_Cat,
									office && classes.Active,
								].join(" ")}>
								Office
							</div>
						</div>
					</div>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='street'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText=''
							onInput={inputHandler}
							placeholder='Street'
						/>
					</div>
				</div>
				<div className={classes.AddAddressForm_Col}>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='building'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a building number'
							onInput={inputHandler}
							placeholder='Building'
						/>
					</div>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='floor'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a floor number'
							onInput={inputHandler}
							placeholder='Floor'
						/>
					</div>
				</div>

				<div className={classes.AddAddressForm_Col}>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='appartment'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a appartment number.'
							onInput={inputHandler}
							placeholder='Appartment No.'
						/>
					</div>
					<div className={classes.AddAddressForm_Row}>
						<Input
							id='directions'
							element='textarea'
							type='text'
							validators={[VALIDATOR_MAXLENGTH(0)]}
							errorText=''
							onInput={inputHandler}
							placeholder='Additional Directions (Optional)'
						/>
					</div>
				</div>
			</div>

			<div className={classes.AddAddressForm_Buttons}>
				<div>
					<Button inverse>View Map</Button>
				</div>
				<div>
					<Button>Add Address</Button>
				</div>
			</div>
		</div>
	);
};

export default AddAddressForm;
