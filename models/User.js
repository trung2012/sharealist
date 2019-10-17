const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
  }
}, { id: false })

userSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.toJSON = function () {
  const { _id, name } = this;

  return { _id, name }
}

const User = mongoose.model('User', userSchema);

module.exports = User;