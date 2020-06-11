import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// We can omit the filename in the import below because index.js files are automatically
// chosen if no file is specified
import * as actions from '../../store/actions/index'

/***
 * ? STATEFUL COMPONENT/CONTAINER FOR BURGER BUILDER FUNCTIONALITY
 */

class BurgerBuilder extends Component {
	state = {
		purchaseInProcess: false,
	}

	componentDidMount() {
		console.log(this.props)
		this.props.onInitIngredients()
	}

	//* Handler to return a boolean value which will either enable
	//* or disable the 'Submit Order' button
	//! Can handle the purchaseable property with Redux or with local UI state
	//! as we do here.
	updatePurchaseableHandler(ingredients) {
		const sum = Object.keys(ingredients)
			.map((ingredKey) => {
				return ingredients[ingredKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({ purchaseInProcess: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchaseInProcess: false })
	}

	//! For Firebase only, targetted URLs must end in '.json'
	//* In a production environment, checkout price should be calculated
	//* on the server to ensure that users are not manipulating it
	//* before the http request is submitted

	//? Use this.props.history.push('/checkout') to navigate
	//? to the checkout page when the 'Checkout' button is clicked

	purchaseCheckoutHandler = () => {
		// Handles redirect to home upon successful order
		this.props.onInitPurchase()
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {
			...this.props.ingred,
		}

		//! Checks if values in disabledInfo object (copy of ingredients object)
		//! are less than or equal to zero and returns a bool
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null

		let burger = this.props.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		)

		/***
		 * ! In order for the onIngredientAdded and onIngredientRemoved props
		 * ! to work they must accept the ingredient as an argument
		 * ! Therefore, we need to see what the ingredientAdded and ingredientRemoved
		 * ! props are doing in the BuildControls component.
		 * ! Since the BuildControls uses the exact same names to add and remove ingredients
		 * ! as we use in our Redux state then we can leave it as it. But we could
		 * ! actually pass the Redux state to the BuildControls component to make sure
		 * ! that the names are the same
		 */

		if (this.props.ingred) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingred} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.updatePurchaseableHandler(this.props.ingred)}
						ordered={this.purchaseHandler}
						price={this.props.totPrice}
					/>
				</Aux>
			)

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingred}
					backToOrder={this.purchaseCancelHandler}
					checkout={this.purchaseCheckoutHandler}
					totalPrice={this.props.totPrice}
				/>
			)
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchaseInProcess}
					closeModal={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

// Redux start --->
const mapStateToProps = (state) => {
	return {
		ingred: state.burgerBuilder.ingredients,
		totPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredName) =>
			dispatch(actions.addIngredient(ingredName)),
		onIngredientRemoved: (ingredName) =>
			dispatch(actions.removeIngredient(ingredName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
