import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

/***
 * ? STATEFUL COMPONENT/CONTAINER FOR BURGER BUILDER FUNCTIONALITY
 */

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			lettuce: 1,
			bacon: 1,
			cheese: 2,
			meat: 2,
		},
	}

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<div>Build Controls (Placeholder)</div>
			</Aux>
		)
	}
}

export default BurgerBuilder
