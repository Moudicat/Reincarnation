/**
 * Created by Moudi on 2017/5/25.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  status: Array,
  date: String
}, {versionKey: false});