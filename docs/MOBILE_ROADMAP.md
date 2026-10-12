# Mobile Roadmap — Future Client Strategy

> **Parent Brand**: NairaStreak Labs  
> **Status**: Deferred strictly until Web V1 Completion Gate is passed.

---

## 1. Directive Mobile Rule

**Do not build a mobile app yet.**

The primary mandate is to achieve a rock-solid, production-grade Web V1 application. All backend services, data contracts, and core customer flows must be battle-tested on the web before investing engineering bandwidth into native or wrapper mobile applications.

---

## 2. API-First Design for Mobile Reusability

To ensure seamless future mobile client development, all Web V1 data layers must adhere to strict decoupling principles:
1. **Centralized Data Layer (Supabase)**:
   - All persistence and auth operations communicate via standard RESTful/GraphQL/SDK contracts provided by Supabase.
   - Any mobile client (React Native, Flutter, Swift, Kotlin, or Capacitor) can consume the exact same database tables and Row Level Security policies without backend changes.
2. **Encapsulated Business Logic**:
   - Streak calculation algorithms, goal projection formulas, and milestone rules are authored as pure functions that can be directly ported or shared via common libraries.

---

## 3. Post-V1 Mobile Candidate Evaluation

Once the Web V1 completion gate is certified, NairaStreak Labs will evaluate the following mobile options:

| Option | Pros | Cons | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| **PWA / TWA (Trusted Web Activity)** | - Zero code rewrite<br>- Instantly published to Google Play<br>- Smallest bundle size | - Limited iOS App Store distribution<br>- Reliant on browser capabilities | **Immediate Fast Track** for Android users post-V1 |
| **Capacitor (Ionic)** | - Packages existing web code<br>- Access to native push notifications and biometric auth<br>- Cross-platform (iOS + Android) | - Web performance overhead on low-end devices | **Preferred Hybrid Approach** if rapid iOS parity is needed |
| **React Native** | - True native UI components<br>- Excellent community & fintech ecosystem<br>- Shared Supabase JS SDK | - Separate codebase to maintain<br>- Requires dedicated mobile CI/CD | **Strong Long-Term Candidate** for dedicated product teams |
| **Flutter** | - Pixel-perfect 60/120fps rendering<br>- Single codebase for iOS and Android<br>- Strong performance on African budget devices | - Separate Dart codebase<br>- Larger initial binary download size | High-performance alternative to React Native |
| **Native (Swift + Kotlin)** | - Absolute highest performance and platform integration | - Highest engineering cost and dual codebases | Unnecessary for early-stage savings tracker |

---

## 4. Mobile Prerequisite Checklist

Before any mobile initiative commences:
- [ ] Web V1 customer journey passes 100% of integration tests.
- [ ] User authentication and cloud persistence have zero data leakage across 1,000+ sessions.
- [ ] Official consumer product name is finalized and trademark/domain secured.
- [ ] Push notification service architecture (e.g. Firebase Cloud Messaging / OneSignal) is architected for mobile delivery.
