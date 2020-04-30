import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

/***
 * ? STATEFUL WRAPPER COMPONENT FOR MAIN LAYOUT
 */

class Layout extends Component {
	state = {
		showSideDrawer: true,
	}

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false,
		})
	}

	render() {
		return (
			<Aux>
				<Toolbar />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		)
	}
}

export default Layout
