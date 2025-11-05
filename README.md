# KP Natural Hairoils – Next.js App

A modern, minimalist, and responsive website for KP Natural Hairoils built with Next.js 14 (App Router), Tailwind CSS v4, and Shadcn/Radix UI. Includes a secure Admin area backed by Supabase for authentication and basic user management, plus i18n support and a dark/light theme.

## Features

- Next.js 14 (App Router) with TypeScript
- Minimalist UI with responsive layout and subtle, professional hover/focus states
- Dark and light themes via next-themes with strong contrast in Admin
- Shadcn + Radix UI components (Buttons, Cards, Dialogs, Tabs, etc.)
- i18n using react-i18next with a simple LanguageProvider and JSON resources
- Admin area accessible only via URL (/admin) – not linked in the public header
- Supabase-backed Admin authentication (email/password)
  - Forgot password flow + Reset Password page
  - Default admin seeding endpoint (opt-in)
  - Admin-only Users management: list/create users via service role API
- Public pricing API with Admin controls for product price and offer toggle

## Tech stack

- Framework: Next.js 14 (App Router), React 18, TypeScript
- Styling: Tailwind CSS v4, CSS variables, Tailwind Animate
- UI: Radix primitives + Shadcn components (in `components/ui`)
- Icons: lucide-react
- Theme: next-themes (`ThemeProvider`) with system support
- i18n: react-i18next with JSON resources under `public/locales`
- Auth/DB: Supabase JS v2 (browser client + server service role)

## Project structure (high level)

```
app/
  layout.tsx            # Root layout (ThemeProvider, LanguageProvider, SiteHeader)
  page.tsx              # Home page
  products/page.tsx
  reviews/page.tsx
  admin/
    page.tsx            # Admin path gatekeeper (redirects to login or dashboard)
    login/page.tsx      # Admin login with forgot password
    reset-password/page.tsx
    dashboard/page.tsx  # Admin dashboard: pricing controls + users tab
  api/
    public/pricing/route.ts       # GET current pricing, POST update pricing/offer
    admin/users/route.ts          # GET list users, POST create user (admin-only)
    admin/ensure-default/route.ts # Seed default admin (gated by env)
components/
  site-header.tsx       # Public header (no Admin nav link)
  theme-provider.tsx
  language-provider.tsx
  ui/*                  # Shadcn components
lib/
  admin-auth.ts         # Admin sign-in/session/reset helpers (Supabase)
  supabase-client.ts    # Lazy browser client factory (guards at build)
  supabase-server.ts    # Server-only service role client + helpers
public/
  locales/en/common.json
  locales/ta/common.json
```

## Environment variables

Create a `.env.local` in the project root with the following variables.

```
# Supabase (Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side service role key (NEVER expose publicly)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin allowlist (email that can access the Admin area)
NEXT_PUBLIC_ADMIN_EMAIL=sarathykalpana17@gmail.com

# Optional: auto-seed a default admin account via /api/admin/ensure-default
# Set to 'true' temporarily in development to create the account
ADMIN_AUTO_SEED=false

# Only used when ADMIN_AUTO_SEED=true
DEFAULT_ADMIN_PASSWORD=test
```

Notes:

- The app guards Supabase client creation at build time. If you forget to set the env vars, features depending on Supabase just won’t initialize in the browser instead of crashing the build.
- Service role key is used only on the server (API routes) – keep it secret.

## Install & run (Windows PowerShell)

Using pnpm (recommended):

```powershell
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:3000
```

Production build:

```powershell
pnpm build
pnpm start
```

## Admin usage

- Admin entry points:
  - `/admin` → Redirects you to login or dashboard
  - `/admin/login` → Admin login form with forgot password
  - `/admin/reset-password`→ Password update page (via email link)
  - `/admin/dashboard` → Authenticated dashboard (pricing + users)
- The public site header intentionally doesn’t include an Admin link; it’s “only via /admin.”

### Default admin seeding (optional)

1. Set in `.env.local`:
   - `ADMIN_AUTO_SEED=true`
   - `NEXT_PUBLIC_ADMIN_EMAIL=sarathykalpana17@gmail.com`
   - `DEFAULT_ADMIN_PASSWORD=test`
2. Start the dev server and visit `/admin/login` once – this triggers `/api/admin/ensure-default`.
3. Set `ADMIN_AUTO_SEED=false` afterwards for safety.

### Users management

- The Users tab in the dashboard uses the current Supabase session’s bearer token to call `/api/admin/users`.
- Allowed Admin email is checked on the server before listing/creating users.

## i18n

- JSON resources live under `public/locales/{en,ta}/common.json`.
- A custom `LanguageProvider` manages the current language and syncs with `react-i18next`.
- The header includes a language toggle; the rest of the site reads translations from i18next.

## Theme (dark/light)

- Theme is controlled by `ThemeProvider` in `app/layout.tsx`.
- Admin pages have explicit dark variants for borders, backgrounds, and text to maximize contrast.
- Use the theme toggle in the header to switch between modes or follow the OS setting.

## Scripts

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Troubleshooting

- “supabaseUrl is required” during build or runtime

  - Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.
  - The app uses a lazy client factory to avoid build failures, but runtime features still need valid env vars.

- Can’t access Admin after login or Users API returns 401

  - Verify your account email matches `NEXT_PUBLIC_ADMIN_EMAIL`.
  - Confirm the Supabase project auth settings and that you’re signed in.

- Password reset link doesn’t sign you in
  - The reset flow expects Supabase to set the session from the link. Ensure `redirectTo` was generated with your correct origin (dev vs prod).

## Security notes

- The `SUPABASE_SERVICE_ROLE_KEY` is used only in server routes under `/api/admin/*` and must not be exposed to the client.
- Admin APIs validate the bearer token and also enforce an allowlisted Admin email.

## License

This repository is provided as-is for demonstration and internal use. Update licensing as needed for your deployment.
