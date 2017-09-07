/**
 * Created by Moudi on 2017/5/10.
 */
const mongoose = require('mongoose');

const hitokotoSchema = new mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {versionKey: false});

hitokotoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.date = Date.now();
  }
  next();
});

mongoose.model('Hitokoto', hitokotoSchema);
