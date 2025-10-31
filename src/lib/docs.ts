import type { Folder, Item, Node, Root } from "fumadocs-core/page-tree";
import type { TOCItemType } from "fumadocs-core/toc";
import type { ComponentType } from "react";
import { docsDocs, docsMeta } from "../../.source";

type DocEntry = (typeof docsDocs)[number];
type MetaEntry = (typeof docsMeta)[number];
type DocPage = DocEntry & {
  body: ComponentType;
  toc?: TOCItemType[];
  description?: string;
  title?: string;
};

const DOC_EXTENSION = /\.mdx$/;
const META_SUFFIX = /\/?meta\.json$/;

const docMap = new Map<string, DocPage>();
for (const doc of docsDocs) {
  const slug = normalizeDocPath(doc._file.path);
  docMap.set(slug, doc as DocPage);
}

const metaMap = new Map<string, MetaEntry>();
for (const meta of docsMeta) {
  const slug = normalizeMetaPath(meta._file.path);
  metaMap.set(slug, meta);
}

function normalizeDocPath(path: string): string {
  return path.replace(DOC_EXTENSION, "");
}

function normalizeMetaPath(path: string): string {
  return path.replace(META_SUFFIX, "");
}

function slugSegmentsToPath(slug?: string[]): string {
  if (!slug || slug.length === 0) return "index";
  return slug.join("/");
}

function slugPathToSegments(path: string): string[] {
  if (path === "index") return [];
  return path.split("/");
}

function toUrl(path: string): string {
  if (path === "index") return "/docs";
  return `/docs/${path}`;
}

function fallbackTitle(path: string): string {
  const segments = path.split("/");
  const last = segments[segments.length - 1] ?? path;
  return last
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createPage(doc: DocPage, path: string): Item {
  return {
    type: "page",
    name: doc.title ?? fallbackTitle(path),
    url: toUrl(path),
    description: doc.description,
  };
}

function buildFolder(
  path: string,
  meta: MetaEntry,
  doc?: DocPage,
): Folder | null {
  const children = buildChildren(path, meta.pages);

  if (children.length === 0 && !doc) {
    return null;
  }

  const folder: Folder = {
    type: "folder",
    name: meta.title ?? doc?.title ?? fallbackTitle(path),
    description: meta.description,
    children,
  };

  if (typeof meta.defaultOpen === "boolean") {
    folder.defaultOpen = meta.defaultOpen;
  }

  if (typeof meta.root === "boolean") {
    folder.root = meta.root;
  }

  if (doc) {
    folder.index = createPage(doc, path);
  }

  return folder;
}

function buildChildren(parentPath: string, pages?: string[]): Node[] {
  if (!pages || pages.length === 0) return [];

  const parentSegments = parentPath === "" ? [] : parentPath.split("/");
  const nodes: Node[] = [];

  for (const page of pages) {
    const segments = [...parentSegments, page].filter(Boolean);
    const path = segments.join("/");
    const doc = docMap.get(path);
    const meta = metaMap.get(path);

    if (meta) {
      const folder = buildFolder(path, meta, doc);
      if (folder) nodes.push(folder);
      continue;
    }

    if (doc) {
      nodes.push(createPage(doc, path));
    }
  }

  return nodes;
}

const rootMeta =
  metaMap.get("") ??
  ({
    title: "Documentation",
    pages: Array.from(docMap.keys()),
  } satisfies Partial<MetaEntry>);

export const docsPageTree: Root = {
  name: rootMeta.title ?? "Documentation",
  children: buildChildren("", rootMeta.pages),
};

export function getDocFromSlug(slug?: string[]): DocPage | undefined {
  return docMap.get(slugSegmentsToPath(slug));
}

export function getAllDocParams(): string[][] {
  return Array.from(docMap.keys()).map(slugPathToSegments);
}

export type { DocPage };
