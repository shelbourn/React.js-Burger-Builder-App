import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://shelbourn-react-burger-builder.firebaseio.com/',
})

export default instance
