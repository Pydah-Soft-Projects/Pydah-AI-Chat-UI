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
      // Bundling React & ReactDOM into the standalone UMD CDN script prevents
      // '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' and 'ReactDOM is undefined'
      // runtime errors when embedded via <script src=".../index.umd.js"></script> across any host app.
    }
  }
});
