import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Switch, Route } from 'react-router'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

//? Components in the 'components' folder are 'dumb' or stateless components
//* Components in the 'containers' folder are 'smart' or stateful components

//% React Router does pass Route props (eg match, location, search, etc)
//% to nested components. They are only passed to the component listed
//% in the direct route.
//% Below: BurgerBuilder will get Route props, but nested components
//% (Burger, etc) will not get them

//* You are able to pass Route props to a nested component by importing
//* {withRouter} from 'react-router-dom' and then wrapping the default export with it
//* (eg. export default withRouter(burger))

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/auth" component={Auth} />
						<Route exact path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		)
	}
}
export default App
