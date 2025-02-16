import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que o app seja acessado na rede local
    port: 5173, // Define a porta (pode ser outra)
    strictPort: true, // Garante que a porta especificada será usada
    proxy: {
      '/api': 'http://localhost:5000', // Redireciona requisições para o backend
    },
  },
});