import React, { useEffect } from "react";

import "./SortBy.css";

const SortBy = (props) => {
	const sortFunction = (e) => {
		console.log(e.currentTarget.innerText);
		const hello = document.getElementsByClassName("SortingActive");
		hello[0].classList.add("Inactive");
		hello[1].classList.add("Inactive");
		hello[2].classList.add("Inactive");
		hello[3].classList.add("Inactive");
		e.currentTarget.classList.remove("Inactive");
	};

	useEffect(() => {
		const hello = document.getElementsByClassName("Inactive");
		hello[0].classList.remove("Inactive");
	}, []);

	return (
		<div className='SortBy'>
			<div className='SortBy__Container'>
				<p style={{ cursor: "default" }}>Sort By:</p>
				<div className='SortBy__Container_Scrollable'>
					<p
						className='Inactive SortingActive'
						onClick={(e) => sortFunction(e)}>
						Recommended
					</p>
					<p
						className='Inactive SortingActive'
						onClick={(e) => sortFunction(e)}>
						Ratings
					</p>
					<p
						className='Inactive SortingActive'
						onClick={(e) => sortFunction(e)}>
						A-Z
					</p>
					<p
						className='Inactive SortingActive'
						onClick={(e) => sortFunction(e)}>
						Min Order Amount
					</p>
				</div>
			</div>
		</div>
	);
};
// onClick={(e) => (e.currentTarget.style.opacity = 1)}

export default SortBy;
