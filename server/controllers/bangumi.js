/**
 * Created by Moudi on 2017/5/3.
*/
const BangumiModel = require('../models/bangumi');

class Bangumi {
  static async add(payload) {
    return await BangumiModel.add(payload);
  }
  static async search(payload) {
    return await BangumiModel.search(payload);
  }
}

module.exports = Bangumi;
