import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { createVuePlugin as Vue2 } from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite';
import JsonHotReload from './src/utilities/JsonHotReload.js';

const config = defineConfig({
  plugins: [
    Vue2(),
    Components(),
    JsonHotReload(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url))
    },
    dedupe: ["vue-demi"],
  },
  
  base: './',

  server: {
    host: '0.0.0.0',
    port: 8080,
  },

  build: {
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});

export default config;
