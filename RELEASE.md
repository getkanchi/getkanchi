# Kanchi Release Notes

This repo has a local release-notes helper for the recurring Kanchi flow. It
does not push, tag, deploy, or change GitHub workflows.

From `getkanchi`, run:

```bash
npm run release:kanchi -- --version 1.5.2
```

The command:

- reads the Kanchi repo from `../kanchi`;
- chooses `v<version>` as the head when that tag already exists, otherwise
  uses `HEAD`;
- chooses the previous reachable Kanchi tag as the base unless `--base` is
  provided;
- asks the local `codex` CLI to inspect the Kanchi changes in read-only mode;
- writes a website changelog entry to `changelog/content/`;
- writes maintainer analysis and a GitHub-release-ready body to
  `.release-workbench/`.

Useful variants:

```bash
# Prepare context and a prompt, but do not call Codex.
npm run release:kanchi -- --version 1.5.2 --no-agent

# Compare a specific Kanchi range.
npm run release:kanchi -- --version 1.5.2 --base v1.5.1 --head HEAD

# Document an already-created Kanchi tag.
npm run release:kanchi -- --version 1.5.1
```

After the command finishes:

1. Review the generated `changelog/content/*.mdx`.
2. Run `npm run build`.
3. Commit and push `getkanchi` to `main` for the normal autodeploy.
4. Use `.release-workbench/kanchi-<version>/github-release.md` when creating the
   GitHub release in the Kanchi repo.
