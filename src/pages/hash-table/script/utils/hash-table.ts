import LinkedList from '@/pages/linked-list/script/utils/linked';
type HashValue<T> = {key:string, value: T};
class HashTable<T> {
  
  buckets: LinkedList<HashValue<T>>[];
  keys: {[k:string]: number}

  constructor(hashTableSize = 32) {
    // 创建一定大小的哈希表，并用空链接列表填充每个 bucket
    this.buckets = Array(hashTableSize).fill(null).map(i => {
      return new LinkedList<HashValue<T>>((a, b) => {
        if(a.value === b.value) {
          return 0
        }
        return a.value < b.value ? -1 : 1;
      });
    });
    // 只是为了快速跟踪所有实际的链表
    this.keys = {};
  }

  hash(key: string) {
    /**
     * 使用键的所有字符的字符代码之和来计算哈希值
     */
    const hash = Array.from(key).reduce((count, code, index) => {
      return count + code.charCodeAt(0);
    }, 0);
    // 减少哈希数，使其适合哈希表的大小
    return hash % this.buckets.length;
  }

  // 设置一个键值
  set(key: string, value: T) {
    // 获取key的哈希值
    const keyHash = this.hash(key);
    // 生成快速映射
    this.keys[key] = keyHash;
    // 获取哈希值对应的链表
    const bucketLinked = this.buckets[keyHash];
    // 判断是否已经存在
    const node = bucketLinked.find((node, index) => node.key === key);
    // 如果存在就更新 value 否则在当前哈希位置的链表上添加一个节点
    if(node) {
      node.value.value = value;
    } else {
      bucketLinked.push({key, value});
    }
  }

  // 获取键对应的值
  get(key: string) {
    const keyHash = this.hash(key);
    const bucketLinked = this.buckets[keyHash];
    const node = bucketLinked.find((node, index) => node.key === key);
    return node?.value?.value;
  }

  // 删除一个键值
  delete(key: string) {
    const keyHash = this.hash(key);
    // 删除快速映射
    delete this.keys[key];
    const bucketLinked = this.buckets[keyHash];
    const node = bucketLinked.find((node, index) => node.key === key);
    // 删除链表节点
    if (node) {
      return bucketLinked.delete(node.value);
    }
    return null;
  }

  // 判断是否拥有某个值
  has(key: string) {
    return Object.prototype.hasOwnProperty.call(this.keys, key)
  }

  // 全部的键
  getKeys() {
    return Object.keys(this.keys);
  }

  // 全部的值
  getValues() {
    return this.buckets.reduce((array, bucket) => {
      const bucketValues = bucket.toArray().map(node => node.value.value);
      return array.concat(bucketValues);
    }, [] as T[]);
  }
}

const hashTable = new HashTable<number>();


hashTable.set('test', 555);
hashTable.set('t', 777);
hashTable.set('k', 888);
console.log(hashTable);
console.log(hashTable.get('test'))
hashTable.set('test', 9999);
console.log(hashTable.get('test'))

console.log(hashTable.getKeys())
console.log(hashTable.getValues())

