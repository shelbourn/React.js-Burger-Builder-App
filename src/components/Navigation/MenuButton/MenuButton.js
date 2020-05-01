import React from 'react'

const menuButton = (props) => (
	<button onClick={props.clicked}>{props.children}</button>
)

export default menuButton
