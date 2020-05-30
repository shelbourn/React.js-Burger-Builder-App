import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
class Checkout extends Component {
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
					ingredients={this.props.ingred}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					// *Manually rendering the ContactData component allows us to pass
					//* props with it.
					//?Adding props as an argument and then spreading it in the ContactData
					//? component passes on any props in the Checkout component to the
					//? ContactData component
					render={(props) => (
						<ContactData
							ingredients={this.props.ingred}
							totalPrice={this.props.totPrice}
							{...props}
						/>
					)}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ingred: state.ingredients,
		totPrice: state.totalPrice,
	}
}

export default connect(mapStateToProps)(Checkout)
