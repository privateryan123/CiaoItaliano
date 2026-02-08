# Italiano Ogni Giorno 🇮🇹 — CiaoItaliano

**Your AI-powered daily companion for learning Italian from German**.

A mobile-first Progressive Web App (PWA) deployed on **Azure Static Web App** with AI-powered story generation and translation endpoints backed by **Azure Functions**.

---

## 📱 Features

### 🎓 Core Learning
- **Daily Sentences** — Practical everyday Italian with German translations, grammar notes
- **Daily Stories** — Short tales by difficulty level with sentence-by-sentence breakdown
- **News Summaries** — Italian news items with explanations
- **Vocabulary Saver** — Quick-add favorite sentences to your personal list
- **Offline Support** — Service Worker caches content for offline learning

### 🤖 AI Integration (New!)
- **Smart Translation** — Translate German ↔ Italian on-demand via Azure Translator
- **Story Generation** — AI-generated stories at your difficulty level (A1–B2) via Azure OpenAI
- **Rate Limiting & Caching** — Free tier friendly with smart usage controls
- **Secure Backend** — All API keys stored server-side, never exposed to frontend

### ⚙️ Customization
- **Learning Level** — A1 to B2
- **Topics** — Travel, daily life, culture, business, food, sports
- **Theme** — Light/Dark/Auto
- **Explanations** — Toggle on/off

---

## 🏗️ Architecture

### Frontend
- Vanilla JavaScript PWA (no frameworks)
- Modern purple/indigo UI with animations
- 5+ days of static learning content
- Service Worker for offline support
- Deployed on **Azure Static Web App**

### Backend
- **Azure Functions** — Node.js/TypeScript serverless API
- **POST /api/translate** — German ↔ Italian translation
- **POST /api/story** — AI-generated stories at specified difficulty
- **Rate Limiting** — 100 translations/hour, 5 stories/day per IP
- **Caching** — 24-hour cache on all results
- **Monitoring** — Application Insights logging

### Database & Services
- **Azure Cognitive Services Translator** — Powered by Microsoft's translation engine
- **Azure OpenAI** — GPT-4o-mini model for story generation
- No external APIs called from frontend (secure ✅, cost-controlled ✅)

---

## 📚 Documentation

For different levels of detail, see:

1. **[ARCHITECTURE_SUMMARY.md](ARCHITECTURE_SUMMARY.md)** — Quick overview of current state + new architecture ⭐ **Start here**
2. **[API_ARCHITECTURE.md](API_ARCHITECTURE.md)** — Developer quick-start guide, API reference, local testing
3. **[DEPLOYMENT.md](DEPLOYMENT.md)** — Complete Azure setup with CLI commands, security, cost estimation

---

## 🚀 Quick Start

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/privateryan123/CiaoItaliano.git
cd CiaoItaliano

# 2. Install backend dependencies
cd api
npm install
npm run build

# 3. Configure local environment
# Copy api/local.settings.json template and fill in credentials

# 4. Start local function runtime
npm start
# Functions available at http://localhost:7071/api/translate, /api/story

# 5. In another terminal, serve frontend
cd ..
npx serve .
# Open http://localhost:3000
```

### Deploy to Azure

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete Azure setup:
- Create Azure Static Web App
- Create Azure Functions app
- Get API credentials (Translator, OpenAI)
- Configure environment variables
- Deploy with `git push` (frontend) and `func azure functionapp publish` (backend)

---

## 📁 Project Structure

```
.
├── README.md                      (this file)
├── ARCHITECTURE_SUMMARY.md        (high-level overview)
├── API_ARCHITECTURE.md            (API reference & quick start)
├── DEPLOYMENT.md                  (Azure setup guide)
├── index.html                     (main app)
├── manifest.json                  (PWA config)
├── sw.js                          (Service Worker)
│
├── css/
│   └── style.css                 (design system: purple/indigo)
│
├── js/
│   ├── app.js                    (main controller)
│   ├── ai.js                     (OLD: direct API calls - being replaced)
│   ├── ai-client.ts              (NEW: backend-safe client library)
│   ├── data.js                   (static learning content by date)
│   ├── store.js                  (localStorage wrapper)
│   └── views.js                  (UI rendering)
│
├── data/
│   ├── sentences.json            (vocabulary)
│   ├── stories.json              (sample stories)
│   └── news.json                 (news items)
│
├── icons/
│   ├── icon-192.svg              (app icon)
│   └── icon-512.svg
│
└── api/                          (Azure Functions backend)
    ├── package.json              (Node.js dependencies)
    ├── tsconfig.json             (TypeScript config)
    ├── host.json                 (Functions runtime config)
    ├── local.settings.json       (environment variables template)
    └── src/
        ├── functions/
        │   ├── translate/
        │   │   ├── index.ts      (translator endpoint)
        │   │   └── function.json
        │   └── story/
        │       ├── index.ts      (story generation endpoint)
        │       └── function.json
        └── shared/
            ├── rateLimiter.ts    (per-IP rate limiting)
            └── cache.ts          (result caching with TTL)
```

---

## 🔐 Security

✅ No API keys in frontend code
✅ All credentials in Azure Function settings (environment variables)
✅ Input validation on all endpoints
✅ Rate limiting prevents abuse and overspend
✅ HTTPS enforced via Azure Static Web App
✅ Error messages don't leak sensitive info
✅ .gitignore prevents accidental secret commits

---

## 💰 Cost Estimate (After Deployment)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Static Web App | ✅ | ~$0-9/mo |
| Azure Functions | ✅ 1M requests | ~$0-20/mo |
| Translator | ✅ 2M chars | ~$0-15/mo |
| Azure OpenAI | ❌ | ~$5-100/mo |
| **Total** | | **$5-144/month** |

See **[DEPLOYMENT.md](DEPLOYMENT.md#cost-estimation)** for cost control tips.

---

## 🧪 Testing the API Locally

```bash
# After running `npm start` in api/
# Test translation endpoint:
curl -X POST http://localhost:7071/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Guten Morgen","sourceLanguage":"de","targetLanguage":"it"}'

# Response: {"translatedText":"Buongiorno"}
```

See **[API_ARCHITECTURE.md](API_ARCHITECTURE.md)** for more examples.

---

## 📖 Adding Daily Content

Edit `js/data.js` to add new dates:

```javascript
"2026-02-08": {
  date: "2026-02-08",
  weekday: "Sonntag",
  greeting: "Buona domenica! ☀️",
  sentences: [
    {
      italian: "Buongiorno! Come stai?",
      german: "Guten Morgen! Wie geht es dir?"
    }
    // ...
  ],
  story: { /* story object */ },
  news: [ /* news items */ ]
}
```

---

## 🛠️ Building & Deployment

### Frontend (Auto-Deploy)
```bash
git add .
git commit -m "Update content"
git push origin main
# → Automatically deploys to Azure Static Web App
```

### Backend
```bash
cd api
func azure functionapp publish your-function-app-name
# Deploy code to Azure Functions
```

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed steps.

---

## 🐛 Troubleshooting

### Functions Not Running Locally
```bash
cd api
npm install
npm run build
npm start
```

### "Rate Limit" Errors
- Check Azure quota
- Reduce `APP_MAX_STORIES_PER_IP_PER_DAY` in Function settings
- Implement longer retry delays

### Missing Environment Variables
```bash
az functionapp config appsettings list \
  --name your-function-app \
  --resource-group your-rg
```

See **[API_ARCHITECTURE.md](API_ARCHITECTURE.md#troubleshooting)** for more.

---

## 📞 Support

- 📖 Read the docs: [DEPLOYMENT.md](DEPLOYMENT.md), [API_ARCHITECTURE.md](API_ARCHITECTURE.md), [ARCHITECTURE_SUMMARY.md](ARCHITECTURE_SUMMARY.md)
- 🔗 Microsoft Learn: [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/), [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
- 💬 Check troubleshooting sections in the docs

---

## 📄 License

MIT

---

**Built with ❤️ for Italian learners everywhere**  
Latest Update: February 2026
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

## License

MIT