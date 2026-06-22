#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultKanchiRoot = resolve(repoRoot, "../kanchi");
const schemaPath = join(repoRoot, "scripts/kanchi-release.schema.json");

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

if (!args.version) {
  fail("Missing --version. Example: npm run release:kanchi -- --version 1.5.2");
}

const version = normalizeVersion(args.version);
const versionTag = `v${version}`;
const date = args.date ?? today();
const kanchiRoot = resolve(repoRoot, args.kanchi ?? defaultKanchiRoot);
const outputRoot = resolve(
  repoRoot,
  args.outputDir ?? ".release-workbench",
  `kanchi-${version}`,
);

assertDirectory(kanchiRoot, "Kanchi repository");
assertGitRepo(repoRoot, "getkanchi");
assertGitRepo(kanchiRoot, "kanchi");

const head =
  args.head ?? (gitTagExists(kanchiRoot, versionTag) ? versionTag : "HEAD");
const base = args.base ?? inferBaseRef(kanchiRoot, head, versionTag);
const range = `${base}..${head}`;
const commitCount = Number(git(["rev-list", "--count", range], kanchiRoot));

if (commitCount === 0) {
  fail(
    `No Kanchi commits found in ${range}. Pass --base or --head to choose a different range.`,
  );
}

mkdirSync(outputRoot, { recursive: true });

const context = buildContext({
  base,
  date,
  head,
  kanchiRoot,
  range,
  version,
});
const prompt = buildPrompt({ context, date, range, version });

const contextPath = join(outputRoot, "context.md");
const promptPath = join(outputRoot, "agent-prompt.md");
const analysisPath = join(outputRoot, "change-analysis.md");
const githubReleasePath = join(outputRoot, "github-release.md");
const outputJsonPath = join(outputRoot, "agent-output.json");

writeFileSync(contextPath, context);
writeFileSync(promptPath, prompt);

if (args.noAgent) {
  printSummary({
    base,
    contextPath,
    date,
    head,
    kanchiRoot,
    promptPath,
    range,
    version,
  });
  console.log("");
  console.log(
    "Prepared release context only. Run without --no-agent to generate the changelog.",
  );
  process.exit(0);
}

runCodex(prompt, outputJsonPath, args.model, kanchiRoot);
const agentOutput = readAgentOutput(outputJsonPath);
const changelog = renderChangelog({ ...agentOutput, date, version });
const changelogPath = pickChangelogPath(date, version, args.force);

writeFileSync(changelogPath, changelog);
writeFileSync(analysisPath, formatAnalysis(agentOutput.change_analysis));
writeFileSync(
  githubReleasePath,
  normalizeTrailingNewline(agentOutput.github_release_body),
);

printSummary({
  analysisPath,
  base,
  changelogPath,
  contextPath,
  date,
  githubReleasePath,
  head,
  kanchiRoot,
  promptPath,
  range,
  version,
});

console.log("");
console.log("Next local checks:");
console.log("  npm run build");
console.log(`  git diff -- ${relative(repoRoot, changelogPath)}`);

function parseArgs(argv) {
  const options = {
    force: false,
    help: false,
    noAgent: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--no-agent") {
      options.noAgent = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      fail(`Unexpected argument: ${arg}`);
    }

    const [rawKey, rawValue] = arg.slice(2).split("=", 2);
    const key = toCamelCase(rawKey);
    const value = rawValue ?? argv[index + 1];

    if (!rawValue) {
      index += 1;
    }

    if (!value || value.startsWith("--")) {
      fail(`Missing value for --${rawKey}`);
    }

    options[key] = value;
  }

  return options;
}

function printHelp() {
  console.log(`Create Kanchi release notes for getkanchi.

Usage:
  npm run release:kanchi -- --version 1.5.2

Options:
  --version <version>      Required release version, without or with v prefix.
  --date <YYYY-MM-DD>     Changelog date. Defaults to today.
  --base <ref>            Kanchi base ref. Defaults to the latest reachable tag.
  --head <ref>            Kanchi head ref. Defaults to v<version> when it exists, otherwise HEAD.
  --kanchi <path>         Path to the Kanchi repo. Defaults to ../kanchi.
  --model <model>         Optional Codex model override.
  --output-dir <path>     Scratch directory. Defaults to .release-workbench.
  --diff-max-chars <n>    Max Kanchi diff chars sent to Codex. Defaults to 200000.
  --no-agent              Only write the context and prompt.
  --force                 Overwrite an existing changelog file for the same date/version.
  --help                  Show this help.`);
}

function buildContext({ base, date, head, kanchiRoot, range, version }) {
  const diff = truncate(
    git(
      [
        "diff",
        "--find-renames",
        "--find-copies",
        "--function-context",
        "--no-ext-diff",
        range,
      ],
      kanchiRoot,
    ),
    Number(args.diffMaxChars ?? 200000),
  );
  const recentChangelogs = readRecentChangelogs(6);

  return `# Kanchi Release Context

Version: ${version}
Date: ${date}
Kanchi repo: ${kanchiRoot}
Base: ${base}
Head: ${head}
Range: ${range}

## getkanchi status

\`\`\`
${git(["status", "--short", "--branch"], repoRoot)}
\`\`\`

## Kanchi status

\`\`\`
${git(["status", "--short", "--branch"], kanchiRoot)}
\`\`\`

## Kanchi commits

\`\`\`
${git(["log", "--reverse", "--date=short", "--pretty=format:%h %ad %s", range], kanchiRoot)}
\`\`\`

## Kanchi changed files

\`\`\`
${git(["diff", "--name-status", range], kanchiRoot)}
\`\`\`

## Kanchi diff stat

\`\`\`
${git(["diff", "--stat", range], kanchiRoot)}
\`\`\`

## Existing getkanchi changelog tone

${recentChangelogs}

## Kanchi diff

\`\`\`diff
${diff}
\`\`\`
`;
}

function buildPrompt({ context, date, range, version }) {
  return `You are writing Kanchi release notes for the getkanchi website.

Use the supplied context and the existing changelog examples as the source of truth. Your job is to:

1. Inspect the Kanchi changes in ${range}.
2. Describe the change set in much detail for the maintainer.
3. Write public release notes in the existing getkanchi tone of voice.
4. Write a GitHub release body that can be pasted into the Kanchi release.

Constraints:
- Do not modify files. Return only JSON that matches the provided schema.
- Use version ${version} and date ${date}.
- Keep the public changelog concise, concrete, and user-facing.
- Preserve the existing changelog shape: short title, one-sentence description, brief lead, section headings like "What's new" or "What's fixed", bold item labels, and a closing upgrade note.
- Do not invent features or behavior not supported by the diff.
- If the release changes deployment ports, public paths, runtime requirements, or other operator-facing upgrade assumptions, include the "Breaking Change" tag and make the upgrade note explicit.
- Prefer plain ASCII punctuation.
- Mention migrations only when the Kanchi changes require them.
- The GitHub release body may be a little more detailed than the website changelog, but should still be release-note prose rather than an implementation dump.

${context}`;
}

function runCodex(prompt, outputJsonPath, model, kanchiRoot) {
  const codexArgs = [
    "exec",
    "-C",
    repoRoot,
    "--add-dir",
    kanchiRoot,
    "--sandbox",
    "read-only",
    "--output-schema",
    schemaPath,
    "--output-last-message",
    outputJsonPath,
  ];

  if (model) {
    codexArgs.push("--model", model);
  }

  codexArgs.push("-");

  const result = spawnSync("codex", codexArgs, {
    cwd: repoRoot,
    encoding: "utf8",
    input: prompt,
    stdio: ["pipe", "inherit", "inherit"],
  });

  if (result.error) {
    fail(`Failed to run codex: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(
      `Codex exited with status ${result.status}. The prompt is saved for reuse.`,
    );
  }
}

function readAgentOutput(outputJsonPath) {
  if (!existsSync(outputJsonPath)) {
    fail(`Codex did not write ${outputJsonPath}`);
  }

  const raw = readFileSync(outputJsonPath, "utf8").trim();
  const json = stripCodeFence(raw);

  try {
    return JSON.parse(json);
  } catch (error) {
    fail(
      `Could not parse Codex JSON output at ${outputJsonPath}: ${error.message}`,
    );
  }
}

function renderChangelog(output) {
  const tags = output.tags.map((tag) => JSON.stringify(tag)).join(", ");
  const sections = output.sections
    .map((section) => {
      const items = section.items
        .map((item) => `**${item.title}**\n${wrap(item.body)}`)
        .join("\n\n");

      return `## ${section.heading}\n\n${items}`;
    })
    .join("\n\n");

  return normalizeTrailingNewline(`---
title: ${JSON.stringify(output.title)}
description: ${JSON.stringify(output.description)}
date: "${output.date}"
version: "${output.version}"
tags: [${tags}]
---

${wrap(output.lead)}

${sections}

---

${wrap(output.upgrade_note)}
`);
}

function formatAnalysis(changeAnalysis) {
  return normalizeTrailingNewline(`# Change Analysis

${changeAnalysis}
`);
}

function pickChangelogPath(date, version, force) {
  const contentDir = join(repoRoot, "changelog/content");
  const datePath = join(contentDir, `${date}.mdx`);

  if (!existsSync(datePath) || force || hasVersion(datePath, version)) {
    if (existsSync(datePath) && !force && !hasVersion(datePath, version)) {
      fail(
        `${datePath} already exists for a different version. Use --force or --date.`,
      );
    }

    return datePath;
  }

  const versionedPath = join(contentDir, `${date}-${version}.mdx`);

  if (existsSync(versionedPath) && !force) {
    fail(`${versionedPath} already exists. Pass --force to overwrite it.`);
  }

  return versionedPath;
}

function hasVersion(filePath, version) {
  const content = readFileSync(filePath, "utf8");
  return content.includes(`version: "${version}"`);
}

function readRecentChangelogs(count) {
  const contentDir = join(repoRoot, "changelog/content");
  const files = readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      file,
      path: join(contentDir, file),
      sortKey: file,
    }))
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey))
    .slice(0, count);

  return files
    .map((entry) => {
      const content = readFileSync(entry.path, "utf8").trim();
      return `### ${entry.file}\n\n${content}`;
    })
    .join("\n\n");
}

function inferBaseRef(cwd, head, versionTag) {
  if (head === versionTag && gitTagExists(cwd, versionTag)) {
    try {
      const commit = git(["rev-parse", `${head}^{commit}`], cwd);
      return git(["describe", "--tags", "--abbrev=0", `${commit}^`], cwd);
    } catch {
      fail(
        `Could not infer previous tag before ${head}. Pass --base explicitly.`,
      );
    }
  }

  try {
    return git(["describe", "--tags", "--abbrev=0", head], cwd);
  } catch {
    fail(
      `Could not infer latest tag reachable from ${head}. Pass --base explicitly.`,
    );
  }
}

function gitTagExists(cwd, tag) {
  const result = spawnSync(
    "git",
    ["rev-parse", "--verify", "--quiet", `refs/tags/${tag}`],
    {
      cwd,
      encoding: "utf8",
    },
  );

  return result.status === 0;
}

function git(gitArgs, cwd) {
  const result = spawnSync("git", gitArgs, {
    cwd,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 50,
  });

  if (result.error) {
    fail(`git ${gitArgs.join(" ")} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(`git ${gitArgs.join(" ")} failed:\n${result.stderr.trim()}`);
  }

  return result.stdout.trim();
}

function assertDirectory(path, label) {
  if (!existsSync(path)) {
    fail(`${label} not found at ${path}`);
  }
}

function assertGitRepo(path, label) {
  const result = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: path,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    fail(`${label} at ${path} is not a git repository`);
  }
}

function normalizeVersion(value) {
  return value.replace(/^v/, "");
}

function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

function truncate(text, maxChars) {
  if (text.length <= maxChars) {
    return text;
  }

  return `${text.slice(0, maxChars)}

[Diff truncated at ${maxChars} characters. Re-run with --diff-max-chars for a larger context.]`;
}

function stripCodeFence(text) {
  const match = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return match ? match[1] : text;
}

function normalizeTrailingNewline(text) {
  return `${text.trim()}\n`;
}

function wrap(text, width = 80) {
  return text
    .split("\n")
    .map((paragraph) => wrapParagraph(paragraph, width))
    .join("\n");
}

function wrapParagraph(paragraph, width) {
  if (
    !paragraph.trim() ||
    paragraph.startsWith("```") ||
    paragraph.startsWith("|")
  ) {
    return paragraph;
  }

  const words = paragraph.trim().split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    if (!line) {
      line = word;
      continue;
    }

    if (`${line} ${word}`.length > width) {
      lines.push(line);
      line = word;
      continue;
    }

    line = `${line} ${word}`;
  }

  if (line) {
    lines.push(line);
  }

  return lines.join("\n");
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function printSummary(summary) {
  console.log("Kanchi release notes workspace");
  console.log(`  Version: ${summary.version}`);
  console.log(`  Date: ${summary.date}`);
  console.log(`  Kanchi: ${summary.kanchiRoot}`);
  console.log(`  Range: ${summary.range}`);
  console.log(`  Base: ${summary.base}`);
  console.log(`  Head: ${summary.head}`);
  console.log(`  Context: ${relative(repoRoot, summary.contextPath)}`);
  console.log(`  Prompt: ${relative(repoRoot, summary.promptPath)}`);

  if (summary.changelogPath) {
    console.log(`  Changelog: ${relative(repoRoot, summary.changelogPath)}`);
  }

  if (summary.githubReleasePath) {
    console.log(
      `  GitHub release body: ${relative(repoRoot, summary.githubReleasePath)}`,
    );
  }

  if (summary.analysisPath) {
    console.log(
      `  Change analysis: ${relative(repoRoot, summary.analysisPath)}`,
    );
  }
}

function fail(message) {
  console.error(`kanchi-release: ${message}`);
  process.exit(1);
}
