import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  plugins: [
    react({
      jsxRuntime: 'classic' // Compiles JSX to React.createElement to prevent 'e.jsx is not a function' errors in UMD
    })
  ],
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
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM'
        },
        exports: 'named'
      }
    }
  }
});
