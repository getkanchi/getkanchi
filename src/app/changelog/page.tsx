import { docs } from "../../../.source";
import { formatDate } from "@/lib/utils";

export default function ChangelogPage() {
  const sortedChangelogs = [...docs].sort((a, b) => {
    const dateA = new Date(a?.date).getTime();
    const dateB = new Date(b?.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-5xl mx-auto relative">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Changelog
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Follow the latest updates, features, and improvements to Kanchi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
        <div className="relative">
          {/* Continuous vertical timeline line */}
          <div
            className="hidden md:block absolute left-48 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: "hsl(0, 0%, 15%)" }}
          />

          {sortedChangelogs.map((changelog, index) => {
            const MDX = (changelog as any).body;
            const date = new Date(changelog.date || (changelog as any).title);
            const formattedDate = formatDate(date);
            const anchorId = changelog.version || `changelog-${index}`;

            return (
              <div key={index} id={anchorId} className="relative scroll-mt-24">
                <div className="flex flex-col md:flex-row gap-y-6">
                  {/* Left side - Date and Version */}
                  <div className="md:w-48 flex-shrink-0">
                    <div className="md:sticky md:top-24 pb-10 flex flex-col gap-3 z-20">
                      <time className="text-sm font-medium text-muted-foreground block">
                        {formattedDate}
                      </time>

                      {changelog.version && (
                        <a
                          href={`#${anchorId}`}
                          className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-foreground border border-muted rounded-lg text-sm px-6 font-bold hover:border-foreground/50 transition-colors"
                        >
                          {changelog.version}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 md:pl-8 relative pb-10">
                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-0">
                          {/* Timeline dot aligned with heading and centered on line */}
                          <div
                            className="hidden md:block absolute w-3 h-3 rounded-full z-10"
                            style={{
                              backgroundColor: "hsl(0, 0%, 100%)",
                              left: "calc(-2rem)",
                              transform: "translateX(-50%)",
                              top: "0",
                            }}
                          />
                          <h2 className="text-2xl font-semibold tracking-tight text-balance">
                            {(changelog as any).title}
                          </h2>
                        </div>

                        {/* Tags */}
                        {changelog.tags &&
                          Array.isArray(changelog.tags) &&
                          changelog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {changelog.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="h-6 w-fit px-2 text-xs font-medium bg-surface text-muted-foreground rounded-full border border-raised flex items-center justify-center"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                        <MDX />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
