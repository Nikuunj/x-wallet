declare global {
    interface Window {
      Buffer: typeof Buffer;
    }
  }
  
declare module 'rollup-plugin-node-polyfills' {
  const plugin: any;
  export default plugin;
}
  