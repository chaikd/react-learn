import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from "rollup-plugin-visualizer";
import { analyzer } from "vite-bundle-analyzer";
const ReactCompilerConfig = {
  target: '19' // '17' | '18' | '19'
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
    tailwindcss(),
    mode === 'analyzer' ? analyzer() : undefined
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: ({ names }) => {
          let name = names[0].split('.')[0]
          if (/\.(css)$/.test(names[0])) {
            return `assets/css/${name}.[hash][extname]`
          }
          return `assets/resource/${name}.[hash][extname]`;
        }
      },
      plugins: [
        // visualizer()
      ]
    }
  }
  // server: {
  //   proxy: {
  //     'api': {
  //       target: 'http://localhost:3004',
  //       changeOrigin: true,
  //     }
  //   }
  // }
}))
