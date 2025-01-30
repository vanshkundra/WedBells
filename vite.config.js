import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
if (typeof structuredClone === 'undefined') {
  global.structuredClone = require('fast-copy'); // Use fast-copy package
}


export default defineConfig({
  plugins: [react()],
});
