import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        console.log("ROLLUP WARNING:", warning);
        warn(warning);
      },
    },
  },
})
