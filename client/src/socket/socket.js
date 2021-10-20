import io from 'socket.io-client'

let socket = io("https://olea-deploy.herokuapp.com/");

export default socket;