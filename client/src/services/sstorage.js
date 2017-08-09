/**
 * Created by Moudicat on 2017/8/10.
 */

export default class SStorage {
  /**
   * set storage
   * @param key 要存储的键名
   * @param value 要存储的键值
   *
   * @description 可以直接保存对象（如果能够被序列化）
   */
  static set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, value);
  }

  /**
   * get storage
   * @param key 要获取的键名
   * @return {Object/String}
   *
   * @description 可以直接获取到对象（如果能够被反序列化）
   */
  static get(key) {
    const value = window.sessionStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  /**
   * remove storage
   * @param key 要删除的键名
   */
  static remove(key) {
    window.sessionStorage.removeItem(key);
  }

  /**
   * clear storage
   * @description 清空所有的sessionStorage
   */
  static clear() {
    window.sessionStorage.clear();
  }
}
