import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs, meta } = defineDocs({
  dir: "changelog/content",
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.string(),
      version: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    providerImportSource: "@/mdx-components",
  },
});
