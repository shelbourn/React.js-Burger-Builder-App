import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

//* When passing props that only hold boolean values
//* you do not need to pass active(props name)={true}
//* you only need to pass 'active(props name)'

const navigationItems = (props) => (
	<ul className={styles.NavigationItems}>
		<NavigationItem link="/" active>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/">Checkout</NavigationItem>
	</ul>
)

export default navigationItems
