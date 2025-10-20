# Kanchi Landing Page & Documentation

> Real-time Celery monitoring with automatic orphan detection. Built for developers.

This repository contains the marketing site and documentation for Kanchi.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

The landing page will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with fonts
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles & Kanchi theme
│   ├── components/
│   │   ├── magicui/           # Magic UI components
│   │   │   ├── terminal.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   ├── number-ticker.tsx
│   │   │   ├── orbiting-circles.tsx
│   │   │   ├── animated-beam.tsx
│   │   │   ├── retro-grid.tsx
│   │   │   ├── shimmer-button.tsx
│   │   │   ├── border-beam.tsx
│   │   │   └── animated-grid-pattern.tsx
│   │   ├── sections/          # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   ├── differentiators.tsx
│   │   │   ├── cta.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       └── utils.ts           # Utility functions
├── docs/                      # Mintlify documentation
│   ├── mint.json             # Mintlify config
│   ├── introduction.mdx
│   ├── quickstart.mdx
│   ├── installation.mdx
│   └── core/
└── public/                    # Static assets
```

## 🎨 Design System

### Colors

Based on the Kanchi brand palette:

- **Primary**: `hsl(158, 64%, 52%)` - Emerald-turquoise
- **Success**: `hsl(158, 64%, 52%)`
- **Error**: `hsl(347, 77%, 60%)`
- **Warning**: `hsl(45, 85%, 65%)`
- **Info**: `hsl(199, 89%, 58%)`
- **Retry**: `hsl(24, 95%, 58%)`
- **Special**: `hsl(263, 70%, 65%)`

### Typography

- **Display**: Archivo - Headings and emphasis
- **Body**: Inter - Body text and UI
- **Mono**: JetBrains Mono - Code and technical content

### Magic UI Components Used

- ✅ Terminal - Animated terminal with typing effect
- ✅ Bento Grid - Compact feature showcase
- ✅ Number Ticker - Animated statistics
- ✅ Orbiting Circles - Floating icons around elements
- ✅ Animated Beam - Connection lines between elements
- ✅ Retro Grid - Background grid pattern
- ✅ Shimmer Button - Animated CTA buttons
- ✅ Border Beam - Hover effects on cards

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Magic UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Documentation**: Mintlify

## 📄 Key Features Highlighted

1. **Orphan Detection** - Automatic detection and recovery
2. **Real-Time WebSocket** - Zero-latency monitoring
3. **Workflow Automation** - Event-driven actions
4. **Worker Health** - System metrics and monitoring
5. **Advanced Analytics** - Built-in statistics
6. **Multi-Environment** - Prod/staging/dev support

## 🎯 Design Philosophy

- **Dark-first** - Optimized for dark mode
- **Developer-focused** - Technical and precise
- **Terminal-familiar** - Monospace code blocks
- **Performance-focused** - Fast animations, no fake loaders
- **Direct tone** - "No BS, Just Insight"

## 📚 Documentation

Documentation is built with Mintlify. To run locally:

```bash
# Install Mintlify CLI
npm i -g mintlify

# Start docs server
cd docs
mintlify dev
```

Documentation will be available at [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Landing Page (Vercel)

```bash
# Deploy to Vercel
vercel

# Or connect your repo to Vercel for automatic deployments
```

### Documentation (Mintlify)

Connect your repository to Mintlify for automatic documentation deployment.

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

Functional Source License (FSL) 1.1 - see [LICENSE](LICENSE) for details.

This software is licensed under the FSL 1.1 for non-commercial use. After 2 years from the date of first public availability, it will automatically convert to the Apache License 2.0.

---

Built with ❤️ for developers who need real-time Celery monitoring.
