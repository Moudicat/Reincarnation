/**
 * Created by Moudi on 2017/5/4.
 */
import mongoose from 'mongoose';
const ArticleModel = mongoose.model('Article');

class ArticleApi {
  static async add(articleObj) {
    const newArticle = new ArticleModel(articleObj);
    return await newArticle.save();
  }
  static async get(start, limit) {
    return await ArticleModel.find({status: 'publish'}, '-content -status').sort('-postTime').skip(start).limit(limit);
  }
  static async list() {
    return await ArticleModel.find({status: 'publish'}, '-content -status').sort('-postTime');
  }
  static async countArticle() {
    return await ArticleModel.count({status: 'publish'});
  }
  static async listAll() {
    return await ArticleModel.find({}, '-content').sort('-postTime');
  }
  static async getOne(id) {
    return await ArticleModel.findOne({_id: id});
  }
  static async setStatus(id, status) {
    return await ArticleModel.findOneAndUpdate({_id: id}, {status: status});
  }
  static async update(articleObj) {
    return await ArticleModel.findOneAndUpdate({_id: articleObj._id}, {title: articleObj.title, status: articleObj.status, description: articleObj.description, banner: articleObj.banner, content: articleObj.content, modifiedTime: articleObj.modifiedTime});
  }
  static async remove() {
    return await ArticleModel.deleteMany({status: 'delete'});
  }
}

export default ArticleApi;
