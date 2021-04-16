import Comparator, { Compare } from '@/utils/comparator';


/**
 * 堆 
 * 同将数组同特定的方法将其转为堆
 * [ 1, 2, 3, 4, 5, 6, 8, 9, 10 ]
 * 将数组第一个式为 根节点 [ 1 ]
 * 后续两个视为子节点   [ 2,   3 ] (left, right)
 *                [4,  5]   [6,  7]
 *           [8, 9] [10]
 * i: (l, r)
 * 0: (1, 2) 
 * (先得到当前索引, 根据索引判断前面有几个节点，因为前面的肯定每一个都使用了两节点[i * 2: 已经使用了的节点]，然后他们后面的就是没使用过的)
 * 1: (3, 4) (i * 2 + 1) 
 * 2: (5, 6) (i * 2 + 1)
 * 3: (7, 8) (i * 2 + 1)
 * 4: (9, 10) (i * 2 + 1)
 * 
 * n: (n * 2 + 1, n * 2 + 2)
 * 一个节点需要使用两个节点，被使用的节点再无法使用
 * 
 * 
 */
class Heap<T> {
  heapContainer: T[];
  compare: Comparator<T>
  constructor(comparatorFunction: Compare<T>) {

    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 通过父节点索引 获取某个父节点左侧子节点索引
   */
  getLeftChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 1;
  }

  /**
   * 通过父节点索引 获取某个父节点右侧子节点索引
   */
  getRightChildIndex(parentIndex: number) {
    return (2 * parentIndex) + 2;
  }

  /**
   * 通过父节点索引 通过子节点索引和父节点索引
   */
  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * 通过父节点索引 判断某个父节点是否拥左侧子节点
   */
  hasLeftChild(parentIndex: number) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * 通过父节点索引 判断某个父节点是否拥右侧子节点
   */
  hasRightChild(parentIndex: number) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * 通过父亲节点索引 获取右侧子节点
   */
  leftChild(parentIndex: number) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * 通过父亲节点索引 获取右侧子节点
   */
  rightChild(parentIndex: number) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * 通过子节点索引 获取父节点
   */
  parent(childIndex: number) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * 节点交换
   */
  swap(indexOne: number, indexTwo: number) {
    const tmp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = tmp;
  }

  /**
   * 查看根节点
   */
   peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    return this.heapContainer[0];
  }

  poll() {
    if(this.heapContainer.length === 0) {
      return null
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop() as T;
    // NOT GO;
    return item;

  }

  add(item: T) {
    this.heapContainer.push(item);
    // NOT GO
    return this;
  }

  /**
   * 取最后一个元素（数组中的最后一个或树中的左下角）。
   * 在堆容器中，并将其抬起，直到它在正确的
   * 相对于其父元素的顺序。
   */
  
  // NOT GO

}


class MinHeap<T> extends Heap<T> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}