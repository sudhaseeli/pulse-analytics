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

## Power BI and Salesforce dashboards

Use the dashboard switcher above the overview to open the new Power BI revenue and Salesforce pipeline pages. Salesforce includes an owner filter that updates its metrics, chart, and opportunity table. Both previews are explicitly labeled sample data.

- [`integrations/power-bi`](integrations/power-bi/README.md): revenue CSV, DAX measures, and native report/dashboard creation instructions. The Power BI page can embed an existing secure report URL for authorized viewers.
- [`integrations/salesforce`](integrations/salesforce/README.md): sample opportunities and native Salesforce report/dashboard instructions. The Salesforce page opens your configured dashboard in Salesforce.

These files are setup assets, not published Power BI or Salesforce dashboards. Creating native dashboards requires the corresponding tools/accounts. Live service access has not been configured or verified. Dashboard URLs are held only in browser memory and reset on reload or switching pages; no secrets are required by the previews.
