import React from 'react'
import Aux from '../../hoc/Auxiliary'
import styles from './Layout.module.css'

/***
 * ? STATELESS WRAPPER COMPONENT FOR MAIN LAYOUT
 */

const layout = (props) => (
	<Aux>
		<div>Toolbar, SideDrawer, Backdrop (Placeholder)</div>
		<main className={styles.Content}>{props.children}</main>
	</Aux>
)

export default layout
