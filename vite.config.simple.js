import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // PWA temporariamente desabilitado para resolver build
  ],

  // Performance: evita múltiplas cópias do react em runtime
  resolve: { 
    dedupe: ['react', 'react-dom'],
  },

  // Otimizações de build simplificadas
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chakra: ['@chakra-ui/react'],
          router: ['react-router-dom'],
        },
      },
    },
    sourcemap: false,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', '@chakra-ui/react'],
  },
});
