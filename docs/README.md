# Kanchi Documentation

This directory contains the Mintlify documentation for Kanchi.

## Local Development

To run the documentation locally:

```bash
# Install Mintlify CLI
npm i -g mintlify

# Start the dev server
cd docs
mintlify dev
```

The documentation will be available at `http://localhost:3000`.

## Deployment

Documentation can be deployed to:
- Mintlify hosting (recommended)
- Vercel
- Netlify
- Any static hosting service

## Structure

```
docs/
├── mint.json              # Mintlify configuration
├── introduction.mdx       # Getting started
├── quickstart.mdx         # Quick start guide
├── installation.mdx       # Installation guide
├── core/                  # Core concepts
│   ├── architecture.mdx
│   ├── orphan-detection.mdx
│   └── ...
├── configuration/         # Configuration guides
├── features/              # Feature documentation
├── deployment/            # Deployment guides
└── api-reference/         # API documentation
```

## Writing Docs

- Use MDX format for all documentation
- Follow the existing structure and style
- Include code examples where relevant
- Add screenshots/diagrams to `/images` folder
- Test locally before committing

## Contributing

See the main CONTRIBUTING.md for guidelines on contributing to documentation.
