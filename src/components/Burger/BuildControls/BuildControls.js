import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Lettuce', type: 'lettuce' },
]

const buildControls = (props) => (
	<div className={styles.BuildControls}>
		<p> Current Price: {props.price}</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				ingredientLabel={ctrl.label}
				addedIngredient={() => props.ingredientAdded(ctrl.type)}
				removedIngredient={() => props.ingredientRemoved(ctrl.type)}
				isDisabled={props.disabled[ctrl.type]}
			/>
		))}
	</div>
)

export default buildControls
