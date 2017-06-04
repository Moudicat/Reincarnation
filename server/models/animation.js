/**
 * Created by Moudi on 2017/6/4.
 */

const mongoose = require('mongoose');
const animationSchema = require('./schemas/animation');

animationSchema.statics.add = async function (payload) {
  const animation = new this(payload);
  await animation.save();
  return animation;
};

animationSchema.statics.get = async function () {
  return await this.find({}).sort('-date');
};

animationSchema.statics.remove = async function (id) {
  return await this.findOneAndRemove({_id: id});
};

module.exports = mongoose.model('Animation', animationSchema);