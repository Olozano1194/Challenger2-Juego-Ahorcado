import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'empezar_jugar.html'),
        addWord: resolve(__dirname, 'Ingresar_Palabra.html'),
      }
    }
  }
})
