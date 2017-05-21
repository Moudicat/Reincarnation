/**
 * Created by Moudi on 2017/5/21.
 */
import config from '../config';

export default class User {
  static async login(loginForm) {
    const result = await fetch(config.baseURL + '/user/login', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm)
    });
    return result.json();
  }
}
