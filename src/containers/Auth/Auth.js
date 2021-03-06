import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'
import * as actions from '../../store/actions/index'

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
					validEmail: true,
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
					minPassLength: 6,
				},
				validEntry: false,
				userInteracted: false,
			},
		},
		userSignUp: true,
	}

	checkValidation = (value, rules) => {
		let isValid = true

		if (!rules) {
			return true
		}

		if (rules.required) {
			//* isValid will be truthy if value (after trim) is not equal to an empty string
			isValid = value.trim() !== '' && isValid
		}

		if (rules.validEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
			isValid = pattern.test(value) && isValid
		}

		if (rules.minZipLength) {
			isValid = value.length >= rules.minZipLength && isValid
		}

		if (rules.maxZipLength) {
			isValid = value.length <= rules.maxZipLength && isValid
		}

		if (rules.zipIsNumeric) {
			const pattern = /^\d+$/
			isValid = pattern.test(value) && isValid
		}

		if (rules.minPassLength) {
			isValid = value.length >= rules.minPassLength && isValid
		}

		return isValid
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				validEntry: this.checkValidation(
					event.target.value,
					this.state.controls[controlName].validation
				),
				userInteracted: true,
			},
		}
		this.setState({ controls: updatedControls })
	}

	// Submitting a form reloads the page by default
	//! Must specify this.state.controls.email/password.value for Axios to work properly
	submitHandler = (event) => {
		event.preventDefault()
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.userSignUp
		)
	}

	// Switches the values of userSignUp
	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { userSignUp: !prevState.userSignUp }
		})
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
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">
						{!this.state.userSignUp ? 'SIGN IN' : 'SIGN UP'}
					</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.userSignUp ? 'SIGN IN' : 'SIGN UP'}
				</Button>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, userSignUp) =>
			dispatch(actions.auth(email, password, userSignUp)),
	}
}

export default connect(null, mapDispatchToProps)(Auth)
