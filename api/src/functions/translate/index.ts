import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * Translate using Azure OpenAI (GPT-4o recommended)
 */
async function translateWithOpenAI(text: string, from: string, to: string): Promise<string | null> {
  const OPENAI_URL = process.env.AZURE_OPENAI_URL;
  const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
  const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT; // Recommend: gpt-4o

  if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
    return null;
  }

  const langNames: Record<string, string> = {
    'de': 'German',
    'it': 'Italian',
    'en': 'English'
  };

  const fromLang = langNames[from] || from;
  const toLang = langNames[to] || to;

  try {
    const response = await axios.post(
      `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following text from ${fromLang} to ${toLang}. Return ONLY the translated text, nothing else. Preserve formatting and punctuation.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      },
      {
        headers: {
          'api-key': OPENAI_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    const translated = response.data?.choices?.[0]?.message?.content?.trim();
    return translated || null;
  } catch (error) {
    console.error('OpenAI translation error:', error);
    return null;
  }
}

/**
 * Translate using Azure Translator (fallback)
 */
async function translateWithAzure(text: string, from: string, to: string): Promise<string | null> {
  const TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
  const TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
  const TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION || 'westeurope';

  if (!TRANSLATOR_KEY || !TRANSLATOR_ENDPOINT) {
    return null;
  }

  try {
    const response = await axios.post(
      `${TRANSLATOR_ENDPOINT}translate?api-version=3.0&from=${from}&to=${to}`,
      [{ text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': TRANSLATOR_REGION,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return response.data?.[0]?.translations?.[0]?.text || null;
  } catch (error) {
    console.error('Azure Translator error:', error);
    return null;
  }
}

/**
 * POST /api/translate - Translate text
 * Uses Azure OpenAI (GPT-4o) as primary, Azure Translator as fallback
 */
export async function translate(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { text, sourceLanguage = 'de', targetLanguage = 'it' } = body;

    if (!text || text.length === 0 || text.length > 5000) {
      return { status: 400, jsonBody: { error: 'Text must be 1-5000 chars' } };
    }

    // Try Azure OpenAI first (better quality for context-aware translations)
    let translated = await translateWithOpenAI(text, sourceLanguage, targetLanguage);
    
    // Fallback to Azure Translator if OpenAI fails
    if (!translated) {
      console.log('OpenAI translation failed, falling back to Azure Translator');
      translated = await translateWithAzure(text, sourceLanguage, targetLanguage);
    }

    if (!translated) {
      return { status: 500, jsonBody: { error: 'Translation failed' } };
    }

    return {
      status: 200,
      jsonBody: { translatedText: translated }
    };

  } catch (error) {
    console.error('Translate error:', error);
    return { status: 500, jsonBody: { error: 'Translation service error' } };
  }
}

app.http('translate', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: translate
});

