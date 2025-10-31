import { DocsBody, DocsPage } from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDocParams, getDocFromSlug } from "@/lib/docs";

interface PageProps {
  params: { slug?: string[] };
}

export default function DocsRoute({ params }: PageProps) {
  const slug = params.slug;
  const page = getDocFromSlug(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.body;
  const lastSegment = slug?.at(-1) ?? "documentation";
  const title = page.title ?? humanizeSegment(lastSegment);
  const eyebrow = getSectionLabel(slug);
  const description = page.description;

  return (
    <DocsPage
      toc={page.toc}
      container={{
        className: "pb-20 md:pb-24",
      }}
      breadcrumb={{
        enabled: true,
        component: (
          <DocHeader
            title={title}
            eyebrow={eyebrow}
            description={description}
          />
        ),
      }}
      footer={{ enabled: true }}
    >
      <DocsBody className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-headings:no-underline prose-p:tracking-tight prose-p:text-balance">
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return getAllDocParams().map((segments) => ({
    slug: segments,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.slug;
  const page = getDocFromSlug(slug);

  if (!page) return {};

  const lastSegment = slug?.at(-1) ?? "documentation";
  const title = page.title ?? humanizeSegment(lastSegment);

  return {
    title: `${title} — Kanchi Docs`,
    description: page.description,
  };
}

function DocHeader({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

function getSectionLabel(slug?: string[]) {
  if (!slug || slug.length === 0) return "Start here";
  return humanizeSegment(slug[0]);
}

function humanizeSegment(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
