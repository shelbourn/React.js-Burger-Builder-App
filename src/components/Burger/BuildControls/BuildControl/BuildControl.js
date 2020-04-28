import React from 'react'
import styles from './BuildControl.module.css'

/***
 * ? STATELESS FUNCTIONAL COMPONENT.
 * ? REUSABLE COMPONENT FOR ADDING A SET OF BUILD CONTROL BUTTONS
 * ? FOR EACH INGREDIENT
 */

const buildControl = (props) => {
	return (
		<div className={styles.BuildControl}>
			<div className={styles.Label}>{props.ingredientLabel}</div>
			<button className={styles.Less} onClick={props.removedIngredient}>
				Less
			</button>
			<button className={styles.More} onClick={props.addedIngredient}>
				More
			</button>
		</div>
	)
}

export default buildControl
