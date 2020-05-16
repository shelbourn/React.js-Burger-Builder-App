import React, { Component } from 'react'
import axios from '../../axios-orders'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

/***
 * ? STATEFUL COMPONENT/CONTAINER FOR BURGER BUILDER FUNCTIONALITY
 */

const INGREDIENT_PRICES = {
	lettuce: 0.5,
	cheese: 0.75,
	meat: 1.75,
	bacon: 1.0,
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchaseInProcess: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		console.log(this.props)
		axios
			.get('/ingredients.json')
			.then((response) => {
				this.setState({ ingredients: response.data })
			})
			.catch((error) => {
				this.setState({ error: true })
			})
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

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		const updatedCount = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseableHandler(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		//* EXITS HANDLER: Prevents returning an array with negative ingredients
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseableHandler(updatedIngredients)
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

		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i])
			)
		}

		queryParams.push('totalPrice=' + this.state.totalPrice)

		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients,
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

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchaseable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
			)

			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					backToOrder={this.purchaseCancelHandler}
					checkout={this.purchaseCheckoutHandler}
					totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)
