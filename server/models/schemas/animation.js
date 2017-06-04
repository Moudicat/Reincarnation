/**
 * Created by Moudi on 2017/6/4.
 */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    unique: true
  },
  episode: String,
  date: String,
  isDone: String,
  comment: String
}, {versionKey: false});