import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import queryString from 'query-string'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
class Checkout extends Component {
	state = {
		ingredients: {},
		price: 0,
	}

	//* Below: Parses query string, converts ingredient values to numbers,
	//* then updates the state

	componentDidMount() {
		const query = queryString.parse(this.props.location.search)
		console.log(query)
		const parsedIngredients = {}
		const parsedPrice = {}
		for (let i in query) {
			if (i !== 'totalPrice') {
				parsedIngredients[i] = +query[i]
			}
			if (i === 'totalPrice') {
				parsedPrice[i] = +query[i]
			}
		}
		this.setState({ ingredients: parsedIngredients, totalPrice: parsedPrice })
		console.log(parsedIngredients, parsedPrice)
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					// *Manually rendering the ContactData component allows us to pass
					//* props with it.
					render={() => (
						<ContactData
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
						/>
					)}
				/>
			</div>
		)
	}
}

export default Checkout
