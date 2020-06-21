import React from "react";
import ReactDOM from "react-dom";

import closeIcon from "../../assets/Images/closeIcon.png";

import Backdrop from "../UIElements/Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const ModalOverlay = (props) => {
	const content = (
		<div style={props.style} className={`modal ${props.className}`}>
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
				<img src={closeIcon} height='45px' alt="" onClick={props.onCancel} />
			</div>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
