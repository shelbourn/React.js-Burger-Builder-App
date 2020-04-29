import React from 'react'
import styles from './Modal.module.css'

const modal = (props) => (
	<div
		className={styles.Modal}
		style={{
			transform: props.show
				? 'translateY(0) scale(1.0, 1.0)'
				: 'translateY(-100vh) scale(0, 0)',
			opacity: props.show ? '1' : '0',
		}}
	>
		{props.children}
	</div>
)

export default modal
