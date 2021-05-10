import { track, trigger} from './effect';

export const reactive = (value: any) => {
  const proxy = new Proxy(value, {
    get: (target, key, receiver) => {
      const value = Reflect.get(target, key, receiver);
      // console.log(target, key)
      track(target, key);
      return value;
    },
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      console.log(target, key, oldValue)
      const is = Reflect.set(target, key, value, receiver);
      if(value !== oldValue) {
        trigger(target, key);
      }
      return is;
    }
  });
  return proxy
}