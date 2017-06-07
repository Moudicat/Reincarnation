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

animationSchema.statics.getOne = async function (id) {
  return await this.findOne({_id: id});
};

animationSchema.statics.update = async function (payload) {
  return await this.findOneAndUpdate({_id: id}, {name: payload.name, episode: payload.episode, date: payload.date, isDone: payload.isDone, comment: payload.comment});
};

animationSchema.statics.getLatest = async function () {
  return await this.find({}).sort('-date').limit(1);
};

animationSchema.statics.remove = async function (id) {
  return await this.findOneAndRemove({_id: id});
};

module.exports = mongoose.model('Animation', animationSchema);