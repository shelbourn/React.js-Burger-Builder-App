import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
	let inputElement = null

	//* Passing {...props} to each of the cases below passes the normal html
	//* properties to the custom JS/React component
	//* eg <input type="text" name="name" ...>
	//* {...props} will pass on type="text" and name="name"

	switch (props.inputType) {
		case 'input':
			inputElement = <input className={styles.InputElement} {...props} />
			break
		case 'textarea':
			inputElement = <textarea className={styles.InputElement} {...props} />
			break
		default:
			inputElement = <input className={styles.InputElement} {...props} />
	}

	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default input
