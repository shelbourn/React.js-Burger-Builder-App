import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

//! With functional components, you only need to use {} if
//! the component needs to also execute code in addion to returning
//! JSX. If only JSX is needed, then you can just use ()

//* For in-line CSS styling in CSS you must wrap the style in double {{}}
//* One set for dynamic JS context in JSX, and the other for JS CSS referencing

class OrderSummary extends Component {
	componentDidUpdate() {
		console.log('[OrderSummary] DidUpdate')
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			(ingredKey) => {
				return (
					<li key={ingredKey}>
						<span style={{ textTransform: 'capitalize' }}>{ingredKey}</span>:{' '}
						{this.props.ingredients[ingredKey]}
					</li>
				)
			}
		)

		return (
			<Aux>
				<h1>Your Order</h1>
				<article>
					<p>Here's a summary of your delicious burger:</p>
					<strong>
						<ul
							style={{
								listStyleType: 'none',
								padding: 0,
								margin: 0,
								color: '#cf8f2e',
							}}
						>
							{ingredientSummary}
						</ul>
					</strong>
					<strong>
						<p>Order Total: ${this.props.totalPrice.toFixed(2)}</p>
					</strong>
				</article>
				<p>Checkout now or continue ordering?</p>
				<Button btnType="Danger" clicked={this.props.backToOrder}>
					GO BACK
				</Button>
				<Button btnType="Success" clicked={this.props.checkout}>
					CHECKOUT
				</Button>
			</Aux>
		)
	}
}

export default OrderSummary
