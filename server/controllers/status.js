/**
 * Created by Moudi on 2017/5/26.
 */
const StatusModel = require('../models/status');

class Status {
  static async update(payload) {
    payload.date = +new Date();
    return await StatusModel.update(payload);
  }
  static async get() {
    return await StatusModel.get();
  }
}

module.exports = Status;
