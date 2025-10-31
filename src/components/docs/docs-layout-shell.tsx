import { DocsLayout as BaseDocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider";
import type { CSSProperties, ReactNode } from "react";
import { docsPageTree } from "@/lib/docs";

type LayoutCSSVariables = CSSProperties & {
  "--fd-nav-height"?: string;
  "--fd-banner-height"?: string;
};

const HEADER_HEIGHT = "3.0rem";
const layoutCssVariables: LayoutCSSVariables = {
  "--fd-nav-height": HEADER_HEIGHT,
};

interface DocsLayoutShellProps {
  children: ReactNode;
}

export function DocsLayoutShell({ children }: DocsLayoutShellProps) {
  return (
    <RootProvider
      theme={{
        attribute: "class",
        defaultTheme: "dark",
      }}
      search={{ enabled: false }}
    >
      <div
        className="relative min-h-[calc(100vh-3rem)] bg-background"
        style={layoutCssVariables}
      >
        <BaseDocsLayout
          tree={docsPageTree}
          githubUrl="https://github.com/getkanchi/kanchi"
          nav={{ enabled: false }}
          sidebar={{
            defaultOpenLevel: 1,
            footer: null,
            collapsible: false
          }}
          themeSwitch={{enabled: false}}
        >
          <div id="nd-docs-layout" className="relative flex-1">
            {children}
          </div>
        </BaseDocsLayout>
      </div>
    </RootProvider>
  );
}
