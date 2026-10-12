# 💰 500K Challenge · NairaStreak Labs

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-16a34a?style=flat-square&logo=pwa)](https://500ksavgoal.netlify.app)
[![Offline First](https://img.shields.io/badge/Offline-First-059669?style=flat-square)](https://500ksavgoal.netlify.app)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)](https://500ksavgoal.netlify.app)
[![Organization](https://img.shields.io/badge/Organization-NairaStreak%20Labs-1f2937?style=flat-square&logo=github)](https://github.com/nairastreak-labs)

A mobile-first Progressive Web App (PWA) that helps you save ₦500,000 by a target date — one day (or week) at a time, powered by **NairaStreak Labs**.

**Live Demo:** [https://500ksavgoal.netlify.app](https://500ksavgoal.netlify.app)

![500K Challenge screenshot](icon-512.png)

## 🌟 Features

- 🔐 **Secure Cloud Authentication**: Powered by Supabase Auth (email & password with session restoration and password reset)
- 🛡️ **Row Level Security**: Zero cross-user data leakage with database-level isolation
- 🎯 **Flexible Tracking**: Daily or weekly savings tracking, toggle anytime
- 📊 **Progress & Analytics**: Live progress bar and total-saved counter
- 🔥 **Habit & Momentum**: Streak tracking and full monthly calendar matrix
- 📈 **Smart Projection**: Projected finish date based on your actual saving pace
- 🎉 **Milestone Celebrations**: Confetti celebrations at 25%, 50%, 75%, and 100%
- ✏️ **Entry Control**: Log custom amounts or edit/undo mistaken entries
- 🧮 **Target Calculator**: Enter any goal amount and date to compute daily/weekly targets
- 🔔 **In-App Reminders**: Timely notifications that silence automatically once you log a saving for the day
- 🌗 **Dark Mode**: Seamless toggle between light and dark themes
- 💾 **Data Portability**: Full JSON backup export and import, with cloud persistence foundation
- 📲 **PWA & Offline**: Installable to home screen and fully usable offline with zero token caching

## 🛠️ Tech Stack

Built with clean, accessible HTML5, CSS3, and JavaScript — no heavyweight frameworks, no complex build tools.
- **Backend & Identity**: [Supabase](https://supabase.com) (GoTrue Auth + PostgreSQL 15+ with strict Row Level Security).
- **Configuration**: Public client config in `config.js` (`.env.example` template provided).
- **Storage**: Cloud persistence with local storage fallback for privacy and instant responsiveness.
- **Offline / PWA**: Handled by `manifest.json` and a hardened Service Worker (`sw.js`) that caches static assets only.

## 🚀 Run Locally

Clone the repository and serve it with any static web server:

```bash
npx serve .
```

> **Note**: Service Worker registration and authentication features require a secure context (`https://` or `http://localhost`).

## 📁 Project Structure

```
├── index.html            # Scrollytelling landing page, auth modals & app shell
├── config.js             # Public client-side configuration for Supabase
├── manifest.json         # PWA manifest (name, icons, theme color)
├── sw.js                 # Hardened Service worker (v2: caches shell assets only)
├── .env.example          # Environment variables template
├── supabase/
│   └── migrations/
│       └── 20261012_init_schema.sql  # Profiles, goals, entries schema & RLS
├── icon-192.png          # App icon (192x192)
└── icon-512.png          # App icon (512x512)
```

## 👥 Authors & Attribution

- **Created by**: Zuokemefa Oyinmiebi Peter — built while learning software development at Learn2earn.
- **Maintained under**: [NairaStreak Labs](https://github.com/nairastreak-labs) — *Building disciplined savings habits & smart financial tools, one streak at a time.*
