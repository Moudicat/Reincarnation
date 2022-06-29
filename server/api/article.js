/**
 * Created by Moudi on 2017/5/4.
 */
import mongoose from 'mongoose';
const ArticleModel = mongoose.model('Article');

class ArticleApi {
  static add(articleObj) {
    const newArticle = new ArticleModel(articleObj);
    return newArticle.save();
  }
  static get(start, limit) {
    return ArticleModel.find({status: 'publish', tags: {$nin: ["技术半月刊"]}}, '-content -status').sort('-postTime').skip(start).limit(limit);
  }
  static getByTag(tags, start, limit) {
    if (tags.length > 1) {
      return ArticleModel.find({status: 'publish', tags: {$all: tags}}, '-content -status').sort('-postTime').skip(start).limit(limit);
    } else {
      return ArticleModel.find({status: 'publish', tags: {$in: tags}}, '-content -status').sort('-postTime').skip(start).limit(limit);
    }
  }
  static list() {
    return ArticleModel.find({status: 'publish'}, '-content -status').sort('-postTime');
  }
  static countArticle() {
    return ArticleModel.count({status: 'publish', tags: {$nin: ["技术半月刊"]}});
  }
  static countArticleByTags(tags) {
    if (tags.length > 1) {
      return ArticleModel.count({status: 'publish', tags: {$all: tags}});
    } else {
      return ArticleModel.count({status: 'publish', tags: {$in: tags}});
    }
  }
  static listAll() {
    return ArticleModel.find({}, '-content').sort('-postTime');
  }
  static getOne(id) {
    return ArticleModel.findOne({_id: id});
  }
  static setStatus(id, status) {
    return ArticleModel.update({_id: id}, {$set: {'status': status}});
  }
  static update(id, articleObj) {
    return ArticleModel.update({_id: id}, {$set: {
      'title': articleObj.title, 
      'status': articleObj.status,
      'description': articleObj.description,
      'banner': articleObj.banner, 
      'content': articleObj.content, 
      'tags': articleObj.tags
    }});
  }
  static remove() {
    return ArticleModel.deleteMany({status: 'delete'});
  }
}

export default ArticleApi;
