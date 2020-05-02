import React, { Component } from 'react'
import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show
	}

	componentWillUpdate() {
		console.log('[Modal] WillUpdate')
	}

	render() {
		return (
			<Aux>
				<Backdrop
					show={this.props.show}
					backgroundClicked={this.props.closeModal}
				/>
				<div
					className={styles.Modal}
					style={{
						transform: this.props.show
							? 'translateY(0) scale(1.0, 1.0)'
							: 'translateY(-100vh) scale(0, 0)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		)
	}
}

export default Modal
