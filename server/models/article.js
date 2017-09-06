/**
 * Created by Moudi on 2017/5/4.
 */
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  postTime: {
    type: Date,
    default: Date.now()
  },
  modifiedTime: {
    type: Date,
    default: Date.now()
  },
  status: String,
  description: String,
  banner: String,
  content: String
}, {versionKey: false});

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.postTime = this.modifiedTime = Date.now();
  } else {
    this.modifiedTime = Date.now();
  }
});

mongoose.model('Article', articleSchema);
