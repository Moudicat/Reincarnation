/**
 * Created by Moudi on 2017/5/22.
 */
import config from '../config';

export default class Article {
  static async add(articleForm) {
    const result = await fetch(config.baseURL + '/article', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify(articleForm)
    });
    return result.json();
  }
  static async listAll() {
    const result = await fetch(config.baseURL + '/article/all', {
      headers: {'X-MDC-Token': Store.state.token}
    });
    return result.json();
  }
}
