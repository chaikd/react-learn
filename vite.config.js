import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

const ReactCompilerConfig = {
  target: '19' // '17' | '18' | '19'
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  })],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  }
})
