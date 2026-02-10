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

    const contextHint = context ? `\nDer Satz lautet: "${context}"` : '';
    
    const prompt = `Analysiere das italienische Wort "${word}" für einen Deutschsprachigen, der Italienisch lernt.${contextHint}

Ich brauche:
1. baseForm: Die Grundform (Infinitiv bei Verben, Singular bei Nomen, Grundform bei Adjektiven)
2. baseMeaning: Was bedeutet die Grundform auf Deutsch?
3. wordForm: Welche grammatikalische Form ist "${word}"? (z.B. "3. Person Singular Präsens" oder "Plural" oder "Partizip Perfekt")
4. translation: Wie übersetzt man "${word}" im Kontext dieses Satzes?
5. alternatives: Gibt es andere Bedeutungen?

Beispiel für "mangia" im Satz "Il bambino mangia la mela":
{
  "baseForm": "mangiare",
  "baseMeaning": "essen",
  "wordForm": "3. Person Singular Präsens",
  "translation": "isst",
  "alternatives": ["frisst (bei Tieren)"]
}

Beispiel für "belle" im Satz "Le case sono belle":
{
  "baseForm": "bello",
  "baseMeaning": "schön",
  "wordForm": "feminin Plural",
  "translation": "schön",
  "alternatives": ["hübsch", "wunderschön"]
}

Antworte NUR mit validem JSON für "${word}".`;

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
