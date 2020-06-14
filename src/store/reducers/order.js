import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

// Leaning code using utility.js function
const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return updateObject(state, { purchase: false })
		case actionTypes.PURCHASE_BURGER_START: {
			return updateObject(state, { loading: true })
		}

		case actionTypes.PURCHASE_BURGER_SUCCESS: {
			const newOrder = {
				...action.payload.orderData,
				id: action.payload.orderId,
			}
			return updateObject(state, {
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder),
			})
		}
		case actionTypes.PURCHASE_BURGER_FAIL: {
			return updateObject(state, { loading: false })
		}
		case actionTypes.FETCH_ORDERS_START: {
			return updateObject(state, { loading: true })
		}
		case actionTypes.FETCH_ORDERS_SUCCESS: {
			return updateObject(state, {
				orders: action.payload.orders,
				loading: false,
			})
		}
		case actionTypes.FETCH_ORDERS_FAIL:
			return updateObject(state, { loading: false })

		default:
			return state
	}
}

export default orderReducer
