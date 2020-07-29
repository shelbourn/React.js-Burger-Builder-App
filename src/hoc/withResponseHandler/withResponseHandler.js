import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withResponseHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			response: this.props.response,
			error: this.props.error,
		}

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error || this.state.response}
						closeModal={this.dismissErrorHandler}
					>
						{/* The modal is always present even if it is not displayed
            so we must only return the error.message if an error has been thrown
            which is what the below code does. */}
						{this.state.error ? this.state.error : null}
						{this.state.response ? this.state.response : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return { response: state.auth.response, error: state.auth.error }
}

export default connect(mapStateToProps)(withResponseHandler)
