import React from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js'

/***
 * ? STATELESS COMPONENT FOR RENDERING THE BUILT BURGER
 * ? TO THE SCREEN
 */

const burger = (props) => {
	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			<BurgerIngredient type="lettuce" />
			<BurgerIngredient type="cheese" />
			<BurgerIngredient type="meat" />
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

export default burger
