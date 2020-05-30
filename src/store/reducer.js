// Root Redux reducer
import * as actionTypes from './actions'

initialState = {
	ingredients: {
		bacon: 0,
		cheese: 0,
		meat: 0,
		lettuce: 0,
	},
	totalPrice: 4,
}

/***
 * ? This syntax: [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
 * ? Dynamically sets the reducer to expect an action payload property named ingredientName
 * ? and then (in this case) updates that property's value by adding 1
 */

const reduxReducer = (state = initialState, action) => {
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
			}
		}
		default:
			return state
	}
}

export default reduxReducer
