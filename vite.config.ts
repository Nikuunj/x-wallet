import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      process: 'process/browser', // ✅ Add this line
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},           // ✅ Add this line
    'process.browser': true,     // ✅ Add this line
  },
  optimizeDeps: {
    include: ['buffer', 'stream-browserify', 'crypto-browserify', 'process'], // ✅ Add 'process'
    esbuildOptions: {
      define: {
        global: 'globalThis',
        'process.env': '{}',         // ✅ Add this
        'process.browser': 'true',   // ✅ Add this
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true, // ✅ Add this to ensure proper polyfill
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
