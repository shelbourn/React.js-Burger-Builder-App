import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

//* When passing props that only hold boolean values
//* you do not need to pass active(props name)={true}
//* you only need to pass 'active(props name)'

//% <a href="/"></a> goes to root of application

const navigationItems = (props) => (
	<ul className={styles.NavigationItems}>
		<NavigationItem link="/" exactProp={true}>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
		<NavigationItem link="/auth">Login</NavigationItem>
	</ul>
)

export default navigationItems
