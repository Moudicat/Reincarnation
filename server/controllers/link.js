const linkModel = require('../models/link');

class Link {
  static async list() {
    return await linkModel.list();
  }
  static async add(linkInfo) {
    linkInfo.date = +new Date();
    return await linkModel.add(linkInfo);
  }
  static async update(linkInfo) {
    linkInfo.date = +new Date();
    return await linkModel.update(linkInfo);
  }
  static async remove(id) {
    return await linkModel.remove(id);
  }
}

module.exports = Link;
