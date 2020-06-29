<NavLink
	to={`/restaurant/${name._id}/${name.name.replace(" ", "+")}`}
	key={name.id}
	className={classes.Restaurant}>
	<div className={classes.Image}>
		<img src={ResPic} alt='Res' width='100%' height='100%' />
	</div>
	<div className={classes.detail}>
		<h3>{name.name}</h3>
		{/* <div className={classes.Location}>
							<img src={myLocationIcon} alt='Location' height='12px' />
							<p>{name.address}</p>
						</div> */}
		<span>Burgers, Sandwiches, Desserts</span>
		{/* <span>{name.tags}</span> */}
		{/* <div className={classes.DeliveryRatings}>
							<div className={classes.deliveryTime}>
								<img src={clockIcon} alt='deliveryTime' height='20px' />
								<p>Deliver within {name.deliveryTime} mins</p>
							</div>
							<div className={classes.ratingIcon}>
								<img src={Star} alt='Rating' height='20px' />
								<p>{name.rating}</p>
							</div>
						</div> */}
	</div>
</NavLink>;
