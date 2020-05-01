import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from '../MenuButton/MenuButton'

const toolbar = (props) => (
	<header className={styles.Toolbar}>
		<MenuButton clicked={props.menuBtnClick}>MENU</MenuButton>
		<div className={styles.Logo}>
			<Logo />
		</div>
		<nav className={styles.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
)

export default toolbar
