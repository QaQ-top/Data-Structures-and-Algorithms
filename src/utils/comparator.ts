export type Compare<T> = (a: T, b: T) => -1 | 0 | 1;


export default class Comparator<T> {
  compare: Compare<T>

  /**
   * 自定义比较函数
   * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
   * @date 2021-04-13
   * @param {Function} compareFunction
   * @memberof Comparator
   */
  constructor(compareFunction: Compare<T>) {
    this.compare = compareFunction;
  }

  /**
   * 默认比较函数。它只是假设 "a "和 "b "是字符串或数字
   * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
   * @date 2021-04-13
   * @static
   * @param {(number | string)} a
   * @param {(number | string)} b
   * @returns -1 | 0 | 1
   * @memberof Comparator
   */

  /**
   * @function 比较是否相等
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

   /**
   * @function 是否小于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  /**
   * @function 是否大于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  /**
   * @function 小于等于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
   lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * @function 大于等于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * @function 颠倒顺序比较
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }

}