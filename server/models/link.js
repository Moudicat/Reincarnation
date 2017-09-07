const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  name: String,
  owner: String,
  address: String,
  description: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now()
  }
}, {versionKey: false});

linkSchema.pre('save', function (next) {
  if (this.isNew) {
    this.date = Date.now();
  }
  next();
});

mongoose.model('Link', linkSchema);
