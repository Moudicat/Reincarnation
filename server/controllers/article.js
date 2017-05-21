/**
 * Created by Moudi on 2017/5/4.
 */
const ArticleModel = require('../models/article');

class Article {
  static async add(articleObj) {
    articleObj.postTime = articleObj.modifiedTime = +new Date();
    return await ArticleModel.add(articleObj);
  }
  static async list() {
    return await ArticleModel.list();
  }
  static async listAll() {
    return await ArticleModel.listAll();
  }
}

module.exports = Article;
