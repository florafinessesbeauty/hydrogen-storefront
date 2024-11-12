import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import hydrogen from '@shopify/hydrogen/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    hydrogen(),
    tsconfigPaths(),
  ],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  build: {
    assetsInlineLimit: 0, // Allow a strict Content-Security-Policy without inlining assets as base64
  },
  server: {
    port: 3000,
  },
});
