import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import queryString from 'query-string'
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
class Checkout extends Component {
	state = {
		ingredients: {
			lettuce: 1,
			meat: 1,
			cheese: 1,
			bacon: 1,
		},
	}

  //* Below: Parses query string, converts ingredient values to numbers,
  //* then updates the state
  
	componentDidMount() {
		const query = queryString.parse(this.props.location.search)
		console.log(query)
		const parsedIngredients = {}
		for (let i in query) {
			parsedIngredients[i] = +query[i]
		}
		console.log(parsedIngredients)
		this.setState({ ingredients: parsedIngredients })
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
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
			</div>
		)
	}
}

export default Checkout
