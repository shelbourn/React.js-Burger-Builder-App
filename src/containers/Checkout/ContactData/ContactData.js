import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

//* elementConfig property stores the default html properties which are then
//* passsed as props to the component
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Address',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'City',
					placeholder: 'City',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
			state: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'State',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
				validation: {
					required: true,
					minZipLength: 5,
					maxZipLength: 5,
				},
				validEntry: false,
				userInteracted: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
				validation: {
					required: true,
					validEmail: '@.',
				},
				validEntry: false,
				userInteracted: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'standard', displayValue: 'USPS First Class' },
						{ value: 'priority', displayValue: 'USPS Priority' },
					],
				},
				value: '',
				validation: {},
				validEntry: true,
			},
		},
		loading: false,
		formIsValid: false,
	}

	//* .preventDefault() prevents the default event action from happening
	//* which for forms is to submit the form via http request and reload
	//* the page
	orderHandler = (event) => {
		event.preventDefault()
		console.log(this.props.totalPrice)

		//? Submitting order to server via http request
		alert('Deliciousness is on its way!')
		this.setState({ loading: true })

		//% Maps the keys in orderForm to the values entered by the user
		//% and then stores the key/value pairs in the formData object
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
		}
		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch((error) => {
				this.setState({ loading: false })
			})
	}

	//? Validating user input
	checkValidation = (value, rules) => {
		let isValid = true

		//* Duplicate functionality of setting 'validation: {}' in state for
		//* deliveryMethod
		//* Since our validation logic checks an element's rules, rules have to
		//* exist for all elements, including deliveryMethod
		if (!rules) {
			return true
		}

		//% Empty input check
		if (rules.required) {
			//* isValid will be truthy if value (after trim) is not equal to an empty string
			isValid = value.trim() !== '' && isValid
		}

		//% Valid email check
		if (rules.validEmail) {
			isValid = value.includes('@') && value.includes('.') && isValid
		}

		//% Valid zip length check
		if (rules.minZipLength) {
			isValid = value.length >= rules.minZipLength && isValid
		}

		if (rules.maxZipLength) {
			isValid = value.length <= rules.maxZipLength && isValid
		}

		return isValid
	}

	//? Using the spread {...} operator does not create a deep clone
	//? meaning that is does not copy nested objects
	//? to create a deep clone you must manually spread the object as many
	//? times as necessary

	//* Creating two-way binding using deeply cloned state objects
	inputChangedHandler = (event, inputIdentifier) => {
		//% Creating a deep clone of state
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

		//% Setting the cloned state value to event value (user input)
		updatedFormElement.value = event.target.value

		//% Setting the validation state prop as true or false based on checkValidation
		updatedFormElement.validEntry = this.checkValidation(
			updatedFormElement.value,
			updatedFormElement.validation
		)

		//% Updating the userInteracted state prop with value of true
		updatedFormElement.userInteracted = true

		//% Updating the cloned state's element value with event value
		updatedOrderForm[inputIdentifier] = updatedFormElement

		//% Checking whether overall form is valid or not
		//% and updating formIsValid state prop if true
		let formIsValidCheck = true
		for (let inputIdentifier in updatedOrderForm) {
			formIsValidCheck =
				updatedOrderForm[inputIdentifier].validEntry && formIsValidCheck
		}

		//* Incremental check to see if everything is working
		console.log(updatedFormElement)

		//% Updating the state with the updated cloned state (with user input)
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValidCheck,
		})
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
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
				))}
				{/* Must use a disabled prop because this is our custom button */}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		)
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={styles.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData
