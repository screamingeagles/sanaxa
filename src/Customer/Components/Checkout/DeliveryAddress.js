import React, { useState } from "react";
import classes from "./DeliveryAddress.module.css";
import Modal from "../../../shared/components/UIElements/Modal";
import AddAddressForm from "./../User Dashboard/AddAddressForm";

const DeliveryAddress = (props) => {
	const [newAddress, setNewAddress] = useState(false);
	const newAddressHandler = () => {
		setNewAddress((prevState) => !prevState);
	};
	return (
		<div className={classes.DeliveryAddress}>
			<Modal
				header='Add Address'
				style={{ width: "40rem" }}
				// style={{ maxWidth: "46rem", left: "calc(50% - 23rem)", width: "90%" }}
				show={newAddress}
				onCancel={() => newAddressHandler()}>
				<AddAddressForm />
			</Modal>
			<div className={classes.DeliveryAddress_Heading}>
				<h3>Delivery Address</h3>
				<p onClick={() => newAddressHandler()}>ADD</p>
			</div>
			<div className={classes.DeliveryAddress_Details}>
				<div className={classes.DeliveryAddress_Details_Span}>
					<span style={{ fontWeight: "bold" }}>First Name: </span>
					<span>Muzammil </span>
					<span style={{ fontWeight: "bold" }}>Last Name: </span>
					<span>Muzammil</span>
				</div>
				<div className={classes.DeliveryAddress_Details_Span}>
					<span style={{ fontWeight: "bold" }}>Address: </span>
					<span>Somewhere near nowhere</span>
				</div>
				<div className={classes.DeliveryAddress_Details_Span}>
					<span style={{ fontWeight: "bold" }}>Mobile: </span>
					<span>+971-55555555</span>
				</div>
			</div>
		</div>
	);
};

export default DeliveryAddress;
