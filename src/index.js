import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import reduxReducer from './store/reducer'

const reduxStore = createStore(reduxReducer)

//* Can change the <App /> element below to another component that you
//* want to be the root component
ReactDOM.render(
	<React.StrictMode>
		{/* <Provider> should wrap all other components */}
		<Provider store={reduxStore}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
