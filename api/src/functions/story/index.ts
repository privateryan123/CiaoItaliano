import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/story - Generate Italian learning stories via Azure OpenAI
 */
export async function story(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { level = 'A2', topics = ['Alltag'] } = body;

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const topicStr = topics[Math.floor(Math.random() * topics.length)];
    const prompt = `Schreibe eine ausführliche, immersive italienische Geschichte zum Thema "${topicStr}" für Lernende auf dem Niveau ${level}.

Die Geschichte soll 16-20 Sätze haben, aufgeteilt in 4-5 Seiten (je 4 Sätze pro Seite). Die Geschichte soll einen echten Handlungsbogen haben — mit Einleitung, Höhepunkt und einem befriedigenden Ende. Beschreibe Szenen lebendig mit Details, Dialogen und Gefühlen.

Liefere das Ergebnis als JSON-Objekt:
{
  "title": "Titel der Geschichte auf Italienisch",
  "topic": "${topicStr}",
  "level": "${level}",
  "readingTime": "5 min",
  "pages": [
    [
      {"italian":"...","german":"...","note":"Erkläre KURZ wichtige Verben/Phrasen: «verb» (Infinitiv: X, hier Y-Form). Nur bei interessanten Formen."},
      ...
    ],
    ...
  ]
}

Antworte NUR mit dem JSON-Objekt. Die Geschichte soll menschlich, warm und realistisch sein — wie ein Kapitel aus einem kleinen Roman.`;

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
      return { status: 500, jsonBody: { error: 'Failed to generate story' } };
    }

    // Parse JSON — strip potential markdown fences
    const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    const storyData = JSON.parse(cleaned);

    return {
      status: 200,
      jsonBody: storyData
    };

  } catch (error: any) {
    console.error('Story error:', error.message);
    return { status: 500, jsonBody: { error: error.message || 'Story generation error' } };
  }
}

app.http('story', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: story
});
