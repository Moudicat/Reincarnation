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
  static async get(payload) {
    return await AnimationModel.get(payload);
  }
  static async remove(id) {
    return await AnimationModel.remove(id);
  }
}

module.exports = Animation;
