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

	sideDrawerOpenHandler = () => {
		this.setState({
			showSideDrawer: true,
		})
	}

	render() {
		return (
			<Aux>
				<Toolbar menuBtnClick={this.sideDrawerOpenHandler} />
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
