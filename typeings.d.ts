declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';
declare module '*.sass';
declare module '*.scss';
declare module '*.json' {
  const json: {[k:string]: any};
  export default json;
};

declare module '*.wasm' {
  const wasm: (options?: WebAssembly.Imports) => Promise<WebAssembly.Memory>;
  export default wasm;
}

declare const GLOBAL_ENV: 'dev' | 'test' | 'prod';

interface Window {
  h: any;
}
