import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
	//* Retrieving Orders from the server
	//* Takes server response data, loops through the objects,
	//* then pushes the data and order key id into its own object
	//* within the 'order' array in state
	componentDidMount() {
		this.props.onFetchOrders()
	}

	render() {
		let orders = <Spinner />
		if (!this.props.loading) {
			orders = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price.toFixed(2)}
					orderID={order.id}
				/>
			))
		}
		return <div> {orders}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios))
