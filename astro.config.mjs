import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pulmoplus.in",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap()
  ],
  output: "server"
});
