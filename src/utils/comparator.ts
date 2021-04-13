export type Compare = (a: any, b: any) => -1 | 0 | 1;

export default class Comparator {
  compare: Compare

  /**
   * 自定义比较函数
   * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
   * @date 2021-04-13
   * @param {Function} compareFunction
   * @memberof Comparator
   */
  constructor(compareFunction: Compare) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
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
  static defaultCompareFunction(a: number | string, b: number | string) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  /**
   * 比较是否相等
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal(a: any, b: any) {
    return this.compare(a, b) === 0;
  }

   /**
   * 是否小于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan(a: any, b: any) {
    return this.compare(a, b) < 0;
  }

  /**
   * 是否大于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan(a: any, b: any) {
    return this.compare(a, b) > 0;
  }

  /**
   * 小于等于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
   lessThanOrEqual(a: any, b: any) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * 大于等于
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual(a: any, b: any) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

   /**
   * 颠倒顺序比较
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }

}