import React from 'react'
import styles from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'

//? You can set the 'exact' property for routes using props also

const navigationItem = (props) => (
	<li className={styles.NavigationItem}>
		<NavLink
			exact={props.exactProp}
			to={props.link}
			activeClassName={styles.active}
		>
			{props.children}
		</NavLink>
	</li>
)

export default navigationItem
