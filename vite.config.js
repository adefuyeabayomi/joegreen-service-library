import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'joegreenservicelibrary',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // Ensure to externalize dependencies that shouldn't be bundled into your library
      external: ['axios'],
      output: {
        globals: {
          axios: 'axios'
        }
      }
    }
  }
})
