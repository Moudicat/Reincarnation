/**
 * Created by Moudi on 2017/6/4.
 */

const mongoose = require('mongoose');

const animationSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    unique: true
  },
  episode: String,
  date: {
    type: Date,
    default: Date.now()
  },
  isDone: String,
  comment: String
}, {versionKey: false});

animationSchema.pre('save', function (next) {
  if (this.isNew) {
    this.date = Date.now();
  }
  next();
});

mongoose.model('Animation', animationSchema);
