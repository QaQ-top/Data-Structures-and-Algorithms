import { h, Fragment, createApp, defineComponent } from '@vue/runtime-dom';
// NOT GO
console.log(Fragment)
const Component = defineComponent({
  setup: () => {
    console.log(h)
    return () => <a 
      {
        ...{
          class: "back_home",
          href: '/'
        }
      }
    >
      返回首页
    </a>
  }
})

export default function (query: string | HTMLElement) {
  createApp(Component).mount(query)
};