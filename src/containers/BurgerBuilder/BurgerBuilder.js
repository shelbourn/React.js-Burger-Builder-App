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
		// alert('Deliciousness is on its way!')
		// this.setState({ loading: true })
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Matt Shelbourn',
		// 		address: {
		// 			street: '999 XYZ Ave',
		// 			city: 'Some Place',
		// 			zipcode: '91001',
		// 			state: 'CA',
		// 			country: 'United States',
		// 		},
		// 		email: 'test@test.com',
		// 		deliveryMethod: 'Priority',
		// 	},
		// }
		// axios
		// 	.post('/orders.json', order)
		// 	.then((response) => {
		// 		this.setState({ loading: false, purchaseInProcess: false })
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: false, purchaseInProcess: false })
		// 	})
		this.props.history.push('/checkout')
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
