import axios from 'axios'

import * as actionTypes from './actionTypes'

// Sync Action Creators
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

// Async Action Creators
export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart())
		// authData will be converted to JSON automatically by axios
		const authData = {
			email: test,
			password: password,
			returnSecureToken: true,
		}
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQ3O6w3AcxZON5y4F7XKsU11l8zdjgKkE',
				authData
			)
			.then((response) => {
				console.log(response)
				dispatch(authSuccess(response.data))
			})
			.catch((err) => {
				console.log(err)
				dispatch(authFail(err))
			})
	}
}
