# CiaoItaliano - Production Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Browser                            │
│              (Azure Static Web App Frontend)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Fetch Requests
                     ↓
┌─────────────────────────────────────────────────────────────┐
│             Azure Static Web App (SWA)                       │
│  (/index.html, /js, /css, /icons, staticwebapp.config.json) │
│                                                              │
│  Route: /api/* → Proxied to Azure Functions                │
└────────────────────┬────────────────────────────────────────┘
                     │
           API Routing (/api/*)
                     │
        ┌────────────┴────────────┐
        ↓                         ↓
   ┌─────────────────┐    ┌──────────────────┐
   │   POST /api/    │    │  POST /api/      │
   │   translate     │    │  story           │
   │                 │    │                  │
   │ Azure Function  │    │ Azure Function   │
   │  → Translator   │    │  → OpenAI        │
   └─────────────────┘    └──────────────────┘
        │                         │
        ↓                         ↓
   ┌──────────────────┐   ┌──────────────────┐
   │ Azure Cognitive  │   │ Azure OpenAI     │
   │ Services:        │   │ (gpt-4o-mini,    │
   │ Translator Text  │   │  gpt-4 or custom)│
   └──────────────────┘   └──────────────────┘
```

---

## Prerequisites

### Required Azure Services

1. **Azure Static Web App** (Free or Standard tier)
   - Hosts your SPA frontend
   - Provides built-in staging/production environments
   - Auto-deploys from GitHub

2. **Azure Functions** (Consumption plan recommended for cost-efficiency)
   - Runs Node.js function code
   - Scales automatically
   - Connected to Static Web App via proxy routing

3. **Azure Cognitive Services - Translator**
   - Pricing: Free tier (2M chars/month) or Pay-As-You-Go
   - Provides text translation (DE ↔ IT)

4. **Azure OpenAI Service**
   - Model: gpt-4o-mini (fast, cost-effective) or gpt-4
   - Pricing: Token-based
   - Text generation for stories

---

## Deployment Steps

### 1. Create Azure Resources

#### Via Azure CLI:

```bash
# Set variables
LOCATION="westeurope"
RESOURCE_GROUP="ciao-italiano-rg"
STORAGE_ACCOUNT="ciaoitalianosacc"
FUNCTION_APP="ciao-italiano-api"
SWA_NAME="ciao-italiano-swa"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Create storage account (for function state)
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS

# Create Function App
az functionapp create \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --storage-account $STORAGE_ACCOUNT \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --os-type Linux

# Create Static Web App
az staticwebapp create \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --source https://github.com/privateryan123/CiaoItaliano \
  --branch main \
  --location $LOCATION \
  --sku Standard

# Create Translator Service
az cognitiveservices account create \
  --name ciao-transcript \
  --resource-group $RESOURCE_GROUP \
  --kind TextTranslation \
  --location $LOCATION \
  --sku S1

# Create OpenAI Service (if not already available)
# NOTE: OpenAI availability varies by region and subscription
az cognitiveservices account create \
  --name ciao-openai \
  --resource-group $RESOURCE_GROUP \
  --kind OpenAI \
  --location eastus \
  --sku S0
```

### 2. Get Credentials

```bash
# Get Translator key and endpoint
az cognitiveservices account keys list \
  --name ciao-transcript \
  --resource-group $RESOURCE_GROUP
az cognitiveservices account show \
  --name ciao-transcript \
  --resource-group $RESOURCE_GROUP \
  --query properties.endpoint -o tsv

# Get OpenAI key and endpoint
az cognitiveservices account keys list \
  --name ciao-openai \
  --resource-group $RESOURCE_GROUP
az cognitiveservices account show \
  --name ciao-openai \
  --resource-group $RESOURCE_GROUP \
  --query properties.endpoint -o tsv
```

### 3. Configure Function App Settings

Set environment variables in Azure Function App:

```bash
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings \
  AZURE_TRANSLATOR_KEY="<key-from-step-2>" \
  AZURE_TRANSLATOR_ENDPOINT="https://api.cognitive.microsofttranslator.com/" \
  AZURE_TRANSLATOR_REGION="westeurope" \
  AZURE_OPENAI_URL="<endpoint-from-step-2>" \
  AZURE_OPENAI_KEY="<key-from-step-2>" \
  AZURE_OPENAI_DEPLOYMENT="deployment-name" \
  APP_MAX_TRANSLATIONS_PER_IP_PER_HOUR="100" \
  APP_MAX_STORIES_PER_IP_PER_DAY="5" \
  APP_STORY_MAX_TOKENS="2000" \
  APP_ENV="production"
```

**IMPORTANT: NEVER hardcode these values in your code or repository!**

### 4. Deploy Function Code

```bash
# Navigate to api directory
cd api

# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy to Azure Functions
func azure functionapp publish $FUNCTION_APP --build remote
```

### 5. Configure Static Web App Routes

Update `staticwebapp.config.json` to proxy API calls:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["*"],
      "rewrite": "/api/*",
      "functions": "api"
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["*.{css,scss,js,png,gif,jpg,jpeg,svg,eot,otf,ttf,woff,woff2}"]
  },
  "mimeTypes": {
    ".json": "application/json",
    ".webmanifest": "application/manifest+json",
    ".svg": "image/svg+xml"
  }
}
```

---

## Security Best Practices

### ✅ What We're Doing Right

1. **No Secrets in Frontend**
   - API keys stored only in Azure Function settings
   - Frontend calls only public endpoints

2. **CORS Protection**
   - Azure Functions validate requests
   - Static Web App routes all /api/* calls internally

3. **Rate Limiting**
   - Per-IP rate limits on both endpoints
   - Prevents abuse and controls costs

4. **Input Validation**
   - Strict validation on all inputs
   - Length limits, type checking, allowed values

5. **Error Handling**
   - No sensitive error details leaked to client
   - API errors logged server-side only

### 🔒 Additional Production Hardening

1. **Enable HTTPS**
   ```bash
   # Azure Static Web App enforces HTTPS by default
   # Verify in Portal: Custom domains → HTTPS
   ```

2. **Implement Azure Front Door (Optional)**
   - DDoS protection
   - Global caching
   - Web Application Firewall (WAF)

3. **Use Managed Identities (Recommended)**
   ```typescript
   // Replace keys with Managed Identity authentication
   import { DefaultAzureCredential } from "@azure/identity";
   
   const credential = new DefaultAzureCredential();
   const client = new TextTranslationClient(
     new URL("https://api.cognitive.microsofttranslator.com"),
     credential
   );
   ```

4. **Configure Private Endpoints**
   - If using other Azure PaaS services (Cosmos, Redis, etc.)
   - Prevents public exposure

5. **Enable Diagnostic Logging**
   ```bash
   az monitor diagnostic-settings create \
     --name CiaoItaliano-Diagnostics \
     --resource "/subscriptions/xxx/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$FUNCTION_APP" \
     --logs '[{"category":"FunctionAppLogs","enabled":true}]' \
     --workspace "/subscriptions/xxx/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.OperationalInsights/workspaces/my-workspace"
   ```

---

## Frontend Integration

### Using the AI Client

In your frontend code:

```typescript
import { 
  translate, 
  generateStory, 
  generateStoryWithRetry,
  AIClientError 
} from './js/ai-client';

// Translate text
async function handleTranslate() {
  try {
    const result = await translate({
      text: 'Guten Morgen',
      sourceLanguage: 'de',
      targetLanguage: 'it'
    });
    console.log('Translation:', result.translatedText); // "Buongiorno"
  } catch (error) {
    if (error instanceof AIClientError) {
      console.error('Translation error:', error.message);
    }
  }
}

// Generate story with retry logic
async function handleGenerateStory() {
  try {
    const result = await generateStoryWithRetry({
      topic: 'Daily life',
      difficultyLevel: 'A2',
      maxTokens: 1500
    });
    console.log('Story:', result.story);
  } catch (error) {
    if (error instanceof AIClientError) {
      if (error.isRateLimited()) {
        showNotification('Please try again in a few minutes');
      } else {
        showNotification('Error: ' + error.message);
      }
    }
  }
}
```

---

## Cost Estimation (Monthly)

| Service | Tier | Approx. Cost |
|---------|------|-------------|
| Azure Static Web App | Standard | $9 |
| Azure Functions | Consumption | $0-20* |
| Azure Translator | Free (2M chars) | $0 |
| Azure OpenAI | Pay-As-You-Go | $5-100** |
| **TOTAL** | | **$14-$129** |

*Functions: 1M requests ≈ $0.20  
**OpenAI: 100K tokens ≈ $0.033; varies by model and usage

---

## Troubleshooting

### Function Not Running

```bash
# Check function logs
az functionapp log tail --name $FUNCTION_APP --resource-group $RESOURCE_GROUP

# Verify settings
az functionapp config appsettings list \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP
```

### 401 Unauthorized from AI Services

```bash
# Verify credentials are correct
az cognitiveservices account keys list \
  --name ciao-transcript \
  --resource-group $RESOURCE_GROUP

# Check endpoint format
az cognitiveservices account show \
  --name ciao-transcript \
  --resource-group $RESOURCE_GROUP
```

### Too Many Requests (429 Errors)

- Check rate limit settings in function configuration
- Scale up Azure OpenAI quota if production demands exceed tier limits
- Consider implementing request queuing with Azure Service Bus

---

## Upgrading from Free Tier OpenAI

If you exceed free trial limits:

1. Add billing to your Azure account
2. Upgrade OpenAI service tier:
   ```bash
   az cognitiveservices account update \
     --name ciao-openai \
     --resource-group $RESOURCE_GROUP \
     --sku S0  # or higher
   ```
3. Update deployment quota in Azure OpenAI Studio
4. Increase `max_tokens` limits if needed

---

## Production Monitoring

### Key Metrics to Monitor

```bash
# View function metrics
az monitor metrics list \
  --resource "/subscriptions/xxx/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$FUNCTION_APP" \
  --metric "Requests,ServerErrors,Duration"
```

### Set up Alerts

```bash
# Create alert for errors
az monitor metrics alert create \
  --name FunctionErrors \
  --resource-group $RESOURCE_GROUP \
  --scopes "/subscriptions/xxx/resourcegroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$FUNCTION_APP" \
  --condition "avg ServerErrors > 10" \
  --window-size 5m \
  --evaluation-frequency 1m
```

---

## File Structure Summary

```
CiaoItaliano/
├── api/                           # Azure Functions
│   ├── src/
│   │   ├── functions/
│   │   │   ├── translate/
│   │   │   │   ├── index.ts      # Translator endpoint
│   │   │   │   └── function.json
│   │   │   └── story/
│   │   │       ├── index.ts      # OpenAI endpoint
│   │   │       └── function.json
│   │   └── shared/
│   │       ├── rateLimiter.ts    # Rate limiting logic
│   │       └── cache.ts           # In-memory caching
│   ├── package.json
│   ├── tsconfig.json
│   ├── host.json
│   └── local.settings.json        # Local dev secrets
├── js/
│   ├── ai-client.ts              # Frontend API wrapper
│   └── ... (existing app code)
├── index.html
├── manifest.json
├── staticwebapp.config.json       # SWA routing config
└── README.md
```

---

## References

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Azure Cognitive Services Translator](https://learn.microsoft.com/en-us/azure/cognitive-services/translator/)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Status:** Production Ready
