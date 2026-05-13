import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Challenger2-Juego-Ahorcado/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'empezar_jugar.html'),
        addWord: resolve(__dirname, 'Ingresar_Palabra.html'),
      }
    }
  }
}))
