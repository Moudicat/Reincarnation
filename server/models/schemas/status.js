/**
 * Created by Moudi on 2017/5/25.
 */
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status: Array,
  date: {
    type: Date,
    default: Date.now()
  }
}, {versionKey: false});

statusSchema.pre('save', function (next) {
  if (this.isNew) {
    this.date = Date.now();
  }
});

mongoose.model('Status', statusSchema);
