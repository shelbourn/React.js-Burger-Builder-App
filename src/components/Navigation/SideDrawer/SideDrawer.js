import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'
import styles from './SideDrawer.module.css'

//? 'show' is a prop of <Backdrop /> that store a bool so no
//? other values need to be passed. 'show' by itself holds a truthy value

const sideDrawer = (props) => {
	let attachedClasses = [styles.SideDrawer, styles.Close]
	if (props.open) {
		attachedClasses = [styles.SideDrawer, styles.Open]
	}

	return (
		<Aux>
			<Backdrop show={props.open} backgroundClicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	)
}

export default sideDrawer
