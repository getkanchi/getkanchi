// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config/zod-3";
import { z } from "zod";
var { docs, meta } = defineDocs({
  dir: "changelog/content",
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.string(),
      version: z.string().optional(),
      tags: z.array(z.string()).optional()
    })
  }
});
var source_config_default = defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    providerImportSource: "@/mdx-components"
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
