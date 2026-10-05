import { defineConfig } from 'astro/config';

// 4400, so it runs next to other Astro sites on the default 4321.
export default defineConfig({ server: { port: 4400 }, devToolbar: { enabled: false } });
