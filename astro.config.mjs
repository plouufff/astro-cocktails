import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import {loadEnv} from 'vite';
import tailwindcss from '@tailwindcss/vite';

const { APP_URL, NODE_TLS_REJECT_UNAUTHORIZED } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = NODE_TLS_REJECT_UNAUTHORIZED;

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  site: APP_URL,
  env: {
    schema: {
      API_URL: envField.string({context: "client", access: "public"})
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});