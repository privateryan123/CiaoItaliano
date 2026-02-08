import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';
import { getRateLimiter } from '../shared/rateLimiter';
import { getCacheKey, getFromCache, setInCache } from '../shared/cache';

/**
 * POST /api/translate
 * Translates text using Azure Cognitive Services Translator
 * 
 * Request body:
 * {
 *   "text": string,
 *   "sourceLanguage": "de",
 *   "targetLanguage": "it"
 * }
 * 
 * Response: { "translatedText": "..." }
 */
const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => {
  const clientIp = getClientIp(req);
  
  try {
    // === INPUT VALIDATION ===
    if (req.method !== 'POST') {
      context.res = {
        status: 405,
        body: { error: 'Only POST method allowed' }
      };
      return;
    }

    const { text, sourceLanguage = 'de', targetLanguage = 'it' } = req.body || {};

    if (!text || typeof text !== 'string') {
      context.res = {
        status: 400,
        body: { error: 'Missing or invalid "text" parameter' }
      };
      return;
    }

    if (text.trim().length === 0 || text.length > 5000) {
      context.res = {
        status: 400,
        body: { error: 'Text must be 1-5000 characters' }
      };
      return;
    }

    const validLanguages = ['de', 'it', 'en', 'fr', 'es'];
    if (!validLanguages.includes(sourceLanguage) || !validLanguages.includes(targetLanguage)) {
      context.res = {
        status: 400,
        body: { error: `Unsupported language. Allowed: ${validLanguages.join(', ')}` }
      };
      return;
    }

    // === RATE LIMITING ===
    const rateLimiter = getRateLimiter('translations');
    const allowed = await rateLimiter.isAllowed(clientIp);
    if (!allowed) {
      context.res = {
        status: 429,
        body: { error: 'Rate limit exceeded. Max 100 translations per hour.' }
      };
      return;
    }

    // === CACHE CHECK ===
    const cacheKey = getCacheKey('translate', { text, sourceLanguage, targetLanguage });
    const cached = await getFromCache(cacheKey);
    
    if (cached) {
      context.log(`Cache hit for translation: ${text.substring(0, 50)}`);
      context.res = {
        status: 200,
        body: { translatedText: cached }
      };
      return;
    }

    // === TRANSLATION API CALL ===
    const translatorKey = process.env.AZURE_TRANSLATOR_KEY;
    const translatorEndpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const translatorRegion = process.env.AZURE_TRANSLATOR_REGION;

    if (!translatorKey || !translatorEndpoint) {
      context.log.error('Translator credentials not configured');
      context.res = {
        status: 500,
        body: { error: 'Translation service unavailable' }
      };
      return;
    }

    const url = `${translatorEndpoint}translate?api-version=3.0&from=${sourceLanguage}&to=${targetLanguage}`;
    
    const response = await axios.post(url, [{ text }], {
      headers: {
        'Ocp-Apim-Subscription-Key': translatorKey,
        'Ocp-Apim-Subscription-Region': translatorRegion,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    const translatedText = response.data?.[0]?.translations?.[0]?.text;
    
    if (!translatedText) {
      context.log.error('Unexpected translator response format', response.data);
      context.res = {
        status: 500,
        body: { error: 'Unexpected response from translation service' }
      };
      return;
    }

    // === CACHE RESULT ===
    await setInCache(cacheKey, translatedText, 86400); // 24-hour cache

    context.res = {
      status: 200,
      body: { translatedText }
    };

  } catch (error) {
    context.log.error('Translate function error:', error);

    // Handle specific error types
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      context.res = {
        status: 503,
        body: { error: 'Translation service rate limited. Please try again later.' }
      };
    } else if (axios.isAxiosError(error) && error.response?.status === 401) {
      context.log.error('Authentication failed for translator service');
      context.res = {
        status: 500,
        body: { error: 'Translation service authentication failed' }
      };
    } else {
      context.res = {
        status: 500,
        body: { error: 'Internal server error' }
      };
    }
  }
};

/**
 * Extract client IP from request headers
 * Handles Azure's X-Forwarded-For header
 */
function getClientIp(req: HttpRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return (forwarded as string).split(',')[0].trim();
  }
  return req.headers['x-real-ip'] as string || '0.0.0.0';
}

export default httpTrigger;
