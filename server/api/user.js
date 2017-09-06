import mongoose from 'mongoose';
const UserModel = mongoose.model('User');

class UserApi {
  static async register(userInfo) {
    if (!userInfo.nickname) userInfo.nickname = '';
    if (!userInfo.avatar) userInfo.avatar = '';

    const user = new UserModel(userInfo);
    await user.save();
    return user;
  }
  static async login(loginInfo) {
    const username = loginInfo.username;
    return await UserModel.findOne({username: username});
  }
  static async getInfo(username) {
    return await this.findOne({username: username}, {_id: false, password: false, createTime: false});
  }
  static async list() {
    return await UserModel.find({});
  }
}

export default UserApi;
