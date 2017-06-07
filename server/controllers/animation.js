/**
 * Created by Moudi on 2017/6/4.
 */

const AnimationModel = require('../models/animation');

class Animation {
  static async add(payload) {
    if (!payload.date) {
      payload.date = +new Date();
    }
    return await AnimationModel.add(payload);
  }
  static async get() {
    return await AnimationModel.get();
  }
  static async getOne(id) {
    return await AnimationModel.getOne(id);
  }
  static async update(payload) {
    return await AnimationModel.update(payload);
  }
  static async getLatest() {
    return await AnimationModel.getLatest();
  }
  static async remove(id) {
    return await AnimationModel.remove(id);
  }
}

module.exports = Animation;
