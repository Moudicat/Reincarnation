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
    return await ArticleModel.find({status: 'publish', tags: {$nin: ["技术半月刊"]}}, '-content -status').sort('-postTime').skip(start).limit(limit);
  }
  static async getByTag(tags, start, limit) {
    if (tags.length > 1) {
      return await ArticleModel.find({status: 'publish', tags: {$all: tags}}, '-content -status').sort('-postTime').skip(start).limit(limit);
    } else {
      return await ArticleModel.find({status: 'publish', tags: {$in: tags}}, '-content -status').sort('-postTime').skip(start).limit(limit);
    }
  }
  static async list() {
    return await ArticleModel.find({status: 'publish'}, '-content -status').sort('-postTime');
  }
  static async countArticle() {
    return await ArticleModel.count({status: 'publish', tags: {$nin: ["技术半月刊"]}});
  }
  static async countArticleByTags(tags) {
    if (tags.length > 1) {
      return await ArticleModel.count({status: 'publish', tags: {$all: tags}});
    } else {
      return await ArticleModel.count({status: 'publish', tags: {$in: tags}});
    }
  }
  static async listAll() {
    return await ArticleModel.find({}, '-content').sort('-postTime');
  }
  static async getOne(id) {
    return await ArticleModel.findOne({_id: id});
  }
  static async setStatus(id, status) {
    return await ArticleModel.update({_id: id}, {$set: {'status': status}});
  }
  static async update(id, articleObj) {
    return await ArticleModel.update({_id: id}, {$set: {
      'title': articleObj.title, 
      'status': articleObj.status,
      'description': articleObj.description,
      'banner': articleObj.banner, 
      'content': articleObj.content, 
      'tags': articleObj.tags
    }});
  }
  static async remove() {
    return await ArticleModel.deleteMany({status: 'delete'});
  }
}

export default ArticleApi;
