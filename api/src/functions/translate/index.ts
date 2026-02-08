import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/translate - Translate text using Azure Translator
 */
export async function translate(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { text, sourceLanguage = 'de', targetLanguage = 'it' } = body;

    if (!text || text.length === 0 || text.length > 5000) {
      return { status: 400, jsonBody: { error: 'Text must be 1-5000 chars' } };
    }

    const TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
    const TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION || 'westeurope';

    if (!TRANSLATOR_KEY || !TRANSLATOR_ENDPOINT) {
      return { status: 500, jsonBody: { error: 'Translator not configured' } };
    }

    const response = await axios.post(
      `${TRANSLATOR_ENDPOINT}translate?api-version=3.0&from=${sourceLanguage}&to=${targetLanguage}`,
      [{ text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': TRANSLATOR_REGION,
          'Content-Type': 'application/json'
        }
      }
    );

    const translated = response.data?.[0]?.translations?.[0]?.text;
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

