# 💰 500K Challenge · NairaStreak Labs

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-16a34a?style=flat-square&logo=pwa)](https://500ksavgoal.netlify.app)
[![Offline First](https://img.shields.io/badge/Offline-First-059669?style=flat-square)](https://500ksavgoal.netlify.app)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success?style=flat-square)](https://500ksavgoal.netlify.app)
[![Organization](https://img.shields.io/badge/Organization-NairaStreak%20Labs-1f2937?style=flat-square&logo=github)](https://github.com/nairastreak-labs)

A mobile-first Progressive Web App (PWA) that helps you save ₦500,000 by a target date — one day (or week) at a time, powered by **NairaStreak Labs**.

**Live Demo:** [https://500ksavgoal.netlify.app](https://500ksavgoal.netlify.app)

![500K Challenge screenshot](icon-512.png)

## 🌟 Features

- 🎯 **Flexible Tracking**: Daily or weekly savings tracking, toggle anytime
- 📊 **Progress & Analytics**: Live progress bar and total-saved counter
- 🔥 **Habit & Momentum**: Streak tracking and full monthly calendar matrix
- 📈 **Smart Projection**: Projected finish date based on your actual saving pace
- 🎉 **Milestone Celebrations**: Confetti celebrations at 25%, 50%, 75%, and 100%
- ✏️ **Entry Control**: Log custom amounts or edit/undo mistaken entries
- 🧮 **Target Calculator**: Enter any goal amount and date to compute daily/weekly targets
- 🔔 **In-App Reminders**: Timely notifications that silence automatically once you log a saving for the day
- 🌗 **Dark Mode**: Seamless toggle between light and dark themes
- 💾 **Data Portability**: Full JSON backup export and import
- 📲 **PWA & Offline**: Installable to home screen and fully usable offline

## 🛠️ Tech Stack

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, zero dependencies. 
- **Storage**: Client-side `localStorage` for privacy and instant responsiveness.
- **Offline / PWA**: Handled by `manifest.json` and a custom Service Worker (`sw.js`).

## 🚀 Run Locally

Clone the repository and serve it with any static web server:

```bash
npx serve .
```

> **Note**: Service Worker registration and the "Add to Home Screen" prompt require a secure context (`https://` or `http://localhost`).

## 📁 Project Structure

```
├── index.html      # App markup, styles, and logic
├── manifest.json   # PWA manifest (name, icons, theme color)
├── sw.js           # Service worker for offline caching & notifications
├── icon-192.png    # App icon (192x192)
└── icon-512.png    # App icon (512x512)
```

## 👥 Authors & Attribution

- **Created by**: Zuokemefa Oyinmiebi Peter — built while learning software development at Learn2earn.
- **Maintained under**: [NairaStreak Labs](https://github.com/nairastreak-labs) — *Building disciplined savings habits & smart financial tools, one streak at a time.*
