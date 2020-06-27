import React, { Component } from 'react'

class Auth extends Component {
	state = {
		controls: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				validEntry: false,
				userInteracted: false,
			},
		},
	}

	render() {
		return (
			<div>
				<form></form>
			</div>
		)
	}
}

export default Auth
