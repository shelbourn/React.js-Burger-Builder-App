import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipcode: '',
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
			customer: {
				name: 'Matt Shelbourn',
				address: {
					street: '999 XYZ Ave',
					city: 'Some Place',
					zipcode: '91001',
					state: 'CA',
					country: 'United States',
				},
				email: 'test@test.com',
				deliveryMethod: 'Priority',
			},
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
				<input
					className={styles.Input}
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<input
					className={styles.Input}
					type="email"
					name="email"
					placeholder="Your Email"
				/>
				<input
					className={styles.Input}
					type="text"
					name="street"
					placeholder="Street"
				/>
				<input
					className={styles.Input}
					type="text"
					name="zipcode"
					placeholder="Zip Code"
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
