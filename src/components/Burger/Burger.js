import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js'

/***
 * ? STATELESS COMPONENT FOR RENDERING THE BUILT BURGER
 * ? TO THE SCREEN
 */

//* Object.keys() is a built-in method that takes an object
//* and returns an array of the keys in a key/value pair

//% .array() method returns a created array of the argument length
//% Below: [...Array(props.ingredient[ingredKey])] returns a new array
//% (with the spread operator) with a length (number of array elements)
//% of the number of keys (number of cheeses, number of meats, etc) within
//% each ingredient provided by props.ingredient

//! Below: The returned key {ingredKey + i} creates a unique key
//! and it MUST be identical to the keys used for all other burger building
//! components

//* Each <BurgerIngredient> must have a unique key so that it can be
//* individually referenced in other code
const burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients).map(
		(ingredKey) => {
			return [...Array(props.ingredients[ingredKey])].map((_, i) => {
				return <BurgerIngredient key={ingredKey + i} type={ingredKey} />
			})
		}
	)

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

export default burger
