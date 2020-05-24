import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
	let inputElement = null
	const inputClasses = [styles.InputElement]

	if (props.invalid && props.shouldValidate && props.userInteracted) {
		inputClasses.push(styles.Invalid)
	}

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
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'select':
			inputElement = (
				<select
					className={styles.InputElement}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			)
			break
		default:
			inputElement = (
				<input
					className={styles.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
	}

	let validationError = null
	if (props.invalid && props.userInteracted) {
		validationError = (
			<p className={styles.ValidationError}>Please enter a valid value!</p>
		)
	}

	return (
		<div className={styles.Input}>
			<label className={styles.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	)
}

export default input
