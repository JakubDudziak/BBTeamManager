// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',

  adapter: node({
      mode: 'middleware'
  }),

  vite: {
    plugins: [tailwindcss()]
  },

    redirects: {
      '/': "/players"
    }
});