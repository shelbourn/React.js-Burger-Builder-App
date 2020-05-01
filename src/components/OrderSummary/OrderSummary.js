import React from 'react'
import Aux from '../../hoc/Auxiliary'
import Button from '../UI/Button/Button'

//! With functional components, you only need to use {} if
//! the component needs to also execute code in addion to returning
//! JSX. If only JSX is needed, then you can just use ()

//* For in-line CSS styling in CSS you must wrap the style in double {{}}
//* One set for dynamic JS context in JSX, and the other for JS CSS referencing

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map((ingredKey) => {
		return (
			<li key={ingredKey}>
				<span style={{ textTransform: 'capitalize' }}>{ingredKey}</span>:{' '}
				{props.ingredients[ingredKey]}
			</li>
		)
	})
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
					<p>Order Total: ${props.totalPrice.toFixed(2)}</p>
				</strong>
			</article>
			<p>Checkout now or continue ordering?</p>
			<Button btnType="Danger" clicked={props.backToOrder}>
				BACK TO ORDER
			</Button>
			<Button btnType="Success" clicked={props.checkout}>
				CHECKOUT
			</Button>
		</Aux>
	)
}

export default orderSummary
