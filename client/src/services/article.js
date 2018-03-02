/**
 * Created by Moudi on 2017/5/5.
 */
import config from '../config';

export default class Article {
  static async get(start, limit) {
    const articleList = await fetch(`${config.baseURL}/article?start=${start}&limit=${limit}`);
    return articleList.json();
  }
  static async getByTags(tag, start, limit) {
    const articleList = await fetch(`${config.baseURL}/article/tags/${tag}?start=${start}&limit=${limit}`);
    return articleList.json();
  }

  static async getOne(id) {
    const article = await fetch(`${config.baseURL}/article/${id}`);
    return article.json();
  }

  static async count() {
    const article = await fetch(`${config.baseURL}/article/count`);
    return article.json();
  }

  static async countByTags(tags) {
    const article = await fetch(`${config.baseURL}/article/countByTags/${tags}`);
    return article.json();
  }
}
