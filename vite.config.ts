import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      process: 'process/browser',
      assert: 'assert',
      util: 'util',
      '@': path.resolve(__dirname, 'src')
    },
  },
  
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.browser': true,
  },
  optimizeDeps: {
    include: [
      'buffer',
      'stream-browserify',
      'crypto-browserify',
      'process',
      'assert',
      'util',
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        'process.env': '{}',
        'process.browser': 'true',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
