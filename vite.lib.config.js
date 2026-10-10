import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      name: 'PydahAIChatUI',
      fileName: (format) => 'index.' + format + '.js',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Externalizing react & react-dom ensures the UMD bundle uses the host application's
      // single shared React instance (window.React / window.ReactDOM), completely eliminating
      // the "Invalid hook call: multiple copies of React in the same app" runtime crash.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React'
        },
        exports: 'named'
      }
    }
  }
});
