const mongoose = require('mongoose');
const userSchema = require('./schemas/user');

userSchema.statics.list = async function () {
  return await this.find({});
};

userSchema.statics.add = async function (userInfo) {
  const user = new this(userInfo);
  await user.save();
  return user;
};

userSchema.statics.login = async function (loginInfo) {
  const username = loginInfo.username;
  return await this.findOne({username: username});
};

userSchema.statics.getInfo = async function (username) {
  return await this.findOne({username: username}, {_id: false, password: false, createTime: false});
};

module.exports = mongoose.model('User', userSchema);
