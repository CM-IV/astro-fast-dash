import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 5076,
    host: "0.0.0.0",
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [preact()],
});
