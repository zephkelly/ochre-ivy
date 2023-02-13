// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, 'about.html'),
        style: 'src/style.css',
        blogEditor: 'src/blog/blogEditor.ts',
        blogHome: 'src/blog/blogHome.ts',
        blogPost: 'src/blog/blogPost.ts',
        dashboard: 'src/admin/dashboard.ts',
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    },
  },
})