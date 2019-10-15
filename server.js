const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routers/api/user');
const listRouter = require('./routers/api/list');
const List = require('./models/List');
const Item = require('./models/Item');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/lists', listRouter);

const io = socketIo(server);

io.on('connection', socket => {
  console.log('User Connected')

  socket.on('initial_data', async (listId) => {
    try {
      const existingList = await List.findById(listId.toString());
      await existingList.populate('items').execPopulate();

      socket.emit('get_data', { list: existingList })

    } catch (err) {
      socket.emit('error', { message: 'Something went wrong with our server' });
    }
  })

  socket.on('add_item', async ({ listId, item }) => {
    try {
      const newItem = new Item({ ...item, list: listId });
      await newItem.save();

      io.sockets.emit('data_changed');
    } catch (err) {
      socket.emit('error', { message: 'Something went wrong with our server' });
    }
  })

  socket.on('delete_item', async (_id) => {
    try {
      const deleted = await Item.findByIdAndDelete(_id);

      io.sockets.emit('data_changed');
    } catch (err) {
      socket.emit('error', { message: 'Something went wrong with our server' });
    }
  })

  socket.on('edit_item', async ({ name, quantity, note, _id }) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(_id, { $set: { name, quantity, note } }, { new: true })

      io.sockets.emit('data_changed');

    } catch (err) {
      socket.emit('error', { message: 'Something went wrong with our server' });
    }
  })

  socket.on('set_completed', async _id => {
    try {
      const item = await Item.findById(_id);
      item.completed = !item.completed;
      await item.save();
      io.sockets.emit('data_changed');
    } catch (err) {
      socket.emit('error', { message: 'Something went wrong with our server' });
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));