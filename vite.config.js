import jigsaw from '@tighten/jigsaw-vite-plugin';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        origin: 'http://localhost:5173',
        cors: {
            origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
        },
    },
    plugins: [
        jigsaw({
            input: ['source/_assets/js/main.js', 'source/_assets/css/main.css'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});