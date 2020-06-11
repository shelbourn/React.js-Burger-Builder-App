import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'
class Checkout extends Component {
	// Handles redirection to home upon successful order
	componentDidMount() {
		this.props.onInitPurchase()
	}

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

const mapDispatchToProps = (dispatch) => {
	return {
		onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
