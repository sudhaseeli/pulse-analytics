# Pulse Analytics

A responsive analytics dashboard built with React, TypeScript, Vite, and Recharts. Includes revenue trends, visitor and conversion metrics, traffic distribution, searchable channel performance, date and channel filters, and CSV export.

## Run locally

Requires Node.js 22.18+ (Node.js 24 recommended) and npm.

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm test
npm run build
npm run preview
```

The production output is in `dist/` and can be deployed to a static hosting service. Configure the deployment build command as `npm run build` and output directory as `dist`.

## Data

All metrics are deterministic sample data, not live customer analytics. Date ranges scale the sample dataset; comparison curves are illustrative. No credentials, database, tracking scripts, or backend services are required. Connect your analytics API by replacing the data model in `src/analytics.ts`. Fonts use Google Fonts when reachable, with local system fallbacks.

## Project structure

- `src/main.tsx`: dashboard and interactive controls
- `src/analytics.ts`: sample data, aggregation, and CSV formatting
- `src/analytics.test.ts`: data and export tests
- `src/style.css`: responsive styling
