// Root Redux reducer
import * as actionTypes from '../actions/actionTypes'

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
}

// Use async to get these from server or database in future
const INGREDIENT_PRICES = {
	lettuce: 0.5,
	cheese: 0.75,
	meat: 1.75,
	bacon: 1.0,
}

/***
 * ? This syntax: [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
 * ? Dynamically sets the reducer to expect an action payload property named ingredientName
 * ? and then (in this case) updates that property's value by adding 1
 */

/***
 * * In the action types below, you can set up a new action for the total price
 * * update, but using one action to update both ingredient quantity and price
 * * uses less code. Also, since adding and removing ingredients are the only actions
 * * that control price so it makes sense.
 */

const burgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: {
			return {
				...state,
				ingredients: {
					//* Two-level-deep immutable state update
					...state.ingredients,
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] + 1,
				},
				totalPrice:
					state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
			}
		}
		case actionTypes.REMOVE_INGREDIENT: {
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.payload.ingredientName]:
						state.ingredients[action.payload.ingredientName] - 1,
				},
				totalPrice:
					state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
			}
		}
		default:
			return state
	}
}

export default burgerBuilderReducer
