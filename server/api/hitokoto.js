/**
 * Created by Moudi on 2017/5/11.
 */
import mongoose from 'mongoose';
const HitokotoModel = mongoose.model('Hitokoto');

class HitokotoApi {
  static insert(payload) {
    const hitokoto = new HitokotoModel(payload);
    return hitokoto.save();
  }
  static get() {
    return HitokotoModel.aggregate([{$match: {isActive: true}}, {$sample: {size: 1}}]);
  }
  static getAll() {
    return HitokotoModel.find({});
  }
  static setActive(id, isActive) {
    return HitokotoModel.update({_id: id}, {$set: {isActive: isActive}});
  }
  static remove(id) {
    return HitokotoModel.findOneAndRemove({_id: id});
  }
}

export default HitokotoApi;
