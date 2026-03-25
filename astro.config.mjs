import { defineConfig, envField, fontProviders } from 'astro/config';
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
  env: {
    schema: {
      API_URL: envField.string({context: "client", access: "public"})
    }
  },
  fonts: [{
    provider: fontProviders.fontsource(),
    name: 'Noto Sans',
    cssVariable: "--font-noto-sans",
    weights: [400, 700, 900]
  }],
  site: APP_URL,
  vite: {
    plugins: [tailwindcss()]
  }
});
