/**
 * Created by reddy on 2017/4/28.
 */

export default class Storage {
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
    window.localStorage.setItem(key, value);
  }

  /**
   * get storage
   * @param key 要获取的键名
   * @return {Object/String}
   *
   * @description 可以直接获取到对象（如果能够被反序列化）
   */
  static get(key) {
    const value = window.localStorage.getItem(key);
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
    window.localStorage.removeItem(key);
  }

  /**
   * clear storage
   * @description 清空所有的localStorage
   */
  static clear() {
    window.localStorage.clear();
  }
}
