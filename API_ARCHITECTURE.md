# CiaoItaliano - Azure Architecture Guide

## Quick Start

This folder contains a production-ready implementation of AI-powered endpoints for the CiaoItaliano Italian learning app, using Azure services.

### What's Inside

✅ **Azure Functions** (`/api`)
- `POST /api/translate` - Uses Azure Cognitive Services to translate German ↔ Italian
- `POST /api/story` - Uses Azure OpenAI to generate learning stories
- Rate limiting, caching, and security built-in

✅ **Frontend Client** (`js/ai-client.ts`)
- Type-safe API wrapper
- Automatic retry logic for rate limits
- Clean error handling

✅ **Deployment Guide** (`DEPLOYMENT.md`)
- Step-by-step Azure setup
- Security practices
- Cost estimation
- Troubleshooting

---

## Architecture Benefits

| Benefit | How |
|---------|-----|
| **No Secrets Exposed** | All API keys stored in Azure Function settings |
| **Secure** | Input validation, CORS, rate limiting, error sanitization |
| **Scalable** | Auto-scaling with Azure Functions consumption plan |
| **Cost-Effective** | Pay only for what you use |
| **Monitored** | Built-in logging and diagnostics |
| **Production-Ready** | Type-safe, tested, documented |

---

## Quick Development Setup

### 1. Install Core Tools

```bash
# Install Azure Functions Core Tools (v4)
# https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local

# Verify installation
func --version
```

### 2. Install Dependencies

```bash
cd api/
npm install
```

### 3. Configure Local Environment

Copy `local.settings.json` and fill in your credentials:

```json
{
  "Values": {
    "AZURE_TRANSLATOR_KEY": "your-key",
    "AZURE_TRANSLATOR_ENDPOINT": "https://api.cognitive.microsofttranslator.com/",
    "AZURE_TRANSLATOR_REGION": "westeurope",
    "AZURE_OPENAI_URL": "https://your-resource.openai.azure.com/",
    "AZURE_OPENAI_KEY": "your-key",
    "AZURE_OPENAI_DEPLOYMENT": "gpt-4o-mini"
  }
}
```

### 4. Run Locally

```bash
# Build TypeScript
npm run build

# Start local function runtime
npm start

# Functions will be available at:
# http://localhost:7071/api/translate
# http://localhost:7071/api/story
```

### 5. Test Endpoints

```bash
# Test translate
curl -X POST http://localhost:7071/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Guten Morgen",
    "sourceLanguage": "de",
    "targetLanguage": "it"
  }'

# Response: {"translatedText":"Buongiorno"}
```

---

## Code Organization

```
api/src/
├── functions/
│   ├── translate/
│   │   ├── index.ts         # HTTP trigger, input validation, API calls
│   │   └── function.json    # Azure Functions configuration
│   └── story/
│       ├── index.ts         # HTTP trigger, OpenAI integration
│       └── function.json    # Azure Functions configuration
└── shared/
    ├── rateLimiter.ts       # In-memory rate limiting
    └── cache.ts             # In-memory caching
```

### Key Design Decisions

1. **Shared Utilities in `/shared`**
   - Rate limiter for cost/abuse control
   - Cache for performance
   - Both in-memory (see comments for Redis upgrade path)

2. **Error Handling**
   - Consistent error responses: `{ error: "message" }`
   - No sensitive details leaked to frontend
   - Detailed logging server-side

3. **Input Validation**
   - All inputs validated before API calls
   - Prevents injection and malformed requests
   - Clear error messages for bad input

4. **Configuration**
   - All secrets via environment variables
   - Never hardcoded in code
   - Easy to manage across dev/staging/prod

---

## API Reference

### POST /api/translate

**Request:**
```json
{
  "text": "Guten Morgen",
  "sourceLanguage": "de",
  "targetLanguage": "it"
}
```

**Response (200):**
```json
{
  "translatedText": "Buongiorno"
}
```

**Error Responses:**
- `400` - Invalid input (missing text, unsupported language)
- `429` - Rate limit exceeded
- `500` - Service error

**Rate Limit:** 100 per IP per hour

---

### POST /api/story

**Request:**
```json
{
  "topic": "Daily life",
  "difficultyLevel": "A2",
  "maxTokens": 2000
}
```

**Response (200):**
```json
{
  "story": "Marco entra nel Bar Sport...",
  "metadata": {
    "topic": "Daily life",
    "difficultyLevel": "A2",
    "tokensUsed": 456
  }
}
```

**Error Responses:**
- `400` - Invalid input
- `429` - Rate limit exceeded
- `500` - Service error

**Rate Limit:** 5 per IP per day

---

## Frontend Integration

### Example: Generate Story in React

```typescript
import { generateStoryWithRetry, AIClientError } from './js/ai-client';

function StoryGenerator() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await generateStoryWithRetry({
        topic: 'Daily life',
        difficultyLevel: 'A2'
      });
      setStory(result.story);
    } catch (error) {
      if (error instanceof AIClientError) {
        if (error.isRateLimited()) {
          alert('Rate limited. Try again in a few minutes.');
        } else {
          alert('Error: ' + error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Story'}
      </button>
      {story && <p>{story}</p>}
    </div>
  );
}
```

---

## Production Deployment

See **DEPLOYMENT.md** for:
- Azure resource setup (CLI commands)
- Getting API credentials
- Configuring function app settings
- Deploying code
- Monitoring and alerting
- Cost optimization
- Troubleshooting

---

## Security Checklist

- [ ] API keys stored in Azure Function settings (never in code/repo)
- [ ] Input validation on all endpoints
- [ ] Rate limiting enabled
- [ ] Error messages don't leak sensitive info
- [ ] HTTPS enforced (Azure Static Web App default)
- [ ] CORS properly configured
- [ ] Logging configured (Application Insights)
- [ ] Monitoring and alerts set up
- [ ] Access reviewed (should all be public endpoints)

---

## Performance Optimization

### 1. Caching

Results are cached in-memory:
- Translations: 24 hours
- Stories: 24 hours

For distributed deployments, upgrade to **Azure Cache for Redis**.

### 2. Rate Limiting

Per-IP rate limits prevent abuse:
- Translations: 100/hour
- Stories: 5/day

Adjust in `local.settings.json`:
```json
{
  "APP_MAX_TRANSLATIONS_PER_IP_PER_HOUR": "100",
  "APP_MAX_STORIES_PER_IP_PER_DAY": "5"
}
```

### 3. Token Limits

Story generation limits tokens to control costs:
```json
{
  "APP_STORY_MAX_TOKENS": "2000"
}
```

Even if frontend requests more, server enforces the limit.

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Invalid API key | Check credentials in Function settings |
| `429 Too Many Requests` | Rate limit hit | Wait, or increase quota in Azure |
| `500 Internal Server Error` | Missing credentials | Verify all env vars set in Azure |
| `ENOTFOUND api.cognitive...` | Network issue | Check firewall, region names |

---

## Multiple Azure OpenAI Models

To use different models (gpt-4, gpt-35-turbo, etc.):

1. Deploy the model in Azure OpenAI Studio
2. Get the deployment name
3. Update `AZURE_OPENAI_DEPLOYMENT` in function settings

```bash
az functionapp config appsettings set \
  --name your-function-app \
  --resource-group your-rg \
  --settings AZURE_OPENAI_DEPLOYMENT="gpt-4"
```

Then update the function code to use model name in request:
```typescript
model: 'gpt-4',  // Use actual model name, not deployment name
```

---

## Local Testing with Mock Data

For offline development, mock the API responses:

```typescript
// In ai-client.ts
const MOCK_MODE = true;

export async function translateMock(req: TranslateRequest): Promise<TranslateResponse> {
  return { translatedText: 'Mocked translation' };
}

export async function generateStoryMock(): Promise<StoryResponse> {
  return { 
    story: 'Mocked story text...',
    metadata: { topic: 'Mock', difficultyLevel: 'A2', tokensUsed: 100 }
  };
}
```

---

## Upgrading to Production

1. ✅ Test locally with `npm start`
2. ✅ Deploy to Azure with `func azure functionapp publish`
3. ✅ Configure monitoring and alerts
4. ✅ Set up CI/CD from GitHub
5. ✅ Monitor costs and performance
6. ✅ Set up on-call rotation

---

## References & Resources

- [Azure Functions Node.js Developer Guide](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node)
- [Azure Cognitive Services Translator Docs](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/)
- [Azure OpenAI REST API](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/reference)
- [Azure Functions Rate Limiting Best Practices](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale)

---

**Built with ❤️ for CiaoItaliano**  
**Last Updated:** February 2026
