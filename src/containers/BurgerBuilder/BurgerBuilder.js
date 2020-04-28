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
		purchasable: false,
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

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		}

		//! Checks if values in disabledInfo object (copy of ingredients object)
		//! are less than or equal to zero and returns a bool
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchaseable={this.state.purchasable}
				/>
			</Aux>
		)
	}
}

export default BurgerBuilder
