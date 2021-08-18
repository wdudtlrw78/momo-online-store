const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    maxlength: 30,
  },

  email: {
    type: String,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    minlength: 5,
  },

  role: {
    type: Number,
    default: 0,
  },

  cart: {
    type: Array,
    default: [],
  },

  history: {
    type: Array,
    default: [],
  },

  image: String,

  token: {
    type: String,
  },

  tokenExp: {
    type: Number,
  },
});

userSchema.methods.checkEmail = function (email, callback) {
  User.findOne({ email: email }, function (err, user) {
    console.log(user);
    callback(err, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
