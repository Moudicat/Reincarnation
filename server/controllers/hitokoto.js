/**
 * Created by Moudi on 2017/5/11.
 */
const HitokotoModel = require('../models/hitokoto');

class Hitokoto {
  static async add(payload) {
    payload.date = +new Date();
    return await HitokotoModel.add(payload);
  }
  static async get() {
    return await HitokotoModel.get();
  }
}

module.exports = Hitokoto;