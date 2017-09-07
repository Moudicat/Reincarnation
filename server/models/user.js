const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  avatar: String,
  createTime: {
    type: Date,
    default: Date.now()
  },
  lastLoginTime: {
    type: Date,
    default: Date.now()
  }
}, {versionKey: false});

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.lastLoginTime = Date.now();
  } else {
    this.createTime = Date.now();
  }
  next();
});

mongoose.model('User', userSchema);
