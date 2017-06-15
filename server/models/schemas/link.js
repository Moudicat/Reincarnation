const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  owner: String,
  address: String,
  description: String,
  avatar: String,
  date: String
}, {versionKey: false});
