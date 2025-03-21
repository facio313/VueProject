import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
      vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/vworld': {
              target: 'http://api.vworld.kr',
              changeOrigin: true,
              rewrite: path => path.replace(/^\/vworld/, '')
            },
            '/api': {
                target: 'http://localhost:9999',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})
