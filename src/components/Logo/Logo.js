import React from 'react'
import burgerLogo from '../../assets/images/bb-logo.png'
import styles from './Logo.module.css'

//! 'src={burgerLogo}' dynamically references the 'string' path to the
//! bb-logo.png file. This is necessary because once the
//! app is built for prod the file tree will be different
//! {burgerLogo} holds a relative path that will be preserved during
//! the prod build

const logo = (props) => (
	<div className={styles.Logo}>
		<img src={burgerLogo} alt="React Burger Builder Logo" />
	</div>
)

export default logo
