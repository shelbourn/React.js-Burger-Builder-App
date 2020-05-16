import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js'
import PropTypes from 'prop-types'

/***
 * ? STATELESS COMPONENT FOR RENDERING THE BUILT BURGER
 * ? TO THE SCREEN
 */

//* Object.keys() is a built-in method that takes an object
//* and returns an array of the keys in a key/value pair
//* It DOES NOT return the values in the key/value pairs

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

//? transformedIngredients maps the ingredients object into an
//? array of ingredients for each ingredient with the appropriate number of elements
//? according to the number of each ingredient that is ordered
//? 2 cheeses ordered = cheese array has length 2 (2 elements)
//? Basically this allows us to know the object key (what type of ingredient needed)
//? and the object value (how many of each ingredient is needed)

//* .reduce(arg1, arg2) -- arg1 = aggregator, arg2 = current element in array
//* .reduce((a, b) => {...}, []) -- in this case, [] is the initial value
//* can also pass {} as the initial value to aggregate values into an object

const burger = (props) => {
	console.log(props)
	let transformedIngredients = Object.keys(props.ingredients)
		.map((ingredKey) => {
			return [...Array(props.ingredients[ingredKey])].map((_, i) => {
				return <BurgerIngredient key={ingredKey + i} type={ingredKey} />
			})
		})

		//! Concatenates the following element with the previous aggregated elements
		//! in array and reduces them into an empty array (initial value)
		//! This will return an array only for ingredients which don't have
		//! empty arrays based on the above code
		.reduce((arr, el) => {
			return arr.concat(el)
		}, [])

	if (transformedIngredients.length === 0) {
		transformedIngredients = (
			<div>
				<p>Tasty Ingredients Go Here</p>
			</div>
		)
	}

	console.log(transformedIngredients)

	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

//! Prop-Type Validation
burger.propTypes = {
	ingredients: PropTypes.object,
}

export default burger
