import LinkedList from './utils/linked';

const dom = new LinkedList((a, b) => {
  if (a.value === b.value) {
    return 0;
  }
  return a.value < b.value ? -1 : 1;
});

console.log(dom)

