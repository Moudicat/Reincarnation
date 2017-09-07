/**
 * Created by Moudi on 2017/5/11.
 */
import mongoose from 'mongoose';
const HitokotoModel = mongoose.model('Hitokoto');

class HitokotoApi {
  static async insert(payload) {
    const hitokoto = new HitokotoModel(payload);
    await hitokoto.save();
    return hitokoto;
  }
  static async get() {
    return await HitokotoModel.aggregate([{$match: {isActive: true}}, {$sample: {size: 1}}]);
  }
  static async getAll() {
    return await HitokotoModel.find({});
  }
  static async setActive(id, isActive) {
    return await HitokotoModel.update({_id: id}, {$set: {isActive: isActive}});
  }
  static async remove(id) {
    return await HitokotoModel.findOneAndRemove({_id: id});
  }
}

export default HitokotoApi;
