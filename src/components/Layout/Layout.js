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
		showSideDrawer: false,
	}

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false,
		})
	}

	//! Always use this method to setState based on old/current state
	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }
		})
	}

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
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
