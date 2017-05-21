const UserModel = require('../models/user');

class User {
  static async register(userInfo) {
    userInfo.createTime = +new Date();
    userInfo.lastLoginTime = +new Date();
    userInfo.nickname = '';
    userInfo.avatar = '';
    return await UserModel.add(userInfo);
  }
  static async login(loginInfo) {
    loginInfo.username = loginInfo.username.trim();
    if (loginInfo.username === '' && loginInfo.password === '') {
      throw new Error('用户名密码为空');
    }
    return await UserModel.login(loginInfo);
  }
  static async getInfo(username) {
    return await UserModel.getInfo(username);
  }
}

module.exports = User;
