# CiaoItaliano Architecture Summary

## Current State (February 2026)

The CiaoItaliano app is a **Progressive Web App (PWA)** for learning Italian, deployed on **Azure Static Web App**.

### What You Have ✅

1. **Frontend (Static Web App)**
   - Vanilla JavaScript, no framework dependencies
   - Modern purple/indigo UI with gradient animations
   - 5 days of static Italian learning content
   - Service Worker for offline support
   - localStorage for progress tracking
   - Fully responsive (mobile-first design)

2. **Deployment**
   - Azure Static Web App (auto-deploys from GitHub)
   - GitHub: `privateryan123/CiaoItaliano`
   - Zero configuration needed—just push to `main`

3. **Content**
   - 200+ Italian sentences (with German translations)
   - 5 short stories (A1-B2 difficulty)
   - Daily news snippets in Italian
   - All loaded from static JSON files

---

## What's Missing (Being Added Now)

### ❌ Static Content Only

The app currently has **no AI integration**:
- Can't generate new sentences
- Can't create custom stories
- Can't translate arbitrary text
- No real-time learning assistance

### ❌ Why Direct OpenAI Calls Failed

Original approach tried:
```javascript
// WRONG: Exposes API key to browser
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});
```

Problems:
1. **Security Risk** - Anyone could see the key in browser network tab
2. **Cost Leak** - Anyone could use your key, run up bills
3. **Rate Limit Errors** - Keys got rate-limited quickly
4. **Maintainability** - Keys hardcoded in frontend files

---

## New Architecture (Production-Ready)

### ✅ Backend with Azure Functions

Instead of calling OpenAI from browser:

```
Browser → Azure Static Web App → Azure Functions → Azure OpenAI
             (frontend)                 (backend)      (API)
```

Benefits:
- **Secure** - API keys never leave Azure
- **Controlled** - You manage rate limits and costs
- **Scalable** - Auto-scales based on demand
- **Monitored** - Built-in logging and metrics

### ✅ File Structure After Setup

```
github.com/privateryan123/CiaoItaliano/
├── index.html                    (main app page)
├── css/
│   └── style.css                (purple/indigo design)
├── js/
│   ├── app.js                   (main app logic)
│   ├── ai.js                    (OLD: direct OpenAI calls)
│   └── ai-client.ts             (NEW: backend proxy)
├── data/
│   ├── sentences.json           (static content)
│   ├── stories.json
│   └── news.json
├── api/                         (NEW: Azure Functions backend)
│   ├── package.json
│   ├── tsconfig.json
│   ├── host.json
│   ├── local.settings.json
│   └── src/
│       ├── functions/
│       │   ├── translate/
│       │   │   ├── index.ts
│       │   │   └── function.json
│       │   └── story/
│       │       ├── index.ts
│       │       └── function.json
│       └── shared/
│           ├── rateLimiter.ts
│           └── cache.ts
├── DEPLOYMENT.md                (step-by-step Azure setup guide)
├── API_ARCHITECTURE.md          (quick reference guide)
├── ARCHITECTURE_SUMMARY.md      (this file)
├── staticwebapp.config.json     (routing rules)
└── .gitignore                   (security: never commit secrets)
```

---

## The Two Endpoints

### 1️⃣ POST /api/translate

Translates German → Italian using Azure Cognitive Services.

**Frontend Code:**
```typescript
import { translate } from './js/ai-client';

const result = await translate({
  text: 'Guten Morgen',
  sourceLanguage: 'de',
  targetLanguage: 'it'
});

console.log(result.translatedText); // "Buongiorno"
```

**What Happens Behind the Scenes:**
1. Frontend sends request to `/api/translate`
2. Static Web App routes to Azure Functions
3. Function checks rate limit (100/hour per IP)
4. Function checks cache (24-hour TTL)
5. If not cached: calls Azure Translator API
6. Returns translation, stores in cache

---

### 2️⃣ POST /api/story

Generates Italian stories at specified difficulty using Azure OpenAI.

**Frontend Code:**
```typescript
import { generateStoryWithRetry } from './js/ai-client';

const result = await generateStoryWithRetry({
  topic: 'Daily life in Rome',
  difficultyLevel: 'A2'
});

console.log(result.story); // Long Italian story...
console.log(result.metadata.tokensUsed); // Cost tracking
```

**What Happens Behind the Scenes:**
1. Frontend sends request to `/api/story`
2. Static Web App routes to Azure Functions
3. Function validates difficulty level (A1/A2/B1/B2)
4. Function checks rate limit (5/day per IP)
5. Function checks cache (24-hour TTL)
6. If not cached: calls Azure OpenAI API
7. Returns story with metadata, stores in cache
8. If rate limited (429): frontend auto-retries with exponential backoff

---

## Deployment Workflow

### Step 1: Deploy Frontend (5 minutes)
```bash
git add .
git commit -m "Add AI endpoints"
git push origin main
# → Automatically deploys to Azure Static Web App
# → Frontend code live at https://your-domain.azurestaticapps.net
```

### Step 2: Deploy Backend (15 minutes)

```bash
cd api
npm install
npm run build

# Log in to Azure
az login

# Deploy functions to your Function App
func azure functionapp publish your-function-app-name
```

### Step 3: Configure (10 minutes)

Set environment variables in Azure Portal:
```
AZURE_TRANSLATOR_KEY=xxx
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/
AZURE_OPENAI_URL=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=xxx
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
```

### Step 4: Update Routing (1 minute)

Add to `staticwebapp.config.json`:
```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    }
  ]
}
```

---

## What Each File Does

| File | Purpose | Key Features |
|------|---------|--------------|
| `api/src/functions/translate/index.ts` | Translator API endpoint | Input validation, caching, rate limiting |
| `api/src/functions/story/index.ts` | Story generation endpoint | Token enforcement, difficulty levels, retry logic |
| `api/src/shared/rateLimiter.ts` | Per-IP rate limiting | Prevents abuse, configurable limits |
| `api/src/shared/cache.ts` | Result caching | Reduces API calls, 24-hour TTL |
| `js/ai-client.ts` | Frontend client library | Type-safe API wrapper, error handling |
| `DEPLOYMENT.md` | Azure setup guide | CLI commands, troubleshooting, cost estimates |
| `API_ARCHITECTURE.md` | API reference | Quick start, examples, integration guide |

---

## Key Design Principles

### 1. No Secrets in Frontend ❌ Bad → ✅ Good

❌ **Bad (Current):**
```javascript
// NEVER DO THIS
const apiKey = 'sk-xxx';
fetch('https://api.openai.com/v1/messages', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});
```

✅ **Good (New):**
```typescript
// Call backend only
const result = await translate({ text: 'Guten Morgen' });
// Backend has keys in environment variables
```

### 2. Frontend Calls Backend Only

```
Browser → Static Web App → Azure Functions
  ↑
Frontend only calls these endpoints
```

NOT directly to Azure OpenAI, Azure Translator, or any third-party service.

### 3. Backend Controls Everything

- Rate limiting (prevents abuse)
- Caching (reduces costs)
- Input validation (prevents injection)
- Error handling (no info leaks)
- Token limiting (controls OpenAI costs)

### 4. Configuration via Environment Variables

```yaml
# Local development
api/local.settings.json

# Deployed to Azure
Azure Portal → Function App → Configuration → Application Settings
```

Never in code or `.env` files that get committed.

---

## Cost Estimation (After Deployment)

| Service | Free Tier | Paid Tier | Monthly Cost |
|---------|-----------|-----------|--------------|
| **Static Web App** | ✅ 100GB | Standard $9/mo | $0-9 |
| **Azure Functions** | ✅ 1M requests | Consumption pay-per-use | $0-20 |
| **Translator** | ✅ 2M chars/mo | Standard $10/1M chars | $0-15 |
| **Azure OpenAI** | ❌ None | Pay-per-token | $5-100+ |
| **Total Estimated** | | | $5-144/month |

### Cost Control Tips

1. **Adjust rate limits** in `local.settings.json`:
   - Reduce to 3 stories/day instead of 5
   - Reduce to 50 translations/hour instead of 100

2. **Use cheaper models**:
   - `gpt-3.5-turbo` instead of `gpt-4`
   - `gpt-4o-mini` (current) is already cost-optimized

3. **Cache aggressively**:
   - Current: 24 hours for all results
   - Increase to 48 hours for less common requests

4. **Monitor usage**:
   - Azure Portal shows daily/monthly costs
   - Set up billing alerts for overspend

---

## Security Checklist ✅

- [ ] No API keys in frontend code
- [ ] All secrets in Azure Function settings
- [ ] Input validation on all endpoints
- [ ] Rate limiting enabled
- [ ] Error messages don't expose secrets
- [ ] .gitignore prevents accidental commits
- [ ] CORS properly configured
- [ ] HTTPS enforced (Azure SWA default)
- [ ] Logging enabled (Application Insights)
- [ ] Access monitoring in place

---

## Troubleshooting

### Problem: Translation returns empty

**Cause**: Missing AZURE_TRANSLATOR_KEY

**Fix**: Set credentials in Azure Portal
```bash
az functionapp config appsettings list \
  --name your-function-app \
  --resource-group your-rg
```

### Problem: Stories fail with 429

**Cause**: OpenAI API hitting rate limits

**Fix**: 
- Increase throughput in Azure OpenAI
- Reduce `APP_MAX_STORIES_PER_IP_PER_DAY`
- Implement longer retry delays in `ai-client.ts`

### Problem: Functions not responding

```bash
# Check logs
func azure functionapp logstream your-function-app

# Check function is deployed
az functionapp function list --name your-function-app \
  --resource-group your-rg
```

---

## Next Steps

1. **Review** `DEPLOYMENT.md` for Azure setup steps
2. **Deploy** using provided Azure CLI commands
3. **Test** both endpoints locally with `npm start`
4. **Monitor** costs in Azure Portal
5. **Scale** based on usage (adjust limits/models as needed)

---

## Questions?

- 📖 Read `DEPLOYMENT.md` for step-by-step setup
- 📖 Read `API_ARCHITECTURE.md` for quick reference
- 🔗 See references to Microsoft Learn docs
- 🛠️ Check troubleshooting sections

---

**Built with ❤️ for CiaoItaliano**
