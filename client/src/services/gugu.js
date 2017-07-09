/**
 * Created by Moudicat on 2017/7/9.
 */
import config from '../config';

export default class Gugu {
  static async send(guguObj) {
    guguObj.from = 'blog';
    if (guguObj.name.trim() === '' || guguObj.content.trim() === '') {
      return;
    }
    console.log(guguObj);
    const result = await fetch(config.baseURL + '/gugu', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guguObj)
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
}
