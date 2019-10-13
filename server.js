const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routers/api/user');
const listRouter = require('./routers/api/list');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/lists', listRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));