import React from 'react'
import Aux from '../../hoc/Auxiliary'

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
			<h3>Your Order</h3>
			<article>
				Here's a summary of your delicious burger:
				<ul>{ingredientSummary}</ul>
			</article>
			<p>Checkout Now?</p>
		</Aux>
	)
}

export default orderSummary
