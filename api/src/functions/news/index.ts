import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/news - Generate Italian news summaries via Azure OpenAI
 */
export async function news(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { level = 'A2' } = body;

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const prompt = `Erstelle 3 ausführliche, lernfreundliche Nachrichtenartikel-Zusammenfassungen auf Italienisch, geeignet für Lernende auf dem Niveau ${level}.
Die Nachrichten sollen aktuelle, realistische Themen behandeln (Kultur, Reisen, Gesellschaft, Technologie, etc.).

Jede Zusammenfassung soll 5-7 Sätze lang sein — genug um den Artikel wirklich zu verstehen und verschiedene Vokabeln und Strukturen zu lernen. Verwende abwechslungsreiche Satzstrukturen.

Liefere als JSON-Array:
[{
  "category": "Thema auf Deutsch",
  "headline": "Überschrift auf Deutsch",
  "italianSummary": "Ausführliche Zusammenfassung auf Italienisch (5-7 Sätze)",
  "german": "Deutsche Übersetzung der Zusammenfassung",
  "source": "https://www.ansa.it",
  "sourceName": "ANSA"
}]

Antworte NUR mit dem JSON-Array.`;

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
        max_tokens: 4000,
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
      return { status: 500, jsonBody: { error: 'Failed to generate news' } };
    }

    // Parse JSON — strip potential markdown fences
    const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    const newsItems = JSON.parse(cleaned);

    return {
      status: 200,
      jsonBody: newsItems
    };

  } catch (error: any) {
    console.error('News generation error:', error.message);
    return {
      status: 500,
      jsonBody: { error: error.message || 'Failed to generate news' }
    };
  }
}

app.http('news', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: news
});
