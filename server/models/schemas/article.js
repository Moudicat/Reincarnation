/**
 * Created by Moudi on 2017/5/4.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title: String,
  author: String,
  postTime: String,
  modifiedTime: String,
  status: String,
  description: String,
  banner: String,
  content: String
}, {versionKey: false});
