# Record Ingestion App

A Simple React app built with Vite and TypeScript, featuring user authentication, file uploads, and record viewing. Uses `axios-mock-adapter` for mock APIs and `localStorage` for persistence, styled with `shadcn/ui` and Tailwind CSS.

[Watch Demo 📹](https://vimeo.com/1069804731)

---

## Features
- **Authentication**: Register, login, logout.
- **File Upload**: CSV/XLSX (≤5MB) with metadata; simulates processing.
- **Records**: View uploaded file details.
- **Routing**: Protected `/main/*` and guarded `/auth/*` routes.
- **UI**: Responsive `shadcn/ui` components with toasts.
- **Validation**: React Hook Form and Zod for form Validation

## Tech Stack
- React 18 + TypeScript
- Vite
- `shadcn/ui` + Tailwind CSS
- React Context + `SecureStorage` (`localStorage`)
- `axios` + `axios-mock-adapter`
- `react-hook-form` + Zod
- `react-router`

## Setup
1. Clone: `git clone https://github.com/JanetEne/record-ingestion-app.git`
2. Install: `npm install`
3. Run: `npm run dev` (open `http://localhost:5173`)

Build: `npm run build && npm run preview`
