// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'ToastFace',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'lucide-react': 'lucideReact',
        },
      },
    },
    outDir: 'dist',
  },
});
