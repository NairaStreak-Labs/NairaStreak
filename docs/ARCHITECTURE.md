# Architecture Documentation — Web V1

> **Parent Organization**: NairaStreak Labs  
> **Target Release**: Web V1  
> **Infrastructure Model**: Client-Side Single Page Application (SPA/PWA) + Managed Backend-as-a-Service (Supabase) + Static CDN (Netlify)

---

## 1. System Topology Overview

```mermaid
flowchart TD
    subgraph ClientDevice ["Client Device (Browser / PWA)"]
        UI["Web App Shell (HTML5 / Modern JS)"]
        Router["Client View Router"]
        StateEngine["Reactive State & Cache Layer"]
        SW["Service Worker (sw.js)"]
    end

    subgraph CDN ["Static Delivery Network (Netlify)"]
        Edge["Global CDN Edge"]
        StaticAssets["Static HTML, CSS, JS, Icons"]
    end

    subgraph CloudBackend ["Cloud Backend (Supabase Platform)"]
        AuthSvc["Supabase GoTrue (Auth & JWTs)"]
        PostgresDB[("PostgreSQL 15+ with RLS")]
        Realtime["PostgREST API Engine"]
    end

    ClientDevice <-->|"1. Fetch App Shell"| Edge
    Edge <--> StaticAssets

    UI -->|"2. Authenticate (Email/Password)"| AuthSvc
    AuthSvc -->|"3. Issue JWT & Refresh Token"| UI

    UI -->|"4. Read/Write Data via HTTPS + Bearer JWT"| Realtime
    Realtime <-->|"5. Execute Queries under RLS"| PostgresDB

    SW -.->|"Cache Static Shell Only"| UI
```

---

## 2. Component Specifications

### 2.1 Static Edge Tier (Netlify)
- **Role**: Serves immutable frontend application code (HTML, CSS, modular JS, images, PWA manifest) over HTTPS with HTTP/2 and Brotli compression.
- **Independence**: Fully decoupled from `https://500ksavgoal.netlify.app`. Deployed to a new site instance (e.g. `nairastreak-web.netlify.app`).
- **Security Headers**: Content Security Policy (CSP), X-Frame-Options, Strict-Transport-Security, and X-Content-Type-Options configured in `_headers` or `netlify.toml`.

### 2.2 Client Application Tier (Frontend)
- **View Router**: Lightweight state or hash router managing navigation between `/` (Public Landing), `/onboarding`, `/dashboard`, `/history`, and `/settings`.
- **Auth Guard**: Middleware checking session presence before mounting protected routes. Redirects unauthenticated users to the public landing page.
- **Service Worker (`sw.js`)**:
  - Serves static app shell assets during network outages.
  - **Explicit Security Constraint**: Strictly configured to NEVER intercept or cache requests to Supabase API endpoints (`*.supabase.co`) or store JWT auth tokens in Cache Storage.

### 2.3 Cloud Persistence & Auth Tier (Supabase)
- **Authentication**: Managed GoTrue service handling user registration, password hashing (bcrypt), session tokens, and password reset workflows.
- **Database**: Managed PostgreSQL database storing relational records (`users`, `goals`, `savings_entries`).
- **Row Level Security (RLS)**: Enforces complete multi-tenant tenant isolation at the database engine level. Even if a malicious request attempts to read records belonging to another `user_id`, the database query returns 0 rows.

---

## 3. Data & Communication Sequence

### 3.1 Authentication & Session Hydration Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Web App Shell
    participant Auth as Supabase Auth
    participant DB as PostgreSQL (RLS)

    User->>App: Submits Email & Password
    App->>Auth: signInWithPassword(email, password)
    Auth-->>App: Returns AuthSession (JWT + Refresh Token)
    App->>App: Stores session in localStorage (supabase.auth.token)
    App->>DB: SELECT * FROM goals WHERE user_id = auth.uid()
    DB-->>App: Returns active user goals
    App->>DB: SELECT * FROM savings_entries WHERE goal_id = activeGoal.id
    DB-->>App: Returns user savings history
    App->>User: Renders personalized Dashboard with calculated streak
```

### 3.2 Savings Entry Mutation Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as Web App Shell
    participant DB as PostgreSQL (RLS)

    User->>App: Enters amount (e.g. ₦5,000) & clicks "Save"
    App->>App: Disables button & shows loading state
    App->>DB: INSERT INTO savings_entries (goal_id, user_id, amount, saved_at)
    DB-->>App: Returns inserted record (201 Created)
    App->>App: Recalculates Total, Streak, Milestones
    App->>User: Displays confetti (if milestone reached) & toast confirmation
```
