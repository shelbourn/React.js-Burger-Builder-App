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
					placeholder: 'Your Name',
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
					placeholder: 'Email Address',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'standard', displayValue: 'USPS First Class' },
						{ value: 'priority', diplayValue: 'USPS Priority' },
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

	render() {
		let form = (
			<form>
				<Input elementType="..." elementConfig="..." value="..." />
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
