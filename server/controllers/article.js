/**
 * Created by Moudi on 2017/5/4.
 */
const ArticleModel = require('../models/article');

class Article {
  static async add(articleObj) {
    if (articleObj.postTime) {
      articleObj.modifiedTime = +new Date();
    } else {
      articleObj.postTime = articleObj.modifiedTime = +new Date();
    }
    return await ArticleModel.add(articleObj);
  }
  static async get(start, limit) {
    return await ArticleModel.get(start, limit);
  }
  static async list() {
    return await ArticleModel.list();
  }
  static async countArticle() {
    return await ArticleModel.countArticle();
  }
  static async listAll() {
    return await ArticleModel.listAll();
  }
  static async getOne(id) {
    return await ArticleModel.getOne(id);
  }
  static async setStatus(id, status) {
    return await ArticleModel.setStatus(id, status);
  }
  static async update(articleObj) {
    articleObj.modifiedTime = +new Date();
    return await ArticleModel.update(articleObj);
  }
  static async remove() {
    return await ArticleModel.remove();
  }
}

module.exports = Article;
