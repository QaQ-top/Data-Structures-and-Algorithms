import { createApp } from '@vue/runtime-dom';

import './style.sass';
const routes = [
  {
    name: '链表',
    path: 'linked-list'
  },
]

const Router = {
  render() {
    return <ul class='nav'>
      {
        routes.map(i => {
          return <li class="nav_item" {...{key: i.path}} > {/* 如果出现 attrs="[Object Object]" 使用扩展运算符添加属性 */}
            <a {...{href: i.path}}>{i.name}</a>
          </li>
        })
      }
    </ul>
  }
}

createApp(Router).mount('#router');