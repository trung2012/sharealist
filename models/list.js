const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String
  },
  imageUrl: {
    type: String
  },
  note: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: {
    type: [itemSchema]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const List = mongoose.model('List', listSchema);

module.exports = List;