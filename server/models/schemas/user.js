const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  avatar: String,
  createTime: String,
  lastLoginTime: String
});
