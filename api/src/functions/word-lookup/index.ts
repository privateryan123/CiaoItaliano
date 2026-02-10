import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/word-lookup - Look up Italian word translation using Azure OpenAI
 * Returns detailed grammatical analysis including base form and contextual meaning
 */
export async function wordLookup(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { word, context } = body;

    if (!word || word.length === 0 || word.length > 100) {
      return { status: 400, jsonBody: { error: 'Word must be 1-100 chars' } };
    }

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const contextHint = context ? `\nSatz-Kontext: "${context}"` : '';
    
    const prompt = `Analysiere das italienische Wort "${word}" für einen Deutschsprachigen.${contextHint}

Gib mir:
1. Die Grundform (Infinitiv bei Verben, Singular bei Nomen, männliche Singularform bei Adjektiven)
2. Die Bedeutung der Grundform auf Deutsch
3. Die grammatikalische Form des verwendeten Wortes "${word}" (z.B. "1. Person Singular Präsens", "Plural", "weiblich")
4. Die kontextuelle Übersetzung im Satz

Antworte NUR mit JSON in diesem Format:
{
  "baseForm": "Grundform auf Italienisch",
  "baseMeaning": "Bedeutung der Grundform auf Deutsch",
  "wordForm": "grammatikalische Erklärung der Form",
  "translation": "Übersetzung im Kontext",
  "alternatives": ["alternative Bedeutung 1", "alternative 2"]
}

Wenn das Wort bereits die Grundform ist, setze baseForm gleich dem Wort.
Maximal 2 Alternativen. Antworte NUR mit validem JSON.`;

    const response = await axios.post(
      `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          { 
            role: 'system', 
            content: 'Du bist ein Italienisch-Deutsch Wörterbuch und Grammatikexperte. Gib präzise, korrekte grammatikalische Analysen. Antworte immer nur mit validem JSON.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.2
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
      return { status: 200, jsonBody: { translation: null } };
    }

    // Parse JSON — strip potential markdown fences
    const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    const result = JSON.parse(cleaned);

    return {
      status: 200,
      jsonBody: result
    };

  } catch (error: any) {
    console.error('Word lookup error:', error.message);
    return { status: 500, jsonBody: { error: 'Lookup failed' } };
  }
}

app.http('word-lookup', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: wordLookup
});
