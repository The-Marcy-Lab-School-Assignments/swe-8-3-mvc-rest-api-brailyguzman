import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
When I send a PATCH request to port 8080 on my computer,
the request hangs and never sends back a response.

Using a different port like 3000 fixes it, not sure
what could be causing it.
*/
const SERVER_PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
