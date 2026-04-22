# CSMT Temple Website — Client

React + Vite + TypeScript frontend for the CSMT Temple management portal.

## Prerequisites

- Node.js 20+
- Server running on `http://localhost:5000` (see `../server/README.md`)

## Setup

```bash
npm install
npm run dev       # starts on http://localhost:3000
npm run build     # production build
npm run lint      # ESLint (JS + TS)
```

## Key Libraries

| Purpose | Library |
|---|---|
| Routing | React Router v6 |
| State | Redux Toolkit |
| Server state | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Toasts | Sonner |
| HTTP | Axios (with JWT interceptor) |
| Icons | lucide-react |
| Dates | date-fns |

## Environment

Vite proxies `/api` → `http://localhost:5000` in dev (see `vite.config.ts`).
No `.env` file needed for local development.
