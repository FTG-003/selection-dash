## Manus Analytics Dashboard (Minimal)

A minimal, stable Next.js 14 + React 18 dashboard using Mantine 7 and mantine-datatable.

### Requirements
- Node.js 18+

### Install
```bash
npm install
```

### Develop
```bash
npm run dev
```

### Build
```bash
npm run build && npm start
```

### Project Structure
- `app/` App Router entrypoints (`layout.tsx`, `page.tsx`)
- `components/` UI components (`ErrorAlert`, `Surface`, `PageHeader`, `RawDataTable`)
- `contexts/` Theme customizer context
- `hooks/` React hooks (`useFetchData`)
- `layouts/` Layout components (`MainLayout`)
- `public/` Static assets (mocks)
- `theme/` Mantine theme creation
- `scripts/` (optional) Python data generators

### Environment
Copy `.env.example` to `.env` and adjust values as needed.

### Notes
- Static data served from `public/mocks/simulated_data.json`.
- Unused dependencies and demo components were removed for clarity.
