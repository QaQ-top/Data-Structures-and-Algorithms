import Comparator, { Compare } from '@/utils/comparator';


/**
 * @数据结构 堆 
 * @父节点索引 n
 * @子节点索引 [2 * n + 1, 2 * n + 2]
 * @说明 同将数组同特定的方法将其转为堆
 * [ 1, 2, 3, 4, 5, 6, 8, 9, 10 ]
 * 将数组第一个式为 根节点 [ 1 ]
 * 后续两个视为子节点   [ 2,   3 ] (left, right)
 *                [4,  5]   [6,  7]
 *           [8, 9] [10]
 * i: (l, r)
 * 0: (1, 2) 
 * (先得到当前索引, 根据索引判断前面有几个节点，因为前面的肯定每一个都使用了两节点[i * 2: 已经使用了的节点]，然后他们后面的就是没使用过的)
 * 1: (3, 4) (i * 2 + 1) 加一是因为根节点第一次取子节点时，不会取自己。所以导致后面节点取子节点都要 + 1
 * 2: (5, 6) (i * 2 + 1)
 * 3: (7, 8) (i * 2 + 1)
 * 4: (9, 10) (i * 2 + 1)
 * 
 * n: (n * 2 + 1, n * 2 + 2)
 * 一个节点需要使用两个节点，被使用的节点再无法使用
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
    return Math.floor((childIndex - 1) / 2);
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
   * 通过子的索引 判断是否有父节点
   */
  hasParent(childIndex: number) {
    return this.getParentIndex(childIndex) >= 0;
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

  /**
   * 提取最根节点
   * 如果 是最大堆 可以理解为提前最大数
   * 如果 是最小堆 可以理解为提前最小数
   */
  poll() {
    if (this.heapContainer.length === 0) {
      return null
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop() as T;
    this.heapDown();
    return item;

  }

  /**
   * 向堆内添加一个节点
   * 并且 处理堆排序
   */
  add(item: T) {
    this.heapContainer.push(item);
    this.heapUp();
    return this;
  }

  /**
   * 删除节点
   */
  remove(value: T) {
    // 获取到要删除的 子节点 个数
    let length = this.heapContainer.filter(i => this.compare.equal(i, value)).length;
    for (let time = 0; time < length; time++) {
      // 然后每次循环 获取 要删除节点 最新索引
      const removeIndex = this.heapContainer.findIndex(i => this.compare.equal(i, value));

      if (removeIndex === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        // 删除 当前索引的节点 并且把 最后一个节点 移入被删除的位置
        this.heapContainer[removeIndex] = this.heapContainer.pop() as T;
        // 获取 当前位置 的父节点
        const parentItem = this.parent(removeIndex);
        if (
          // 如果存在子节点
          this.hasLeftChild(removeIndex)
          &&
          // 且没有父亲节点 或者 当前节点与父节点 符合条件
          (
            !parentItem
            ||
            this.contrast(parentItem, this.heapContainer[removeIndex])
          )
        ) {
          // 就 父节点 => 子节点
          this.heapDown(removeIndex);
        } else {
          // 否则 子节点 => 父节点
          this.heapUp(removeIndex);
        }
      }
    }
  }

  /**
   * 找到第一个符合条件的节点
   */
  find(callback: (value: T, index: number) => boolean) {
    return this.heapContainer.find(callback);
  }

  /**
 * 是否为空
 */
  isEmpty() {
    return !this.heapContainer.length;
  }

  /**
 * 转 字符串
 */
  toString() {
    return this.heapContainer.toString();
  }

  /**
   * @方向 子节点 =>父节点
   * @说明 取最后一个元素（数组中的最后一个或树中的左下角）。
   * 在堆容器中，并将其抬起，直到它在正确的
   * 相对于其父元素的顺序。
   * 将父节点与子节点对比，不符合条件就相互替换
   */
  heapUp(startIndex?: number) {
    // 默认获取最后一个节点
    let currentIndex = startIndex || this.heapContainer.length - 1;
    while (
      // 是否有父节点
      this.hasParent(currentIndex)
      &&
      // 父节点和子节点 不 符合判断条件
      !this.contrast(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      // 记录父节点位置
      const parentIndex = this.getParentIndex(currentIndex);
      // 父节点 与 子节点 互换位置
      this.swap(parentIndex, currentIndex);
      // 更新 当前位置 为换完位置 后的子节点
      currentIndex = parentIndex;
    }
  };

  /**
   * @方向 父节点 => 子节点
   * @说明 将父元素与其子元素进行比较，并与适当的元素交换父元素
   * 对交换后的子节点执行相同的操作。
   */
  heapDown(startIndex = 0) {
    // 默认根节点
    let currentIndex = startIndex;
    // 下一个子节点
    let nextIndex = null;

    // 判断是否有左边的子节点
    while (this.hasLeftChild(currentIndex)) {
      // 判断是否有 右边子节点 并且对比判断两个子节点 然后取 符合条件的子节点索引
      if (this.hasRightChild(currentIndex) && this.contrast(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }
      // 然后 继承 父节点 与 选中的子节点 对比 是否符合条件
      if (this.contrast(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      };
      // 不符合条件时 父节点 与 子节点 互换位置
      this.swap(currentIndex, nextIndex);
      // 更新 当前位置 为换完位置 后的父亲节点
      currentIndex = nextIndex;
    };

  }


  /**
   * 对比方法 需要继承后 确定
   */
  contrast(firstElement: T, secondElement: T): boolean {
    throw new Error(`你需要继承该基础类，并且自定义 contrast`);
  }

}





/**
 * @class 最小堆
 */
class MinHeap<T> extends Heap<T> {
  /**
   * @function 小于等于
   */
  contrast(firstElement: T, secondElement: T) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}



/**
 * @class 最大堆
 */
class MaxHeap<T> extends Heap<T> {
  /**
   * @function 大于等于
   */
  contrast(firstElement: T, secondElement: T) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }
}



const min = new MinHeap<{ value: number }>((a, b) => {
  if (a.value === b.value) {
    return 0;
  }
  return a.value < b.value ? -1 : 1;
});

console.log(min);
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 9 });
min.add({ value: 4 });
min.add({ value: 2 });

min.add({ value: 1 });
min.add({ value: 0 });
min.add({ value: 3 });
min.remove({ value: 9 })
console.log()
