import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

//? Components in the 'components' folder are 'dumb' or stateless components
//* Components in the 'containers' folder are 'smart' or stateful components

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</div>
		)
	}
}
export default App
