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

hitokotoSchema.statics.get = async function (q) {
  return await this.aggregate({$sample: {size: 1}});
};

module.exports = mongoose.model('Hitokoto', hitokotoSchema);