import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import hydrogen from '@shopify/hydrogen/plugin';

export default defineConfig({
  plugins: [react(), hydrogen()],
});
