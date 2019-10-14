const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { id: false })

listSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'list'
})

// listSchema.set('toObject', { virtuals: true });
// listSchema.set('toJSON', { virtuals: true });

const List = mongoose.model('List', listSchema);

module.exports = List;