import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from "node:url";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'


import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    VueDevTools(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    modulePreload: false,
    outDir: "build",
    emptyOutDir: true,
    assetsInlineLimit: 99999999999,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks: (id: string) => {
          return 'index'
        }
      },
    },
  },
});
