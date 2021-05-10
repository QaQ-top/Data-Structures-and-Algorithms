const targetMap = new WeakMap<object, Map<string | symbol, Set<EffectInternal>>>();
const effecStack: EffectInternal[] = [];



export const track = (target: object, key: string | symbol) => {
  const effect = effecStack[0];
  if(effect) {
    let depsMap = targetMap.get(target);
    if(depsMap === void 0) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if(deps === void 0) {
      depsMap.set(key, (deps = new Set()));
    }
    if(!deps.has(effect)) {
      deps.add(effect);
    }
  }
}

export const trigger = (target: object, key: string | symbol) => {
  const depsMap = targetMap.get(target);
  if(depsMap === void 0) {
    return;
  }
  const deps = depsMap.get(key);
  if(deps === void 0) {
    return;
  }
  for (const fn of deps.values()) {
    fn();
  }
}




type Effect = (fn: InitCallback) => EffectInternal;
type Params = any[];
type InitCallback = (...params: Params) => any;
type Run<T> = (effec: T, fn: InitCallback, ...params: Params) => void;
type EffectInternal = (...params: Params) => void;

const run: Run<EffectInternal> = (effec, fn, ...args) => {
  if(!effecStack.includes(effec)) {
    try {
      effecStack.unshift(effec);
      fn(...args);
    } finally {
      effecStack.shift();
    }
  }
}

export const effect: Effect = (fn: () => any) => {
  const effectInternal: EffectInternal = (...args) => {
    return run(effectInternal, fn, ...args);
  }
  effectInternal();
  return effectInternal;

}

console.log(targetMap)

