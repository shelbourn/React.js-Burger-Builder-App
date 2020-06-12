import React from 'react'
import styles from './Order.module.css'

const order = (props) => {
	const ingredients = []

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		})
	}

	const ingredientOutput = ingredients.map((ing) => {
		return (
			<span
				key={ing.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px',
					boxShadow: '0 2px 4px #eee',
					borderRadius: '3px',
				}}
			>
				{ing.name}: <strong>({ing.amount})</strong>
			</span>
		)
	})

	return (
		<div className={styles.Order}>
			<p>Order ID: {props.orderID}</p>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD ${props.price}</strong>{' '}
				{/*Removed ${props.price.toFixed(2)} for now because Order.js doesn't use Redux yet */}
			</p>
		</div>
	)
}

export default order
