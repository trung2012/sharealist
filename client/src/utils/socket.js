import socketioClient from 'socket.io-client';

const socket = socketioClient('/', { transports: ['websocket'] });

export default socket;