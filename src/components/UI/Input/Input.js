import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
	let inputElement = null

	//* Passing {...props.elementConfig} to each of the cases below passes the normal html
	//* properties to the custom JS/React component
	//* eg <input type="text" name="name" ...>
	//* {...props.elementConfig} will pass on type="text" and name="name"
	//? All of the default html element properties are being stored in state in the
	//? "../../../containers/Checkout/ContactData/ContactData.js" file as
	//? elementConfig

	switch (props.inputtype) {
		case 'input':
			inputElement = (
				<input
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			)
			break
		default:
			inputElement = (
				<input
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
				/>
			)
	}

	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default input
