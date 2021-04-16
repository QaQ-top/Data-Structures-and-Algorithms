/**
 * NOT GO
 * 排序
 * 查找 最小最大数 
 */
import Comparator, { Compare } from '@/utils/comparator';
/**
 * @description 链表节点
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-13
 * @class LinkedListNode
 */
class LinkedListNode<T> {
  value: T;
  next: null | LinkedListNode<T>
  constructor(value: T, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback?: Function) {
    return callback ? callback(this.value) : `${this.value}`;
  }
};

type NextNode<T> =  null | LinkedListNode<T>;

export default class LinkedList<T> {
  head: NextNode<T>;
  tail: NextNode<T>;
  compare: Comparator<T>;
  constructor(comparatorFunction: Compare<T>) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  // 生成同判断条件的链表
  of(...array: any[]) {
    let linked = new LinkedList(this.compare.compare);
    for (let index = 0; index < array.length; index++) {
      linked.push(array[index]);
    }
    return linked;
  }

  // 头部添加
  unshift(value: T) {
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

  // 尾部添加
  push(value: T) {
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

  // 头部删除
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

  // 尾部删除
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

  // 删除链表某个值
  delete(value: T) {
    if (!this.head) return null;

    let deletedNode: LinkedListNode<T> | null = null;

    // 如果第一就是要删除的，我们直接让当前第一个等于下一个就好了
    // 然后再次循环判断
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    // 删除后续相同的节点
    let currentNode = this.head;
    if (currentNode) {
      while (currentNode?.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
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
    if (this.tail) {
      if(this.compare.equal(this.tail.value, value)) {
        this.tail = currentNode;
      }
    }else {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  // 清空链表
  clear() {
    this.head = null;
    this.tail = null;
    return true;
  }

  // 查找链表
  find(callback: (currentNode: T, index: number) => boolean) {
    // 无长度
    if (!this.head) return undefined;
    // 当前节点
    let currentNode = this.head;
    // 索引
    let index = 0;
    while (currentNode) {
      // 回调函数返回 true 结束循环
      if (callback(currentNode.value, index)) {
        return currentNode;
      }
      // 进入下一个节点
      currentNode = currentNode.next as LinkedListNode<T>;
      ++index;
    }
    return undefined
  }

  // 链表转数组
  toArray() {
   const array = [];
   let currentNode = this.head;
   while(currentNode) {
      array.push(currentNode);
      currentNode = currentNode.next;
   }
   return array;
  }

  // 链表转字符串
  toString(callback?: () => string) {
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

  // 链表反向 重点: 将上一次循环的结果存储 设置为当前循环节点的下一个节点
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
    let nextNode = null;
    while(currentNode) {
      // 存储后续链表节点
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

const linked = new LinkedList<number>((a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
});

linked.push(3);
linked.push(1);
linked.push(2);
linked.unshift(45)
linked.shift()
linked.reverse();

console.log(linked.delete(45))
console.log(linked.toString())

let l = linked.of(1,2,7,8);
console.log(l.compare.compare === linked.compare.compare);

