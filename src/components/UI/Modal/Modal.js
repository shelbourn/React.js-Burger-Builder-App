import React from 'react'
import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
	<Aux>
		<Backdrop show={props.show} backgroundClicked={props.closeModal} />
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
	</Aux>
)

export default modal
