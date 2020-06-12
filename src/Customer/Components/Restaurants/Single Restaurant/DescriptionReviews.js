import React, { useState } from "react";
import classes from "./DescriptionReviews.module.css";

const DescriptionReviews = (props) => {
	const [description, setDescription] = useState(true);

	const changeContent = () => {
		setDescription(true);
	};
	const changeToReviews = () => {
		setDescription(false);
	};

	let content;
	if (description)
		content = (
			<>
				<p>
					Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsum. Lorem ipsumLorem ipsumLorem
					ipsumLorem
				</p>
				<p>
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsum.
				</p>
			</>
		);

	return (
		<div className={classes.DescriptionReviews}>
			<div className={classes.DescriptionReviews__Heading}>
				<h5
					onClick={changeContent}
					style={{
						borderRadius: "4px 0 0 4px",
						borderRightColor: "transparent",
					}}
					className={[!description && classes.Inactive]}>
					Description
				</h5>
				<h5
					onClick={changeToReviews}
					style={{
						borderRadius: "0 4px 4px 0",
						borderLeftColor: "transparent",
					}}
					className={[description && classes.Inactive]}>
					Reviews
				</h5>
			</div>
			<div className={classes.DescriptionReviews__Content}>{content}</div>
		</div>
	);
};

export default DescriptionReviews;
