import React from "react";
import ReactDOM from "react-dom";

import closeIcon from "../../assets/Images/closeIcon.png";

import Backdrop from "../UIElements/Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const ModalOverlay = (props) => {
	const content = (
		// onClick={props.onCancel}
		<div className='modalBack'>
			<div
				id='modalScroll'
				style={props.style}
				className={`modal ${props.className}`}>
				{props.header && (
					<header className={`modal__header ${props.headerClass}`}>
						<h2>{props.header}</h2>
					</header>
				)}
				<form
					onSubmit={
						props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
					}>
					<div className={`modal__content ${props.contentClass}`}>
						{props.children}
					</div>
					{props.footer && (
						<footer className={`modal__footer ${props.footerClass}`}>
							{props.footer}
						</footer>
					)}
				</form>
				<div className='closeIcon'>
					<img src={closeIcon} height='45px' alt='' onClick={props.onCancel} />
				</div>
			</div>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("root"));
	// return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
	document.addEventListener("keyup", (e) => {
		if (e.key === "Escape" && props.show) {
			props.onCancel();
		}
	});
	// const el = document.getElementById("root");
	// props.show && (el.style.overflowX = "hidden");
	// !props.show && (el.style.overflowX = "hidden");
	// const element = document.getElementById("modalScroll");
	// !props.show && element && (element.style.overflowX = "hidden");
	// props.show && element && (element.style.overflowX = "auto");
	return (
		<React.Fragment>
			{props.show && <Backdrop show={props.show} onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames='modalBack'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
