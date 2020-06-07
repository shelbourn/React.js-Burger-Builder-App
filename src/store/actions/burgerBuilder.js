// Burger Builder Action Creators
import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: {
			ingredientName: name,
		},
	}
}

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: {
			ingredientName: name,
		},
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		payload: {
			ingredients: ingredients,
		},
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
}

// Async func to get initial ingredients
export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get('/ingredients.json')
			.then((response) => {
				dispatch(setIngredients(response.data))
			})
			.catch((error) => {
				dispatch(fetchIngredientsFailed())
			})
	}
}
