# Security, Privacy & Data Protection Policy

> **Parent Organization**: NairaStreak Labs  
> **Security Baseline**: Web V1 Production Standards

---

## 1. Authentication Security Standards

### 1.1 Prohibition of Homegrown Authentication
> [!IMPORTANT]
> Writing custom JWT signing, homemade password hashing, or custom cookie token generators is strictly prohibited.

- Authentication is managed exclusively by **Supabase Auth (GoTrue)**.
- Passwords are encrypted on the server side using industry-standard bcrypt hashing.
- Transport-layer security requires HTTPS for all requests, preventing session hijacking or eavesdropping.

### 1.2 Session Token Handling & Storage
- Supabase access tokens (short-lived JWTs) and refresh tokens are stored in the client session storage/localStorage under standard scoped keys.
- **Service Worker Quarantine**: The Service Worker (`sw.js`) is strictly configured never to store, inspect, or cache authentication headers, JWT tokens, or API requests containing user credentials.

---

## 2. Multi-Tenant Data Isolation (Row Level Security)

### 2.1 Threat Model: Cross-User Data Access
In a multi-user web application, a compromised or malicious client might forge a request containing another user's `user_id` or `goal_id`.

### 2.2 Mitigation Strategy
Cross-user isolation is enforced **at the database engine level** via PostgreSQL Row Level Security (RLS).
- The client cannot bypass RLS even if they modify client-side JavaScript.
- Supabase inspects the cryptographically signed JWT claim (`auth.uid()`).
- Any query where `auth.uid() != user_id` automatically returns 0 rows.
- Negative tests must verify that User B attempting to query User A's goals receives an empty result set.

---

## 3. Privacy & Non-Custodial Disclosure

### 3.1 Core Privacy Commitment
1. **We Do Not Hold User Funds**: NairaStreak Labs has zero custody of customer deposits, fiat funds, or bank accounts.
2. **Savings Tracking Only**: Users deposit their money into their own independent bank accounts, fintech vaults, or cash boxes. NairaStreak Labs is solely a behavioral tracking and accountability tool.
3. **Minimal Data Footprint**: We collect only:
   - Account email (for authentication and password recovery).
   - Goal target figures, dates, and logged amounts.
   - User UI preferences (theme, notification schedules).
4. **Zero Data Monetization**: User data is never sold, leased, or transmitted to third-party data brokers or marketing networks.

---

## 4. Input Validation & Defense-in-Depth

- **Numeric Sanitization**: All savings amounts must be positive numbers (`amount > 0`). Negative numbers, NaN, or non-numeric strings are rejected at both client form validation and database check constraints.
- **XSS Prevention**: All user notes and goal titles are sanitized and injected into the DOM via `textContent` or framework text nodes, never raw `innerHTML`.
- **Content Security Policy (CSP)**:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co; img-src 'self' data:; font-src 'self';
  ```
