const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const cloudinary = require('cloudinary');
require('./db/mongoose');
const List = require('./models/List');
const Item = require('./models/Item');
const Image = require('./models/Image');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = socketIo(server);
const userRouter = require('./routers/api/user');
const listRouter = require('./routers/api/list')(io);

app.use('/api/users', userRouter);
app.use('/api/lists', listRouter);

io.on('connection', socket => {
  console.log('User Connected');

  socket.on('initial_data', async (listId) => {
    try {
      const existingList = await List.findById(listId.toString());
      await existingList
        .populate('items')
        .populate('images')
        .execPopulate();

      socket.emit('get_data', { list: existingList })

    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('add_item', async ({ listId, item }) => {
    try {
      const newItem = new Item({ ...item, list: listId });
      await newItem.save();

      io.sockets.emit('data_changed');
    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('delete_item', async (_id) => {
    try {
      const deleted = await Item.findByIdAndDelete(_id);
      if (deleted) {
        io.sockets.emit('data_changed');
      }
    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('edit_item', async ({ name, quantity, note, _id }) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(_id, { $set: { name, quantity, note } }, { new: true })
      if (updatedItem) {
        io.sockets.emit('data_changed');
      }

    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('set_completed', async _id => {
    try {
      const item = await Item.findById(_id);
      item.completed = !item.completed;
      await item.save();
      io.sockets.emit('data_changed');
    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('delete_image', async _id => {
    try {
      const image = await Image.findById(_id);

      await cloudinary.v2.uploader.destroy(image.public_id);
      await image.remove();

      io.sockets.emit('data_changed');

    } catch (err) {
      socket.emit('new error', { message: 'Something went wrong with our server' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if ((req.get('X-Forwarded-Proto') !== 'https')) {
      res.redirect('https://' + req.get('Host') + req.url);
    } else
      next();
  });

  app.use('static', express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));