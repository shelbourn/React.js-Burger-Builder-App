import React from 'react'
import Aux from '../../hoc/Auxiliary'

//% Import all custom components as Pascal case even though in their
//% respective component files their consts are declared in 
//% camelCase

const layout = (props) => (<div>Toolbar, SideDrawer, Backdrop</div>
<main>
{props.children}
</main>
)
