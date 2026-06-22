#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { access, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const defaultKanchiRoot = resolve(repoRoot, "..", "kanchi");
const defaultWorkbench = join(repoRoot, ".capture-workbench");
const defaultDbPath = join(defaultWorkbench, "kanchi-marketing.db");
const defaultOutDir = join(repoRoot, "public", "images", "screenshots");

const args = parseArgs(process.argv.slice(2));
const kanchiRoot = resolve(args["kanchi-root"] ?? defaultKanchiRoot);
const databasePath = resolve(args["database-path"] ?? defaultDbPath);
const outDir = resolve(args.out ?? defaultOutDir);
const backendPort = Number(args["backend-port"] ?? 8765);
const frontendPort = Number(args["frontend-port"] ?? 3000);
const shouldSeed = !args["skip-seed"];
const shouldStart = !args["no-start"] && !args["app-url"];
const seedOnly = Boolean(args["seed-only"]);
const headed = Boolean(args.headed);
const keepOpen = Boolean(args["keep-open"]);

const backendUrl = `http://127.0.0.1:${backendPort}`;
const frontendUrl = `http://127.0.0.1:${frontendPort}/`;
const frontendOrigin = `http://127.0.0.1:${frontendPort}`;
const appUrl = args["app-url"] ?? (shouldStart ? frontendUrl : undefined);
const runtimeApiUrl = args["api-url"] ?? (shouldStart ? backendUrl : "");
const runtimeWsUrl =
  args["ws-url"] ?? (shouldStart ? `ws://127.0.0.1:${backendPort}/ws` : "");

const children = [];
const captureChromeCss = `
  #__nuxt-devtools-container,
  #nuxt-devtools-container,
  #__vue-devtools-container,
  [data-nuxt-devtools],
  [data-v-inspector],
  nuxt-devtools,
  vue-devtools,
  vite-plugin-vue-inspector,
  iframe[src*="__nuxt_devtools__"],
  iframe[src*="/__nuxt_devtools__"],
  iframe[title*="Nuxt DevTools"],
  iframe[title*="Vue Devtools"],
  iframe[title*="Vue DevTools"],
  div[id*="nuxt-devtools"],
  div[class*="nuxt-devtools"],
  div[id*="vue-devtools"],
  div[class*="vue-devtools"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;

try {
  await mkdir(outDir, { recursive: true });
  await mkdir(join(defaultWorkbench, "logs"), { recursive: true });

  let seedSummary = null;
  if (shouldSeed) {
    seedSummary = await seedDatabase();
    console.log(`Seeded Kanchi database: ${seedSummary.databasePath}`);
  }

  if (seedOnly) {
    console.log("Seed-only mode complete.");
  } else {
    if (!appUrl) {
      fail(
        "Missing --app-url. Omit --no-start to let this script start Kanchi.",
      );
    }

    if (shouldStart) {
      await startKanchi();
    }

    await captureScreenshots(appUrl);
    console.log(`Captured Kanchi screenshots in ${relativePath(outDir)}`);
  }
} catch (error) {
  console.error(`capture-kanchi-screenshots: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (!keepOpen) {
    await stopChildren();
  } else if (children.length > 0) {
    console.log(
      "Leaving Kanchi capture servers running because --keep-open was set.",
    );
  }
}

async function seedDatabase() {
  const python = await findPython();
  const stdout = await runAndCapture(
    python,
    [
      join(scriptDir, "kanchi-marketing-seed.py"),
      "--kanchi-root",
      kanchiRoot,
      "--database-path",
      databasePath,
    ],
    { cwd: join(kanchiRoot, "agent") },
  );

  const jsonStart = stdout.indexOf("{");
  if (jsonStart === -1) {
    fail(`Seed script did not return JSON:\n${stdout}`);
  }
  return JSON.parse(stdout.slice(jsonStart));
}

async function startKanchi() {
  const python = await findPython();
  const backendLog = join(defaultWorkbench, "logs", "kanchi-backend.log");
  const frontendLog = join(defaultWorkbench, "logs", "kanchi-frontend.log");

  children.push(
    spawnLogged(
      "kanchi-backend",
      python,
      ["app.py"],
      {
        cwd: join(kanchiRoot, "agent"),
        env: {
          ...process.env,
          AUTH_ENABLED: "false",
          CELERY_BROKER_URL: "memory://",
          DATABASE_URL: `sqlite:///${databasePath}`,
          DEVELOPMENT_MODE: "false",
          LOG_LEVEL: "WARNING",
          NUXT_PUBLIC_API_URL: "",
          NUXT_PUBLIC_FRONTEND_URL: "/ui",
          NUXT_PUBLIC_WS_URL: "/ws",
          WS_HOST: "127.0.0.1",
          WS_PORT: String(backendPort),
          ALLOWED_ORIGINS: `${frontendOrigin},http://localhost:${frontendPort}`,
        },
      },
      backendLog,
    ),
  );

  await waitForHttp(`${backendUrl}/api/health`, "Kanchi backend");

  children.push(
    spawnLogged(
      "kanchi-frontend",
      "npm",
      [
        "run",
        "dev",
        "--",
        "--host",
        "127.0.0.1",
        "--port",
        String(frontendPort),
      ],
      {
        cwd: join(kanchiRoot, "frontend"),
        env: {
          ...process.env,
          NUXT_APP_BASE_URL: "/",
          NUXT_DEVTOOLS: "false",
          NUXT_DEVTOOLS_ENABLED: "false",
          NUXT_PUBLIC_API_URL: backendUrl,
          NUXT_PUBLIC_WS_URL: `ws://127.0.0.1:${backendPort}/ws`,
        },
      },
      frontendLog,
    ),
  );

  await waitForHttp(frontendUrl, "Kanchi frontend");
}

async function captureScreenshots(baseUrl) {
  let browser;
  try {
    browser = await chromium.launch({ headless: !headed });
  } catch (error) {
    fail(
      `Unable to launch Chromium through Playwright.\n` +
        `Run: npx playwright install chromium\n\n${error.message}`,
    );
  }

  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });
    await context.addInitScript(
      ({ apiUrl, css, wsUrl }) => {
        window.localStorage.clear();
        if (apiUrl || wsUrl) {
          window.__KANCHI_BACKEND_URLS__ = {
            apiUrl,
            wsUrl,
            frontendUrl: "/",
            urlPrefix: "",
          };
        }

        window.__hideKanchiCaptureChrome = () => {
          if (!document.documentElement) return;

          const existing = document.getElementById("kanchi-capture-css");
          if (!existing) {
            const style = document.createElement("style");
            style.id = "kanchi-capture-css";
            style.textContent = css;
            document.documentElement.appendChild(style);
          }

          document
            .querySelectorAll(
              [
                "#__nuxt-devtools-container",
                "#nuxt-devtools-container",
                "#__vue-devtools-container",
                "[data-nuxt-devtools]",
                "[data-v-inspector]",
                "nuxt-devtools",
                "vue-devtools",
                "vite-plugin-vue-inspector",
                'iframe[src*="__nuxt_devtools__"]',
                'iframe[src*="/__nuxt_devtools__"]',
                'iframe[title*="Nuxt DevTools"]',
                'iframe[title*="Vue Devtools"]',
                'iframe[title*="Vue DevTools"]',
              ].join(","),
            )
            .forEach((element) => {
              element.remove();
            });
        };

        window.__startKanchiCaptureChromeObserver = () => {
          if (!document.documentElement || window.__kanchiCaptureObserver) {
            return;
          }

          window.__kanchiCaptureObserver = new MutationObserver(
            window.__hideKanchiCaptureChrome,
          );
          window.__kanchiCaptureObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
          });
        };

        window.__hideKanchiCaptureChrome();
        window.__startKanchiCaptureChromeObserver();
        document.addEventListener("DOMContentLoaded", () => {
          window.__hideKanchiCaptureChrome();
          window.__startKanchiCaptureChromeObserver();
        });
      },
      { apiUrl: runtimeApiUrl, css: captureChromeCss, wsUrl: runtimeWsUrl },
    );

    const page = await context.newPage();
    page.setDefaultTimeout(20_000);

    await captureOperations(page, baseUrl);
    await captureRerunReview(page, baseUrl);
    await captureActionHistory(page, baseUrl);
    await captureTaskProgress(page, baseUrl);
    await captureWorkflow(page, baseUrl);
    await captureRetention(page, baseUrl);
  } finally {
    await browser.close().catch(() => {});
  }
}

async function captureOperations(page, baseUrl) {
  await goto(page, baseUrl, "/");
  await page.waitForSelector("text=Failed tasks");
  await expandIssuePanel(page, "Failed tasks");
  await expandIssuePanel(page, "Orphaned tasks", { optional: true });
  await page.waitForTimeout(1_500);
  await page.screenshot({ path: join(outDir, "operations-cockpit.png") });
  await page.screenshot({ path: join(outDir, "dashboard-overview.png") });
}

async function captureRerunReview(page, baseUrl) {
  await goto(page, baseUrl, "/tasks/mkt-payment-webhook-repairable");
  await page.waitForSelector("text=billing.invoices.capture_payment");
  const rerunButton = page
    .locator('button:has-text("Rerun"):not([disabled])')
    .first();
  await rerunButton.waitFor();
  await rerunButton.click();
  await page.waitForSelector("text=Review rerun inputs");
  await page.waitForSelector("text=Needs input");
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(outDir, "rerun-review.png") });
}

async function captureActionHistory(page, baseUrl) {
  await goto(page, baseUrl, "/");
  await page
    .getByRole("button", { name: /Activity|Running|No activity/ })
    .first()
    .click();
  await page.waitForSelector("text=Recent actions");
  await page.locator('aside button:has-text("Rerun")').first().click();
  await page.waitForSelector("text=Rerun history");
  await page.waitForSelector("text=Sent after repair");
  await page.screenshot({ path: join(outDir, "action-history.png") });
}

async function captureTaskProgress(page, baseUrl) {
  await goto(page, baseUrl, "/tasks/mkt-catalog-import-running");
  await page.waitForSelector("text=Progress");
  await page.waitForSelector("text=Upsert products");
  await page.screenshot({ path: join(outDir, "task-progress.png") });
}

async function captureWorkflow(page, baseUrl) {
  await goto(
    page,
    baseUrl,
    "/workflows/marketing-workflow-critical-failures/edit",
  );
  await page.waitForSelector("text=Workflow Builder");
  await page.waitForSelector("text=Circuit Breaker");
  await page.getByText("Circuit Breaker").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(outDir, "workflow-guardrails.png") });
}

async function captureRetention(page, baseUrl) {
  await goto(page, baseUrl, "/settings/workspace");
  await page.waitForSelector("text=Data retention");
  await page.waitForSelector("text=Automatic cleanup");
  await page.screenshot({ path: join(outDir, "retention-controls.png") });
}

async function expandIssuePanel(page, title, options = {}) {
  const button = page
    .getByRole("button", { name: new RegExp(title, "i") })
    .first();
  if ((await button.count()) === 0) {
    if (options.optional) return false;
    fail(`Could not find issue panel: ${title}`);
  }
  await button.click();
  return true;
}

async function goto(page, baseUrl, route) {
  const target = resolveAppUrl(baseUrl, route);
  await page.goto(target, { waitUntil: "networkidle" });
  await hideCaptureChrome(page);
}

async function hideCaptureChrome(page) {
  await page.addStyleTag({ content: captureChromeCss }).catch(() => {});
  await page
    .evaluate(() => window.__hideKanchiCaptureChrome?.())
    .catch(() => {});
}

function resolveAppUrl(baseUrl, route) {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedRoute = route.replace(/^\//, "");
  return new URL(normalizedRoute, normalizedBase).toString();
}

async function findPython() {
  const venvPython = join(kanchiRoot, "agent", ".venv", "bin", "python");
  try {
    await access(venvPython);
    return venvPython;
  } catch {
    return "python3";
  }
}

function spawnLogged(name, command, commandArgs, options, logPath) {
  const log = createWriteStream(logPath, { flags: "a" });
  log.write(
    `\n--- ${new Date().toISOString()} ${name}: ${command} ${commandArgs.join(" ")} ---\n`,
  );
  const child = spawn(command, commandArgs, {
    ...options,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.pipe(log);
  child.stderr.pipe(log);
  child.once("exit", (code, signal) => {
    log.write(`\n--- ${name} exited code=${code} signal=${signal} ---\n`);
    log.end();
  });
  child.once("error", (error) => {
    log.write(`\n--- ${name} failed: ${error.message} ---\n`);
  });
  return child;
}

async function runAndCapture(command, commandArgs, options) {
  const child = spawn(command, commandArgs, {
    ...options,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  const exitCode = await new Promise((resolveExit, rejectExit) => {
    child.once("error", rejectExit);
    child.once("exit", (code) => resolveExit(code));
  });
  if (exitCode !== 0) {
    fail(
      `${command} ${commandArgs.join(" ")} failed with exit ${exitCode}\n${stderr}`,
    );
  }
  return stdout;
}

async function waitForHttp(url, label) {
  const startedAt = Date.now();
  let lastError = null;
  while (Date.now() - startedAt < 60_000) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(750);
  }
  fail(
    `${label} did not become ready at ${url}: ${lastError?.message ?? "timeout"}`,
  );
}

async function stopChildren() {
  await Promise.all(
    children.map(
      (child) =>
        new Promise((resolveStop) => {
          if (child.exitCode !== null || child.signalCode !== null) {
            resolveStop();
            return;
          }
          child.once("exit", resolveStop);
          child.kill("SIGTERM");
          setTimeout(() => {
            if (child.exitCode === null && child.signalCode === null) {
              child.kill("SIGKILL");
            }
            resolveStop();
          }, 4_000).unref();
        }),
    ),
  );
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const [key, inlineValue] = token.slice(2).split("=");
    if (inlineValue !== undefined) {
      parsed[key] = inlineValue;
      continue;
    }
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      parsed[key] = next;
      index += 1;
    } else {
      parsed[key] = true;
    }
  }
  return parsed;
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function relativePath(path) {
  return path.replace(`${repoRoot}/`, "");
}

function fail(message) {
  throw new Error(message);
}
