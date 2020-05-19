import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
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
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
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
					type: 'text',
					placeholder: 'Email',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Delivery Method',
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
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="Your Name"
					label="Name"
				/>
				<Input
					inputtype="input"
					type="email"
					name="email"
					placeholder="Your Email"
					label="Email"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="Street"
					label="Address"
				/>
				<Input
					inputtype="input"
					type="text"
					name="zipcode"
					placeholder="Zip Code"
					label="Zip Code"
				/>
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
