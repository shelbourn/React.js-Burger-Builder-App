import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
// import { render } from '@testing-library/react'

//* When passing props that only hold boolean values
//* you do not need to pass active(props name)={true}
//* you only need to pass 'active(props name)'

//% <a href="/"></a> goes to root of application

const navigationItems = (props) => {
	const isSignedIn = () => {
		if (props.isAuthenticated) {
			return <NavigationItem link="/logout">Sign Out</NavigationItem>
		}
		return <NavigationItem link="/login">Sign Up / Sign In</NavigationItem>
	}

	return (
		<ul className={styles.NavigationItems}>
			<NavigationItem link="/" exactProp={true}>
				Burger Builder
			</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem link="/orders">Orders</NavigationItem>
			) : null}
			{isSignedIn()}
		</ul>
	)
}

export default navigationItems
