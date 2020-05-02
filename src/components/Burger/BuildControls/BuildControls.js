import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'
import PropTypes from 'prop-types'

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Lettuce', type: 'lettuce' },
]

//% .toFixed(integer) converts a floating point decimal to a fixed scale
//% that is user-defined

const buildControls = (props) => (
	<div className={styles.BuildControls}>
		<p>
			{' '}
			Current Price: <strong>${props.price.toFixed(2)}</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				ingredientLabel={ctrl.label}
				addedIngredient={() => props.ingredientAdded(ctrl.type)}
				removedIngredient={() => props.ingredientRemoved(ctrl.type)}
				isDisabled={props.disabled[ctrl.type]}
			/>
		))}
		<button
			className={styles.OrderButton}
			disabled={!props.purchaseable}
			onClick={props.ordered}
		>
			SUBMIT ORDER
		</button>
	</div>
)

//! Prop-Type Validation
buildControls.propTypes = {
	price: PropTypes.number,
	ingredientAdded: PropTypes.func,
	ingredientRemoved: PropTypes.func,
	disabled: PropTypes.object,
	purchaseable: PropTypes.bool,
	ordered: PropTypes.func,
}

export default buildControls
