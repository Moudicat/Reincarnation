/**
 * Created by Moudi on 2017/5/11.
 */
const mongoose = require('mongoose');
const hitokotoSchema = require('./schemas/hitokoto');

hitokotoSchema.statics.add = async function (payload) {
  const hitokoto = new this(payload);
  await hitokoto.save();
  return hitokoto;
};

hitokotoSchema.statics.get = async function () {
  return await this.aggregate({$sample: {size: 1}});
};

hitokotoSchema.statics.getAll = async function () {
  return await this.find({});
};

hitokotoSchema.statics.remove = async function (id) {
  return await this.findOneAndRemove({_id: id});
};
module.exports = mongoose.model('Hitokoto', hitokotoSchema);