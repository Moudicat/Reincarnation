/**
 * Created by Moudi on 2017/6/4.
 */
import mongoose from 'mongoose';
const AnimationModel = mongoose.model('Animation');

class AnimationApi {
  static insert(payload) {
    const animation = new AnimationModel(payload);
    return animation.save();
  }
  static get() {
    return AnimationModel.find({}).sort('-date');
  }
  static getOne(id) {
    return AnimationModel.findOne({_id: id});
  }
  static update(payload) {
    return AnimationModel.findOneAndUpdate({_id: payload.id}, {name: payload.name, episode: payload.episode, date: payload.date, isDone: payload.isDone, comment: payload.comment});
  }
  static getLatest() {
    return AnimationModel.find({}).sort('-date').limit(1);
  }
  static remove(id) {
    return AnimationModel.findOneAndRemove({_id: id});
  }
}

export default AnimationApi;
