import axios from 'axios'

import * as actionTypes from './actionTypes'

// Sync Action Creators
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	}
}

const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

// Async Action Creators
// % setTimeout expects to get a time in ms and Firebase returns a logout time in seconds.
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

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
				dispatch(authSuccess(response.data.idToken, response.data.localId))
				dispatch(checkAuthTimeout(response.data.expiresIn))
			})
			.catch((error) => {
				console.log(error.response.data.error)
				dispatch(authFail(error.response.data.error))
			})
	}
}
