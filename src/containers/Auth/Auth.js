import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				validEntry: false,
				userInteracted: false,
			},

			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 8,
				},
				validEntry: false,
				userInteracted: false,
			},
		},
	}

	render() {
		// Converting state to array and pushing state obj elements to it
		const formElementsArray = []
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			})
		}

		const form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				inputtype={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				invalid={!formElement.config.validEntry}
				shouldValidate={formElement.config.validation}
				userInteracted={formElement.config.userInteracted}
			/>
		))

		return (
			<div className={styles.Auth}>
				<form>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
			</div>
		)
	}
}

export default Auth
