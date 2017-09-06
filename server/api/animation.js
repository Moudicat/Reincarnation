/**
 * Created by Moudi on 2017/6/4.
 */
import mongoose from 'mongoose';
const AnimationModel = mongoose.model('Animation');

class AnimationApi {
  static async insert(payload) {
    const animation = new AnimationModel(payload);
    return await animation.save();
  }
  static async get() {
    return await AnimationModel.find({}).sort('-date');
  }
  static async getOne(id) {
    return await AnimationModel.findOne({_id: id});
  }
  static async update(payload) {
    return await AnimationModel.findOneAndUpdate({_id: payload.id}, {name: payload.name, episode: payload.episode, date: payload.date, isDone: payload.isDone, comment: payload.comment});
  }
  static async getLatest() {
    return await AnimationModel.find({}).sort('-date').limit(1);
  }
  static async remove(id) {
    return await AnimationModel.findOneAndRemove({_id: id});
  }
}

export default AnimationApi;
