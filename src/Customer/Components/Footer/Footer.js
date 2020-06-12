import React, { useState } from "react";

import NavLinks from "../Navigation/NavLinks";
import WhiteLogo from "../../../shared/assets/Images/logoWhite.png";
import emailIcon from "../../../shared/assets/Images/emailIcon.png";
import faceook from "../../../shared/assets/Images/facebook.svg";
import pinterest from "../../../shared/assets/Images/pinterest.svg";
import twitter from "../../../shared/assets/Images/twitter.svg";
import insta from "../../../shared/assets/Images/insta.svg";
import FooterForm from "./FooterForm";

import classes from "./Footer.module.css";

const Footer = (props) => {
	return (
		<div className={classes.Footer}>
			<div style={{}} className={classes.Footer__Container}>
				<div
					className={[
						classes.FooterContainer_Block,
						classes.FooterContainer_Block_Left,
					].join(" ")}>
					<div>
						<img src={WhiteLogo} alt='SNAXA Logo' width='110px' />
					</div>
					<div className={classes.FooterContainer_Block_Left_SocialIcons}>
						<img src={faceook} alt='Facebook' width='27px' />
						<img src={twitter} alt='Twitter' width='27px' />
						<img src={insta} alt='Insta' width='27px' />
						<img src={pinterest} alt='Pinterest' width='27px' />
					</div>
				</div>

				<div
					className={[
						classes.FooterContainer_Block,
						classes.FooterContainer_Block_Middle,
					].join(" ")}>
					<h4>Estd. 2020</h4>
					<p style={{ margin: "20px 0", lineHeight: "1.2" }}>
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking for its layout.
					</p>
					<div style={{ display: "flex", marginBottom: "20px" }}>
						<p style={{ fontWeight: "bold", width: "35px" }}>T</p>
						<p>022 4455 5566</p>
					</div>
					<div style={{ display: "flex" }}>
						<p style={{ fontWeight: "bold", width: "35px" }}>@</p>
						<p>snaxa@anything.com</p>
					</div>
				</div>

				<div
					className={[
						classes.FooterContainer_Block,
						classes.FooterContainer_Block_Right,
					].join(" ")}>
					<div className={classes.FooterContainer_Block_Right_EmailIcon}>
						<img src={emailIcon} alt='emailIcon'  />
						<span>Stay up to date on the latest fron Snaxa</span>
					</div>
					<div style={{ margin: "1rem 0 " }}>
						<FooterForm />
					</div>
				</div>
			</div>

			<hr className={classes.hr} />

			<div className={classes.NavLinks}>
				<NavLinks footer={true} />
			</div>
		</div>
	);
};

export default Footer;
