import React from 'react'

const drawerToggle = (props) => (
	<button onClick={props.clicked}>{props.children}</button>
)

export default drawerToggle
