import React from 'react'
import Aux from '../../hoc/Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar'

/***
 * ? STATELESS WRAPPER COMPONENT FOR MAIN LAYOUT
 */

const layout = (props) => (
	<Aux>
		<Toolbar />
		<main className={styles.Content}>{props.children}</main>
	</Aux>
)

export default layout
