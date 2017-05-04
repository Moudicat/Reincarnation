/**
 * Created by Moudi on 2017/5/5.
 */
import axios from 'axios';
import config from '../config';

export default class Article {
  static async list() {
    const articleList = await axios.get(config.baseURL + '/article');
    return articleList.data;
  }
}
