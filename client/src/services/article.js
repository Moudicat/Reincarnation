/**
 * Created by Moudi on 2017/5/5.
 */
import config from '../config';

export default class Article {
  static async list() {
    const articleList = await fetch(config.baseURL + '/article');
    return articleList.json();
  }
  static async getOne(id) {
    const article = await fetch(`${config.baseURL}/article/${id}`);
    return article.json();
  }
}
