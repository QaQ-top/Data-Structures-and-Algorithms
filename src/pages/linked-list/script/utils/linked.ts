import Comparator, { Compare } from '@/utils/comparator';
/**
 * @description 链表节点
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-13
 * @class LinkedListNode
 */
class LinkedListNode {
  value: number;
  next: null | LinkedListNode
  constructor(value: number, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
};

export default class LinkedList {
  head: null | LinkedListNode;
  tail: null | LinkedListNode;
  compare: Comparator;
  constructor(comparatorFunction: Compare) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  static of(...array: any[]) {
    let linked = null;
    [...array].reverse().reduce((prev, i, n) => {
      if(!prev) {
        linked = new LinkedListNode(i);
        return linked;
      } else {
        return linked = new LinkedListNode(i, prev);
      };
    }, linked);
    return linked;
  }

  unshift(value: number) {
    const newNode = new LinkedListNode(value);
    if (!this.tail) {
      this.tail = newNode;
    }
    if(this.head) {
      newNode.next = this.head;
    }
    this.head = newNode;
    return this;
  }

  push(value: number) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      return this;
    }
    // 添加节点
    this.tail!.next = newNode;
    // 更新尾部
    this.tail = newNode;
    return this;
  }

  shift() {
    if(!this.head) return null;
    const deleteHead = this.head;
    // 如果只有一个节点 直接清除链表
    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.clear();
    }
    return deleteHead;
  }

  pop() {
    const deletedTail = this.tail;
    // 如果只有一个节点 直接清除链表
    if(this.head === this.tail) {
      this.clear();
      return deletedTail;
    };
    // 如果有多个, 找到最后一个并且删除它
    let currentNode = this.head;
    while(currentNode?.next) {
      if(!currentNode.next.next) {
        currentNode.next = null;
      }else {
        currentNode = currentNode.next;
      }
    };
    // 更新尾部节点
    this.tail = currentNode;

    return deletedTail;
  }


  delete(value: number) {
    if (!this.head) return null;
    let deletedNode: LinkedListNode | null = null;

    // 如果第一就是要删除的，我们直接让当前第一个等于下一个就好了
    // 然后再次循环判断
    while (this.head && this.compare.equal(this.head, { value })) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    // 删除后续相同的节点
    let currentNode = this.head;
    if (currentNode) {
      while (currentNode?.next) {
        if (this.compare.equal(currentNode?.next, { value })) {
          // 先将要删除的存储
          deletedNode = currentNode.next;
          // 将下个删除，并且链接后续节点
          currentNode.next = currentNode.next.next;
        } else {
          // 向后移动 再次循环
          currentNode = currentNode.next;
        }
      }
    }
    // 判断是否需要更换尾部对链表最后节点的引用
    if (this.compare.equal(this.tail, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  clear() {
    this.head = null;
    this.tail = null;
    return true;
  }

  find(callback: (currentNode: LinkedListNode, index: number) => boolean) {
    // 无长度
    if (!this.head) return undefined;
    // 当前节点
    let currentNode = this.head;
    // 索引
    let index = 0;
    while (currentNode) {
      // 回调函数返回 true 结束循环
      if (callback(currentNode, index)) {
        return currentNode;
      }
      // 进入下一个节点
      currentNode = currentNode.next as LinkedListNode;
      ++index;
    }
    return undefined
  }

  toArray() {
   const array = [];
   let currentNode = this.head;
   while(currentNode) {
      array.push(currentNode);
      currentNode = currentNode.next;
   }
   return array;
  }

  toString(callback?: Function) {
    return this.toArray().map(i => i.toString(callback));
  }

  /**
   * 根据自身 API 实现;
   */
  // reverse() {
  //   let currentNode = this.head;
  //   this.clear();
  //   while(currentNode) {
  //     const first = currentNode
  //     currentNode = currentNode.next;
  //     first.next = null;
  //     this.unshift(first.value);
  //   }
  // }

  reverse() {
    /**
     * cur = 1 2 3 4 5
     * 1   2 3 4 5
     * 
     * n = 2 3 4 5 (n = cur.next)
     * p = 1 -> null (cur.next = p)
     * cur = n
     * 
     * 
     * cur (2 3 4 5)
     * 2   3 4 5 
     * 
     * n = 3 4 5(n = cur.next)
     * p = 2 -> 1 null (cur.next = p)
     * cur = n
     * 
     * 
     * cur (3 4 5)
     * 3   4 5 
     * 
     * n = 4 5(n = cur.next)
     * p = 3 -> 2 1 null (cur.next = p)
     * cur = n
     * 
     */
    let currentNode = this.head;
    let prevNode = null;
    while(currentNode) {
      // 存储后续链表节点
      let nextNode = null;
      nextNode = currentNode.next; 

      // 在当前节点断开后续节, 在将上一次存储的节点加到当前节点的后面
      currentNode.next = prevNode; 
      // 将当前节点存储
      prevNode = currentNode; 

      // 将当前遍历的替换成 刚刚断开的后续链表
      currentNode = nextNode;  
    }
    
    // 更新链表
    this.tail = this.head;
    this.head = prevNode;
    return this;
  }

}

const linked = new LinkedList((a: LinkedListNode, b: LinkedListNode) => {
  if (a.value === b.value) {
    return 0;
  }
  return a.value < b.value ? -1 : 1;
});

linked.push(3);
linked.push(1);
linked.push(2);
linked.unshift(45)
// linked.shift()
linked.reverse();

console.log(linked.toString())

console.log(LinkedList.of(1,2,7,8));

