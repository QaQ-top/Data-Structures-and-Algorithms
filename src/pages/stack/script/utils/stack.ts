

type NextNode<T> = null | StackNode<T>;

/**
 * @description 队列任务
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-13
 * @class QueueTask
 */
 class StackNode<T> {
  value: T;
  next: NextNode<T>
  constructor(value: T, next = null as NextNode<T>) {
    this.value = value;
    this.next = next;
  }
  toString(callback?: (node: NextNode<T>) => string) {
    return callback ? callback(this) : `${this.value}`;
  }
};

export default class Stack<T> {
  head: NextNode<T>;
  constructor() {
    this.head = null;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    // The stack is empty if its linked list doesn't have a head.
    return !this.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) {
      // If the linked list is empty then there is nothing to peek from.
      return null;
    }

    // Just read the value from the start of linked list without deleting it.
    return this.head!.value;
  }

  /**
   * 进栈 （向第一个前面添加一个）
   */
  push(value: T) {
    // Pushing means to lay the value on top of the stack. Therefore let's just add
    // the new value at the start of the linked list.
    const newNode = new StackNode(value, this.head);
    this.head = newNode;
    

  }

  /**
   * 出栈 （删除第一个）
   */
  pop() {
    if(!this.head) return null;
    let deleteTaskNode = this.head;
    this.head = this.head.next;
    return deleteTaskNode.value;
  }

  /**
   * 转数组
   */
  toArray() {
    const array: StackNode<T>[] = [];
    if (!this.head) {
      return array;
    }

    let currentNode: NextNode<T> = this.head;
    while(currentNode) {
      array.push(currentNode);
      currentNode = currentNode.next;
    }
    return array;
  }

}

const stack = new Stack<number>();

stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
stack.pop()

console.log(stack)
