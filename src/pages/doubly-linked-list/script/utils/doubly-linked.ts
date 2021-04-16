/**
 * NOT GO
 * 排序
 * 查找 最小最大数 
 */

import Comparator, { Compare } from '@/utils/comparator'

/**
 * 双向链表节点
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-14
 * @class DoublyLinkedListNode
 */

type Adjacent<T> = null | DoublyLinkedListNode<T>;

class DoublyLinkedListNode<T> {
  value: T;
  prev: Adjacent<T>;
  next: Adjacent<T>;
  constructor(value: T, next = null as Adjacent<T>, prev = null as Adjacent<T>) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  toString(callback?: (node: DoublyLinkedListNode<T>) => string) {
    return callback ? callback(this) : `${this.value}`
  }
}

class DoublyLinkedList<T> {
  head: null | DoublyLinkedListNode<T>;
  tail: null | DoublyLinkedListNode<T>;
  compare: Comparator<T>;
  constructor(comparatorFunction: Compare<T>) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  of(...array: any[]) {
    let doubly = new DoublyLinkedList<T>(this.compare.compare);
    for (let index = 0; index < array.length; index++) {
      doubly.push(array[index]);
    }
    return doubly;
  }

  unshift(value: T) {
    // 默认设置头为新节点的下一个节点
    const newNode = new DoublyLinkedListNode<T>(value, this.head);
    if (this.head) {
      // 设置新节点为头的上一个节点
      this.head.prev = newNode;
    }
    if (!this.tail) {
      this.tail = newNode;
    }
    // 更新头部
    this.head = newNode;
    return this;
  }
  push(value: T) {
    // 默认设置尾为新节点的上一个节点
    const newNode = new DoublyLinkedListNode<T>(value, null, this.tail);
    if (!this.head) {
      this.head = newNode
    }
    if (this.tail) {
      // 设置新节点为尾的下一个节点
      this.tail.next = newNode
    }
    // 更新尾部
    this.tail = newNode;
    return this;
  }

  shift() {
    let deleteNode = this.head;
    if (this.head === this.tail) {
      this.clear();
      return deleteNode;
    }
    if (this.head) {
      // 更新节点
      this.head = this.head.next;
      // 去除链接
      this.head!.prev = null;
      deleteNode!.next = null;
    }
    return deleteNode;
  }

  pop() {
    let deleteNode = this.tail;
    if (this.head === this.tail) {
      this.clear();
      return deleteNode;
    }
    if (this.tail) {
      // 更新节点
      this.tail = this.tail.prev;
      // 去除链接
      this.tail!.next = null;
      deleteNode!.prev = null;
    }
    return deleteNode;
  }
  // 清空链表
  clear() {
    this.head = null;
    this.tail = null;
    return true;
  }

  /**
   * 自己写的
   * 
   * delete: 2
   * linked: 1 2 3 4 5
   * 先解除 tail 尾部, 让链表只有一个 头部入口
   * 和一个变化的 currentNode 循环时的当前节点
   * 
   * 当遇到不需要删除的节点时 我们将其放入尾部
   * 后面遇到要删除的节点时直接删除，断开的后续节点
   * 存储在 currentNode 上
   * head  tail   delete  currentNode
   *  1     1       2      3 4 5
   * head  tail   currentNode
   *  1     3       4 5
   * head  tail   currentNode
   *  1  3  4      5
   * head  tail   currentNode
   *  1 3 4 5      null
   */
  // delete(value: T) {
  //   if (!this.head) return;

  //   let deleteNode = null;
  //   let currentNode: Adjacent<T> = this.head;
  //   this.tail = null;

  //   while (currentNode) {
  //     // 相等时直接删除节点就 ok
  //     if (this.compare.equal(currentNode, new DoublyLinkedListNode(value))) {
  //       // 存储当前相同的节点
  //       deleteNode = currentNode;

  //       // 改变当前节点
  //       currentNode = currentNode.next;

  //       // 断开与下一个节点的关联
  //       if (deleteNode.next) {
  //         deleteNode.next.prev = null;
  //         deleteNode.next = null;
  //       }

  //       // 断开与上一个节点的关联
  //       if (deleteNode.prev) {
  //         deleteNode.prev.next = null;
  //         deleteNode.prev = null;
  //       }

  //     } else { // 不相等时保持 断开后重新拼接
  //       if (this.tail) {
  //         this.tail!.next = currentNode;
  //         // currentNode.prev = this.tail;
  //         this.tail = currentNode;
  //       } else {
  //         this.head = this.tail = currentNode;
  //       }
  //       // 改变当前节点
  //       currentNode = currentNode.next;
  //     }

  //   }
  //   return deleteNode;
  // }

  /**
   * 看文档优化
   */
  delete(value: T) {
    if (!this.head) {
      return null;
    }
    let deletedNode = null;
    let currentNode: Adjacent<T> = this.head;
    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;

        // 存储 上 下 两节点
        const previousNode = deletedNode.prev;
        const nextNode = deletedNode.next;

        // 清除关联
        deletedNode.next = null;
        deletedNode.prev = null;

        // 直接链接上下两个节点
        if (previousNode) {
          previousNode!.next = nextNode;
        }
        if (nextNode) {
          nextNode!.prev = previousNode;
        }

        // 判断头尾 是否 需要移动
        if(this.head === deletedNode) {
          this.head = currentNode.next;
        }
        if(this.tail === deletedNode) {
          this.tail = previousNode;
        }
      }
      currentNode = currentNode.next;
    }
    return deletedNode;
  }

  // 搜索
  find(callback: (node: T, index: number) => boolean) {
    if (!this.head) {
      return null;
    }

    let currentNode: Adjacent<T> = this.head;
    let index = 0;
    while(currentNode) {
      if(callback(currentNode.value, index)) {
        return currentNode;
      }
      // 进入下一个节点
      currentNode = currentNode.next;
      ++index;
    }
    return null;
  }

  // 转数组
  toArray() {
    const array: DoublyLinkedListNode<T>[] = [];
    if (!this.head) {
      return array;
    }

    let currentNode: Adjacent<T> = this.head;
    while(currentNode) {
      array.push(currentNode);
      currentNode = currentNode.next;
    }
    return array;
  }

  // 转字符串
  toString(callback?: (node: DoublyLinkedListNode<T>) => string) {
    return this.toArray().map(i => i.toString(callback))
  }

  // 反转 重点: 还是将上一次循环的结果存储 设置为当前循环节点的下一个节点
  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;
    while(currentNode) {
      // 存储 上 下 两个节点, 并且下 节点 存储着后续链表
      nextNode = currentNode.next;

      // 然后颠倒 上下两个节点
      currentNode.next = prevNode;
      currentNode.prev = nextNode;

      // 存储当前节点 当循环结束时  prevNode 就是 反转前的链表最后一个
      // 循环结束后 它 将成为第一个
      prevNode = currentNode;

      // 更新循为 后续链表
      currentNode = nextNode;
    }
    this.tail = this.head
    this.head = prevNode;
    return this;
  }
   
}


const doubly = new DoublyLinkedList<number>((a, b) => {
  if (a === b) {
    return 0
  }
  return a < b ? -1 : 1
});


console.log(doubly)

doubly.push(1)
doubly.push(2)
doubly.push(3)
doubly.push(4)



console.log(doubly.reverse())

