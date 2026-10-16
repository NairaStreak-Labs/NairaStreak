# Deployment Checklist & Operational Guide

> **Parent Organization**: NairaStreak Labs
> **Platform**: Netlify Static Hosting + Supabase Cloud
> **Target Temporary URL**: `nairastreak.vercel.app` *(Custom domain pending Phase 1 product naming)*
> **Original Lineage URL**: `https://500ksavgoal.netlify.app` *(STRICT PRESERVATION: Never overwrite)*

---

## 1. Pre-Deployment Configuration

### 1.1 Netlify Project Setup
1. Create a brand-new Vercel site linked to `github.com/nairastreak-labs/500k-challenge`.
2. Do **NOT** connect to or import the original site `500ksavgoal.netlify.app`.
3. Set build configuration:
   - **Base directory**: `.`
   - **Build command**: *(none required / blank)*
   - **Publish directory**: `.`

### 1.2 Environment Variables (Netlify Site Configuration)
Configure in Netlify Admin -> Site Configuration -> Environment Variables:
- `SUPABASE_URL`: `https://<your-project>.supabase.co`
- `SUPABASE_ANON_KEY`: `<your-supabase-public-anon-key>`

### 1.3 Security Headers & Routing (`_headers` file)
Ensure `_headers` exists in the publish directory:
```http
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co; img-src 'self' data:; font-src 'self';
```

---

## 2. Supabase Cloud Configuration

- [x] Execute DDL scripts from [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md) (Applied via migration `supabase/migrations/20261012_init_schema.sql`).
- [x] Verify Row Level Security (RLS) is enabled and active on `profiles`, `goals`, and `savings_entries` (Verified with 0 advisor warnings).
- [ ] Configure Auth Site URL and Redirect URLs:
  - Site URL: `https://nairastreak.vercel.app`
  - Redirect URLs: `https://nairastreak.vercel.app/**`, `http://localhost:3000/**`
- [ ] Set up custom email templates for signup confirmation and password resets under Supabase Auth settings.

---

## 3. Post-Deployment Smoke Verification

- [ ] Visit `https://nairastreak.vercel.app` over HTTPS.
- [ ] Verify landing page loads within 1.5 seconds.
- [ ] Register a fresh test account; confirm redirection to Onboarding.
- [ ] Create a goal, log an entry, verify reactive UI update.
- [ ] Refresh page; confirm data persists from Supabase.
- [ ] Test PWA "Add to Home Screen" on mobile Chrome/Safari.
- [ ] Verify that `https://500ksavgoal.netlify.app` remains entirely untouched and operational.
