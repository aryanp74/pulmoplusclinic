import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://pulmoplusclinic.com",
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
