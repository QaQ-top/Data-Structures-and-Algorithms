import { createApp } from '@vue/runtime-dom';

import './style.sass';
const routes = [
  {
    name: '参考学习',
    path: 'https://github.com/trekhleb/javascript-algorithms/blob/83357075c4698f487af733e6e0bf9567ba94c266/src/data-structures'
  },
  {
    name: '链表',
    path: 'linked-list',
    description: '重点: 如何删除某个节点，如何反转整个链表'
  },
  {
    name: '双向链表',
    path: 'doubly-linked-list',
    description: '重点: 如何删除某个节点，如何反转整个链表'
  },
  {
    name: '队列',
    path: 'queue',
    description: '重点: 队列与链表很相似（头部出 尾部进）'
  },
  {
    name: '栈',
    path: 'stack',
    description: '重点: 尾部进 尾部出'
  },
  {
    name: '哈希表',
    path: 'hash-table',
    description: '重点: 多链, Set时生成hash映射'
  },
  {
    name: '堆',
    path: 'heap',
    description: '重点: heapUp heapDown 这两个核心函数'
  },
]

const Router = {
  render() {
    return <ul class='nav'>
      {
        routes.map(i => {
          return <li class="nav_item" {...{key: i.path}} > {/* 如果出现 attrs="[Object Object]" 使用扩展运算符添加属性 */}
            <a {...{href: i.path}}>{i.name}</a>
            &nbsp;&nbsp;&nbsp;
            <span style={{fontSize: '10px', color: 'red'}}>{i?.description}</span>
            <br />
            <br />
          </li>
        })
      }
    </ul>
  }
}

createApp(Router).mount('#router');