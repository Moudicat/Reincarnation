/**
 * Created by reddy on 2017/5/3.
 */

export default class Storage {
  static set(key, value) {
    const isObject = typeof value === 'object';
    window.localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
  }

  static get(key) {
    const value = window.localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }

  static clear() {
    window.localStorage.clear();
  }
}
