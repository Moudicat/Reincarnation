/**
 * Created by Moudi on 2017/5/11.
 */
import config from '../config';

export default class Hitokoto {
  static async get() {
    const hitokoto = await fetch(config.baseURL + '/hitokoto');
    return hitokoto.json();
  }
}
