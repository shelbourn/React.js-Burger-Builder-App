import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Switch, Route } from 'react-router'

//? Components in the 'components' folder are 'dumb' or stateless components
//* Components in the 'containers' folder are 'smart' or stateful components

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route exact path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		)
	}
}
export default App
