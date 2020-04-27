import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

/***
 * ? STATEFUL COMPONENT/CONTAINER FOR BURGER BUILDER FUNCTIONALITY
 */

class BurgerBuilder extends Component {
	render() {
		return (
			<Aux>
				<Burger />
				<div>Build Controls (Placeholder)</div>
			</Aux>
		)
	}
}

export default BurgerBuilder
