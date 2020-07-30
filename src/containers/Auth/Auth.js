import React, { Component } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'
import { Redirect } from 'react-router-dom'

// import withResponseHandler from '../../hoc/withResponseHandler/withResponseHandler'
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
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

		let form = formElementsArray.map((formElement) => (
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

		if (this.props.loading) {
			form = <Spinner />
		}

		// Fina a was to show a modal with the error.
		// This is a temporary solution
		let errorMessage = null
		if (this.props.error) {
			switch (this.props.error.message) {
				case 'EMAIL_EXISTS':
					errorMessage = 'This email address already exists. Try signing in.'
					break

				case 'TOO_MANY_ATTEMPTS_TRY_LATER':
					errorMessage =
						'There have been too many attempts to login. Please try again later.'
					break

				case 'EMAIL_NOT_FOUND':
					errorMessage =
						'This email was not found. Please sign up for an account.'
					break

				case 'INVALID_PASSWORD':
					errorMessage =
						'The password you entered is incorrect. Please try again.'
					break

				case 'USER_DISABLED':
					errorMessage =
						'Sorry, but your account has been disabled by the administrator. Please contact us for more information.'
					break

				default:
					errorMessage = this.props.error.message
					break
			}
		}

		// if (this.props.error) {
		// 	errorMessage = <p>{this.props.error.message}</p>
		// }

		let authRedirect = null
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/" />
		}

		return (
			<div className={styles.Auth}>
				{authRedirect}
				<div className={styles.Error}>{errorMessage}</div>
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

const mapStateToProps = (state) => {
	return {
		// Must access auth reducer for the loading prop
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, userSignUp) =>
			dispatch(actions.auth(email, password, userSignUp)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
