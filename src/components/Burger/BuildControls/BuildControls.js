import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'

const controls = [
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
	return (
		<div className={styles.BuildControls}>
			{controls.map((ctrl) => (
				<BuildControl key={ctrl.label} ingredientLabel={ctrl.label} />
			))}
		</div>
	)
}

export default buildControls
