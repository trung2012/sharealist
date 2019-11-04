import socketioClient from 'socket.io-client';

const socket = socketioClient('http://localhost:5000/', { transports: ['websocket'] });

export default socket;