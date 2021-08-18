const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

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

userSchema.pre('save', function (next) {
  let user = this;

  // 비밀번호만 변환될 때에만 bcrypt 암호화 해준다.
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  console.log('user', user);

  // jsonwebtoken을 이용해서 token 생성
  // user._id + 'secret' = token
  const token = jwt.sign(user._id.toHexString(), 'secret');
  const aYear = moment().add(1, 'year').valueOf();

  user.tokenExp = aYear;
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
