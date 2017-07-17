const mongoose = require('mongoose');
const linkSchema = require('./schemas/link');

linkSchema.statics.list = async function () {
  return await this.find({});
};

linkSchema.statics.add = async function (linkInfo) {
  const link = new this(linkInfo);
  await link.save();
  return link;
};

linkSchema.statics.update = async function (linkInfo) {
  // TODO: need watch
  return await this.findOneAndUpdate({_id: linkInfo._id});
};

linkSchema.statics.remove = async function (id) {
  return await this.findOneAndRemove({_id: id})
};

module.exports = mongoose.model('Link', linkSchema);
