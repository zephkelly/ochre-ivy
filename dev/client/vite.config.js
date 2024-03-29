// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(
  {
    build: {
      rollupOptions:
      {
        input: {
          main: resolve(__dirname, 'index.html'),
          admin: 'admin.html',
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
  }
)