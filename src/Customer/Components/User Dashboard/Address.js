import React, { useState } from "react";
import classes from "./Address.module.css";

import addressesempy from "../../../shared/assets/Images/addressesempy.svg";
import Button from "../../../shared/components/FormElements/Button";
import Modal from "../../../shared/components/UIElements/Modal";
import AddAddressForm from "./AddAddressForm";

const Address = (props) => {
	const [newAddress, setNewAddress] = useState(false);
	const newAddressHandler = () => {
		setNewAddress((s) => !s);
	};

	return (
		<div className={classes.Address}>
			<Modal
				header='Add Address'
				style={{ width: "40rem" }}
				// style={{ maxWidth: "46rem", left: "calc(50% - 23rem)", width: "90%" }}
				show={newAddress}
				onCancel={() => newAddressHandler()}>
				<AddAddressForm />
			</Modal>
			<img alt='' src={addressesempy} width='120px' />
			<p>There are no addresses saved to display.</p>
			<div style={{ marginTop: "15px" }}>
				<Button onClick={() => newAddressHandler()}>Add Address</Button>
			</div>
		</div>
	);
};

export default Address;
