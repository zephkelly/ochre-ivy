// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    modulePreload: 
    {
      polyfill: true,
      polyfillDynamicImport: true,
    },
    rollupOptions:
    {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        helperFunctions: 'src/helperFunctions.ts',
        blogEditor: 'src/admin/blogEditor.ts',
        style: 'src/style.css',
      },
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})