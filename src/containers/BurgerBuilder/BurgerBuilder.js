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
import * as actionTypes from '../../store/actions'

/***
 * ? STATEFUL COMPONENT/CONTAINER FOR BURGER BUILDER FUNCTIONALITY
 */

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchaseInProcess: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		// console.log(this.props)
		// axios
		// 	.get('/ingredients.json')
		// 	.then((response) => {
		// 		this.setState({ ingredients: response.data })
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ error: true })
		// 	})
	}

	//* Handler to return a boolean value which will either enable
	//* or disable the 'Submit Order' button
	updatePurchaseableHandler(ingredients) {
		const sum = Object.keys(ingredients)
			.map((ingredKey) => {
				return ingredients[ingredKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		this.setState({ purchasable: sum > 0 })
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
		//* encodeURIComponent is a built-in JS object that encodes data for URLs
		//* Below we are using encodeURIComponent to extrac the key/value pairs
		//* from the ingredients object and then pushing them to the queryParams array
		//* in a search param format (key=value) and then using .join('&') to add a '&'
		//* delimiter between each of the params
		const queryParams = []

		for (let i in this.props.ingred) {
			queryParams.push(
				encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingred[i])
			)
		}

		queryParams.push('totalPrice=' + this.props.totPrice)

		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		})
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

		let burger = this.state.error ? (
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
						purchaseable={this.state.purchasable}
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

			if (this.state.loading) {
				orderSummary = <Spinner />
			}
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
		ingred: state.ingredients,
		totPrice: state.totalPrice,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredName) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				payload: {
					ingredientName: ingredName,
				},
			}),
		onIngredientRemoved: (ingredName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				payload: {
					ingredientName: ingredName,
				},
			}),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
