import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.234.81.142',
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
    }
})
