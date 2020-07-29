import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../Auxiliary/Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(Layout)
