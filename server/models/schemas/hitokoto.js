/**
 * Created by Moudi on 2017/5/10.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  content: String,
  date: String
}, {versionKey: false});