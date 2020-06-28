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
export const auth = (email, password, userSignUp) => {
	return (dispatch) => {
		// authData will be converted to JSON automatically by axios
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		}
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQ3O6w3AcxZON5y4F7XKsU11l8zdjgKkE'
		if (!userSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQ3O6w3AcxZON5y4F7XKsU11l8zdjgKkE'
		}
		//! dispatch must be called after authData is initialized or Axios will break
		dispatch(authStart())
		console.log(email, password)
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response)
				dispatch(authSuccess(response.data))
			})
			.catch((error) => {
				console.log(error)
				dispatch(authFail(error))
			})
	}
}
