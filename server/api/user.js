import mongoose from 'mongoose';
const UserModel = mongoose.model('User');

class UserApi {
  static register(userInfo) {
    if (!userInfo.nickname) userInfo.nickname = '';
    if (!userInfo.avatar) userInfo.avatar = '';
    const user = new UserModel(userInfo);
    return user.save();
  }
  static login(loginInfo) {
    const username = loginInfo.username;
    return UserModel.findOne({username: username});
  }
  static getInfo(username) {
    return UserModel.findOne({username: username}, {_id: false, password: false, createTime: false});
  }
  static list() {
    return UserModel.find({});
  }
}

export default UserApi;
