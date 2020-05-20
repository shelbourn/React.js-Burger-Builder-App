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
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Address',
				},
				value: '',
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'City',
					placeholder: 'City',
				},
				value: '',
			},
			state: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'State',
				},
				value: '',
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
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
			},
		},
		loading: false,
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
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
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

	//? Using the spread {...} operator does not create a deep clone
	//? meaning that is does not copy nested objects
	//? to create a deep clone you must manually spread the object as many
	//? times as necessary
	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
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
			<form>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						inputtype={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
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
