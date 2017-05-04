const UserModel = require('../models/user');

class User {
  static async register(userInfo) {
    userInfo.createTime = +new Date();
    userInfo.updateTime = +new Date();
    return await UserModel.add(userInfo);
  }
}

module.exports = User;
