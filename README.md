# Italiano Ogni Giorno 🇮🇹

[![Azure Static Web Apps CI/CD](https://github.com/privateryan123/CiaoItaliano/actions/workflows/azure-static-web-apps-nice-bay-080373810.yml/badge.svg)](https://github.com/privateryan123/CiaoItaliano/actions/workflows/azure-static-web-apps-nice-bay-080373810.yml)

**Dein täglicher Begleiter für Italienisch — von Deutsch aus.**

A mobile-first Progressive Web App (PWA) for learning Italian from German, designed for daily use on iPhone.

## Features

### 📖 Daily Content ("Heute")
- **Tagessätze** — 3–5 practical everyday Italian sentences with German translations, grammar explanations, and highlighted keywords
- **Tagesgeschichte** — A short story displayed sentence-by-sentence with page navigation, translations, and notes
- **Tagesnachrichten** — 3–4 learning-friendly news items with Italian summaries and German explanations

### 📚 Library ("Bibliothek")
- Browse past days by date
- Open any previous day's full content

### 💬 Vocabulary ("Vokabeln")
- Save sentences with one tap
- Italian → German list view
- Organized by sentences and words

### ⚙️ Settings ("Mehr")
- Learning level (A1–B2)
- Topic preferences (travel, daily life, culture, business, food, sports)
- Toggle explanations on/off
- Light / Dark / Auto theme

## Design

- **Mobile-first**, optimized for iPhone "Add to Home Screen"
- Calm, minimal, reading-focused typography
- Card-based layout with large readable text
- Light and dark mode
- Feels like a personal learning companion

## Tech Stack

- **Vanilla HTML, CSS, JS** — no build tools, no frameworks
- **CSS Custom Properties** for theming
- **localStorage** for vocabulary and settings
- **Service Worker** for offline support (PWA)
- **Web App Manifest** for Add to Home Screen

## Getting Started

1. Serve the files with any static server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .
   ```

2. Open `http://localhost:8000` on your iPhone or in a browser

3. On iPhone: tap Share → "Add to Home Screen"

## Project Structure

```
├── index.html          Main HTML shell
├── manifest.json       PWA manifest
├── sw.js               Service worker
├── css/
│   └── style.css       Complete design system
├── js/
│   ├── data.js         Daily content (structured by date)
│   ├── store.js        localStorage wrapper
│   ├── views.js        View rendering functions
│   └── app.js          Router & controller
├── icons/
│   ├── icon-192.svg    App icon (192x192)
│   └── icon-512.svg    App icon (512x512)
└── README.md
```

## Adding New Daily Content

Add a new date entry to `DAILY_CONTENT` in `js/data.js`:

```javascript
"2026-02-08": {
  date: "2026-02-08",
  weekday: "Sonntag",
  greeting: "Buona domenica! ☀️",
  sentences: [ ... ],
  story: { ... },
  news: [ ... ]
}
```

Content is designed to be generated daily and loaded by date string.

## Deployment

This app automatically deploys to Azure Static Web Apps whenever changes are pushed to the `main` branch.

### Automatic Deployment
- **Every push to `main`** triggers an automatic deployment
- **Pull requests to `main`** create preview deployments for testing
- **Deployment status** is shown in the badge at the top of this README

### Manual Deployment
The deployment is fully automated via GitHub Actions. To deploy changes:
1. Make your code changes
2. Commit and push to `main` branch
3. GitHub Actions will automatically build and deploy
4. Check the Actions tab to monitor deployment progress

The live app is hosted on Azure Static Web Apps and updates within minutes of pushing changes.

## License

MIT