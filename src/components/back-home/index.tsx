import { h, createApp, defineComponent } from '@vue/runtime-dom';
const Component = defineComponent({
  setup: () => {
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