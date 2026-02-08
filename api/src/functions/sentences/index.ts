import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/sentences - Generate daily Italian sentences via Azure OpenAI
 */
export async function sentences(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { count = 5, level = 'A2', topics = ['Alltag', 'Reisen', 'Kultur'] } = body;

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const topicStr = topics.join(', ');
    const prompt = `Generiere genau ${count} praktische, alltagstaugliche italienische Sätze für einen deutschen Muttersprachler auf dem Niveau ${level}.

Themen: ${topicStr}

Für jeden Satz liefere:
- "italian": den italienischen Satz
- "german": die deutsche Übersetzung
- "explanation": eine kurze Erklärung (Grammatik, Nuance oder Verwendung) auf Deutsch
- "keywords": Array mit 1-3 Schlüsselwörtern aus dem italienischen Satz

Antworte NUR mit einem JSON-Array, kein zusätzlicher Text. Beispiel:
[{"italian":"...","german":"...","explanation":"...","keywords":["..."]}]

Die Sätze sollen natürlich, warm und nützlich klingen — nicht wie ein Lehrbuch.`;

    const response = await axios.post(
      `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          { 
            role: 'system', 
            content: 'Du bist ein Italienisch-Lernassistent für deutsche Muttersprachler. Antworte immer nur mit validem JSON — kein Markdown, kein ```.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0.8
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
      return { status: 500, jsonBody: { error: 'Failed to generate sentences' } };
    }

    // Parse JSON — strip potential markdown fences
    const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    const sentences = JSON.parse(cleaned);

    return {
      status: 200,
      jsonBody: sentences
    };

  } catch (error: any) {
    console.error('Sentences generation error:', error.message);
    return {
      status: 500,
      jsonBody: { error: error.message || 'Failed to generate sentences' }
    };
  }
}

app.http('sentences', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: sentences
});
