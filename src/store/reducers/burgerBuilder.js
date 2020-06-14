// Root Redux reducer
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
import { act } from 'react-dom/test-utils'

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

// Separating reducer case logic from switch statement into separate function
//? Makes seeing what case our reducer handles very clear

const addIngredient = (state, action) => {
	const updatedIngredient = {
		[action.payload.ingredientName]:
			state.ingredients[action.payload.ingredientName] + 1,
	}
	// Invoking function from utility.js
	// Making code leaner using utility function
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice:
			state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
	}
	return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
	// Original code not using the utility function
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

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			lettuce: action.payload.ingredients.lettuce,
			bacon: action.payload.ingredients.bacon,
			cheese: action.payload.ingredients.cheese,
			meat: action.payload.ingredients.meat,
		},

		totalPrice: 4,
		error: false,
	})
}

const fetchIngredientsFailed = (state) => {
	return updateObject(state, { error: true })
}

const burgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action)

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action)

		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action)

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state)

		default:
			return state
	}
}

export default burgerBuilderReducer
