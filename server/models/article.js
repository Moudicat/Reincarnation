/**
 * Created by Moudi on 2017/5/4.
 */
const mongoose = require('mongoose');
const articleSchema = require('./schemas/article');

// 获取文章列表
articleSchema.statics.list = async function () {
  return await this.find({status: 'publish'}, '-content -status');
};

// 添加文章
articleSchema.statics.add = async function (articleObj) {
  const newArticle = new this(articleObj);
  return await newArticle.save();
};

// 更新文章
articleSchema.statics.update = async function (articleObj) {
  return await this.findOneAndUpdate({_id: articleObj.id}, {title: articleObj.title, content: articleObj.content, modifiedTime: articleObj.modifiedTime});
};

// 调取文章
articleSchema.statics.getOne = async function (id) {
  return await this.findOne({_id: id});
};

// 标记删除文章
articleSchema.statics.markRemove = async function (id) {
  return await this.findOneAndUpdate({_id: id}, {status: 'delete'});
};


module.exports = mongoose.model('Article', articleSchema);