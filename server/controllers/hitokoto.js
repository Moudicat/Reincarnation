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
  static async getAll() {
    return await HitokotoModel.getAll();
  }
  static async remove(id) {
    return await HitokotoModel.remove(id);
  }
}

module.exports = Hitokoto;
