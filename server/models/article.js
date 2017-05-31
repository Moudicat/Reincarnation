/**
 * Created by Moudi on 2017/5/4.
 */
const mongoose = require('mongoose');
const articleSchema = require('./schemas/article');

// 获取文章列表
articleSchema.statics.list = async function () {
  return await this.find({status: 'publish'}, '-content -status').sort('-postTime');
};
// 获取全部文章
articleSchema.statics.listAll = async function () {
  return await this.find({}, '-content').sort('-postTime');
};

// 调取文章
articleSchema.statics.getOne = async function (id) {
  return await this.findOne({_id: id});
};

// 添加文章
articleSchema.statics.add = async function (articleObj) {
  const newArticle = new this(articleObj);
  return await newArticle.save();
};

// 更新文章
articleSchema.statics.update = async function (articleObj) {
  // TODO： need update.
  return await this.findOneAndUpdate({_id: articleObj._id}, {title: articleObj.title, status: articleObj.status, description: articleObj.description, banner: articleObj.banner, content: articleObj.content, modifiedTime: articleObj.modifiedTime});
};

// 更改发布状态
articleSchema.statics.setStatus = async function (id, status) {
  return await this.findOneAndUpdate({_id: id}, {status: status});
};

// 删除标记删除的文章
articleSchema.statics.remove = async function () {
  return await this.deleteMany({status: 'delete'});
};

module.exports = mongoose.model('Article', articleSchema);
