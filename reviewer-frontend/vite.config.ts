import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
  },
  resolve: {
    alias: {
      src: "/src",
      pages: "/src/pages",
      components: "/src/components",
      routes: "/src/routes",
      services: "/src/services",
      validations: "/src/validations",
      providers: "/src/providers",
      context: "/src/context",
    },
  },
  define: {
    'process.env': JSON.stringify(dotenv.config().parsed)
  }
})
