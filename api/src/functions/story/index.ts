import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * POST /api/story - Generate Italian learning stories via Azure OpenAI
 */
export async function story(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { topic = 'Alltag', difficultyLevel = 'A2' } = body;

    const validLevels = ['A1', 'A2', 'B1', 'B2'];
    if (!validLevels.includes(difficultyLevel)) {
      return { status: 400, jsonBody: { error: `Invalid difficulty` } };
    }

    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!OPENAI_URL || !OPENAI_KEY || !OPENAI_DEPLOYMENT) {
      return { status: 500, jsonBody: { error: 'OpenAI not configured' } };
    }

    const response = await axios.post(
      `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          { role: 'system', content: `You are an Italian learning assistant for German speakers. Generate a short story about ${topic} for ${difficultyLevel} level. Return only the story text.` },
          { role: 'user', content: `Write a story in Italian about: ${topic}` }
        ],
        max_tokens: 2000,
        temperature: 0.7
      },
      {
        headers: {
          'api-key': OPENAI_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const storyText = response.data?.choices?.[0]?.message?.content;
    if (!storyText) {
      return { status: 500, jsonBody: { error: 'Failed to generate story' } };
    }

    return {
      status: 200,
      jsonBody: {
        story: storyText,
        metadata: { topic, difficultyLevel }
      }
    };

  } catch (error) {
    console.error('Story error:', error);
    return { status: 500, jsonBody: { error: 'Story generation error' } };
  }
}

app.http('story', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: story
});
