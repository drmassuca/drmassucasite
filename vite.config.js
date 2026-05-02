import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react|react-dom)[\\/]/.test(id)) return 'react-vendor';
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('@chakra-ui') || id.includes('@emotion')) return 'chakra-vendor';
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('react-icons')) return 'icons-vendor';
          if (id.includes('@tiptap')) return 'tiptap-vendor';
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark')) return 'markdown-vendor';
          if (id.includes('@supabase')) return 'supabase-vendor';
          if (id.includes('@google/generative-ai')) return 'gemini-vendor';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    sourcemap: false,
  },
  
  // Resolver duplicações do React
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', '@chakra-ui/react'],
  },
});
