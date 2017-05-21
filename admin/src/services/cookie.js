/**
 * Created by reddy on 2017/5/3.
 */

export default class Cookie {
  static set(name, value, day) {
    if (day) {
      let exp = new Date();
      exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + exp.toGMTString();
    } else {
      document.cookie = name + '=' + value;
    }
  }

  static get(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    let arr = document.cookie.match(reg);
    if (arr) {
      return arr[2];
    } else {
      return null;
    }
  }

  static del(name) {
    this.set(name, '', -1);
  }
}
