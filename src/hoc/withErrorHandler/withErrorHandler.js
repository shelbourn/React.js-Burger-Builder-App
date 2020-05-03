import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		}

		componentWillMount() {
			//? Must return the request for use elsewhere
			axios.interceptors.request.use((req) => {
				this.setState({ error: null })
				return req
			})

			//* Errors returned by Firebase will be objects with a 'message' property

			//? res => res (short syntax for returning the reponse to be used elsewhere)
			axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ error: error })
					console.log(error)
				}
			)
		}

		dismissErrorHandler = () => {
			this.setState({ error: null })
		}

		render() {
			return (
				<Aux>
					<Modal show={this.state.error} closeModal={this.dismissErrorHandler}>
						{/* The modal is always present even if it is not displayed
            so we must only return the error.message if an error has been thrown
            which is what the below code does. */}
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			)
		}
	}
}

export default withErrorHandler
