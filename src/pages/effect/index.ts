import { effect, reactive } from './script';
import BackHome from '@/components/back-home';
BackHome("body");


const state = reactive([0, 45]);

effect(() => {
  console.log(state[0])
});

effect(() => {
  console.log(state[1])
});

