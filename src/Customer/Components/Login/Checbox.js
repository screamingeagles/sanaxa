import React from "react";

import "./Checkbox.css";

const Checbox = (props) => {
	return (
		<label class='control control-checkbox' onClick={props.onClick}>
			<p style={{ textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
				{props.children}
			</p>
			<input checked={props.checked} type='checkbox' value={props.value} />
			<div class='control_indicator'></div>
		</label>
	);
};

export default Checbox;
