import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../components/Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'

const toolbar = (props) => (
	<header className={styles.Toolbar}>
		<div>MENU</div>
		<Logo />
		<nav>
			<NavigationItems />
		</nav>
	</header>
)

export default toolbar
