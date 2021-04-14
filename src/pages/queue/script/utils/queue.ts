
type NextTask<T> = null | QueueTask<T>;

/**
 * @description 队列任务
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-13
 * @class QueueTask
 */
 class QueueTask<T> {
  value: T;
  next: NextTask<T>
  constructor(value: T, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback?: (node: QueueTask<T>) => string) {
    return callback ? callback(this) : `${this.value}`;
  }
};


/**
 * 队列 (前出 后进)
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2021-04-14
 * @export
 * @class Queue
 * @template T
 */
export default class Queue<T> {
  head: NextTask<T>;
  tail: NextTask<T>;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  isEmpty() {
    return !this.head;
  }

  // 查看任务
  peek() {
    if(!this.head) {
      return null;
    }
    return this.head.value;
  }

  // 加入队列 在队列末尾添加一个新任务。此任务将在其前面的所有任务之后进行处理
  enqueue(value: T) {
    const newTask = new QueueTask<T>(value);
    if(!this.tail) {
      this.head = this.tail = newTask;
    }else {
      this.tail.next = newTask;
      this.tail = newTask;
    }
  }

  // 删除队列开头中的元素。如果队列为空，则返回null
  dequeue() {
    if(!this.head) return null;
    let deleteTask = this.head;
    this.head = this.head.next;
    return deleteTask.value;
  }


}


const queue = new Queue<number>();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue)
console.log(queue.peek())
console.log(queue.dequeue())
