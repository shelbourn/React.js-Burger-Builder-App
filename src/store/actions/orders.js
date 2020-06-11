import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// Sync action creators
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload: {
			orderId: id,
			orderData: orderData,
		},
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		payload: {
			error: error,
		},
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	}
}

// async action creators
export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart())
		axios
			.post('/orders.json', orderData)
			.then((response) => {
				console.log(response.data)
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error))
			})
	}
}

// Action creator for redirection upon successful order
export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	}
}
