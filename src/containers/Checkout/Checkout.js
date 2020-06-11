import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		let summary = <Redirect to="/" />
		if (this.props.ingred) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ingred}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData}
					/>
				</div>
			)
		}
		return summary
	}
}

const mapStateToProps = (state) => {
	return {
		ingred: state.burgerBuilder.ingredients,
		totPrice: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased,
	}
}

export default connect(mapStateToProps)(Checkout)
