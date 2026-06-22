# Kanchi Website & Documentation

This repository contains the marketing site, documentation, release notes, and website screenshot capture workflow for Kanchi.

## Quick Start

```bash
npm install
npm run dev
```

The landing page will be available at [http://localhost:3000](http://localhost:3000)

## Common Commands

```bash
npm run dev              # Start the website locally
npm run lint             # Run Biome checks
npm run build            # Build the production site
npm run capture:kanchi   # Refresh website screenshots from a local Kanchi app
npm run release:kanchi   # Generate release notes from Kanchi changes
```

## Kanchi Screenshot Capture

The website screenshots are generated from the real Kanchi application, not hand-built mockups. The capture command expects this repository and `kanchi` to be siblings:

```text
/repos/private/
  getkanchi/
  kanchi/
```

Run:

```bash
npm run capture:kanchi
```

The script will:

1. Seed a local marketing database in `.capture-workbench/`.
2. Start the Kanchi FastAPI backend and Nuxt frontend on local ports.
3. Suppress local dev-only overlays such as Nuxt DevTools.
4. Capture the product screenshots into `public/images/screenshots/`.
5. Stop the local Kanchi processes when it is done.

Useful options:

```bash
npm run capture:kanchi -- --headed
npm run capture:kanchi -- --keep-open
npm run capture:kanchi -- --kanchi-root /path/to/kanchi
npm run capture:kanchi -- --frontend-port 3001 --backend-port 8766
```

If Playwright cannot launch Chromium, install the browser once:

```bash
npx playwright install chromium
```

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with fonts
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles & Kanchi theme
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   ├── screenshots.tsx
│   │   │   ├── differentiators.tsx
│   │   │   ├── cta.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       └── utils.ts           # Utility functions
├── docs/                      # Documentation content
├── scripts/                   # Release notes and screenshot automation
└── public/                    # Static assets
```

## Design System

### Colors

Based on the Kanchi brand palette:

- **Primary**: `hsl(158, 64%, 52%)` - Emerald-turquoise
- **Success**: `hsl(158, 64%, 52%)`
- **Error**: `hsl(347, 77%, 60%)`
- **Warning**: `hsl(45, 85%, 65%)`
- **Info**: `hsl(199, 89%, 58%)`
- **Retry**: `hsl(24, 95%, 58%)`

### Typography

- **Display**: Archivo - Headings and emphasis
- **Body**: Inter - Body text and UI
- **Mono**: JetBrains Mono - Code and technical content

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Documentation**: Fumadocs MDX

## Product Story

The homepage presents Kanchi as a serious Celery operations cockpit:

1. Real-time task and worker visibility.
2. Orphan detection and rerun recovery.
3. Reviewable rerun inputs with safe skips.
4. Durable action history.
5. Progress reporting for long-running work.
6. Workflow guardrails and retention controls.

## Design Direction

- Dark-first and operational.
- Product screenshots over decorative illustration.
- Dense enough for engineers, polished enough for buyers.
- Copy that names real failure modes instead of abstract observability claims.

## Documentation

Documentation is compiled into the Next.js app through Fumadocs MDX.

```bash
npm run dev
```

Documentation will be available at [http://localhost:3000/docs](http://localhost:3000/docs)

## Deployment

Pushing this repository to `main` deploys the website through the existing hosting setup. Do not change the GitHub workflows for release note or screenshot work; keep the process local and commit the generated site content.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

This software is free and open source, licensed under MIT. You are free to use, modify, and distribute it.
