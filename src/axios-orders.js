import axios from 'axios'

//? Instance for default URL (API endpoint)

const instance = axios.create({
	baseURL: 'https://shelbourn-react-burger-builder.firebaseio.com',
})

export default instance
