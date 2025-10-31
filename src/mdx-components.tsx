import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...components,
    ...defaultMdxComponents,
    img: ({ className, ...props }: React.ComponentProps<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cn("rounded-md border", className)}
        {...props}
        alt={props.alt || ""}
      />
    ),
    Video: ({ className, ...props }: React.ComponentProps<"video">) => (
      <video
        className={cn("rounded-md border", className)}
        controls
        loop
        {...props}
      />
    ),
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props} className={"border-border"}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  };
}

export const useMDXComponents = getMDXComponents;
