import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/grammar-check - Check Italian grammar using Azure OpenAI
 */
export async function grammarCheck(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { text } = body;

    if (!text || text.length === 0 || text.length > 1000) {
      return { status: 400, jsonBody: { error: 'Text must be 1-1000 chars' } };
    }

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const prompt = `Analysiere den folgenden italienischen Text auf Grammatik- und Rechtschreibfehler.

Text: "${text}"

Wenn der Text korrekt ist, antworte mit:
{"hasErrors": false}

Wenn Fehler vorhanden sind, antworte mit:
{
  "hasErrors": true,
  "corrected": "korrigierter Text auf Italienisch",
  "explanation": "Kurze Erklärung auf Deutsch, was falsch war und warum die Korrektur richtig ist"
}

Antworte NUR mit JSON, kein zusätzlicher Text.`;

    const response = await axios.post(
      `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          { 
            role: 'system', 
            content: 'Du bist ein italienischer Grammatik-Experte. Prüfe italienische Texte auf Fehler und erkläre Korrekturen auf Deutsch. Antworte immer nur mit validem JSON.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.3
      },
      {
        headers: {
          'api-key': OPENAI_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      return { status: 200, jsonBody: { hasErrors: false } };
    }

    // Parse JSON — strip potential markdown fences
    const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    const result = JSON.parse(cleaned);

    return {
      status: 200,
      jsonBody: result
    };

  } catch (error: any) {
    console.error('Grammar check error:', error.message);
    // Return no errors on failure - don't block translation
    return { status: 200, jsonBody: { hasErrors: false } };
  }
}

app.http('grammar-check', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: grammarCheck
});
