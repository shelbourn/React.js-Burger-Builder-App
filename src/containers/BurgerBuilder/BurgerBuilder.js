import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
		ingredients: {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
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
	}

	removeIngredientHandler = (type) => {}

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls ingredientAdded={this.addIngredientHandler} />
			</Aux>
		)
	}
}

export default BurgerBuilder
