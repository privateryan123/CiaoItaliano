import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';
import { getRateLimiter } from '../shared/rateLimiter';
import { getCacheKey, getFromCache, setInCache } from '../shared/cache';

/**
 * POST /api/story
 * Generates Italian learning stories using Azure OpenAI
 * 
 * Request body:
 * {
 *   "topic": "Alltag",
 *   "difficultyLevel": "A2",
 *   "maxTokens": 2000
 * }
 * 
 * Response: { "story": "..." }
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

    const { topic = 'Alltag', difficultyLevel = 'A2', maxTokens = 2000 } = req.body || {};

    if (!topic || typeof topic !== 'string') {
      context.res = {
        status: 400,
        body: { error: 'Missing or invalid "topic" parameter' }
      };
      return;
    }

    const validLevels = ['A1', 'A2', 'B1', 'B2'];
    if (!validLevels.includes(difficultyLevel)) {
      context.res = {
        status: 400,
        body: { error: `Invalid difficulty level. Allowed: ${validLevels.join(', ')}` }
      };
      return;
    }

    // === TOKEN LIMIT ENFORCEMENT ===
    const maxAllowedTokens = parseInt(process.env.APP_STORY_MAX_TOKENS || '2000');
    const finalMaxTokens = Math.min(maxTokens, maxAllowedTokens);

    // === RATE LIMITING (Per-day limit) ===
    const rateLimiter = getRateLimiter('stories_per_day');
    const allowed = await rateLimiter.isAllowed(clientIp, 'day');
    if (!allowed) {
      context.res = {
        status: 429,
        body: { error: 'Rate limit exceeded. Max 5 stories per day per user.' }
      };
      return;
    }

    // === CACHE CHECK ===
    const cacheKey = getCacheKey('story', { topic, difficultyLevel });
    const cached = await getFromCache(cacheKey);
    
    if (cached) {
      context.log(`Cache hit for story: ${topic}`);
      context.res = {
        status: 200,
        body: { story: cached }
      };
      return;
    }

    // === OPENAI API CALL ===
    const openaiUrl = process.env.AZURE_OPENAI_URL;
    const openaiKey = process.env.AZURE_OPENAI_KEY;
    const openaiDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!openaiUrl || !openaiKey || !openaiDeployment) {
      context.log.error('OpenAI credentials not configured');
      context.res = {
        status: 500,
        body: { error: 'Story generation service unavailable' }
      };
      return;
    }

    const systemPrompt = `You are an Italian language learning assistant for German speakers. 
Generate engaging, realistic stories appropriate for the difficulty level ${difficultyLevel}.
Keep stories natural, warm, and educational. Include varied sentence structures and useful vocabulary.
Return ONLY the story text, no JSON formatting or markdown.`;

    const userPrompt = `Write a short Italian learning story about: "${topic}" 
Difficulty: ${difficultyLevel}
Length: approximately ${finalMaxTokens} tokens
Audience: German learners of Italian`;

    const response = await axios.post(
      `${openaiUrl}openai/deployments/${openaiDeployment}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: finalMaxTokens,
        top_p: 0.95
      },
      {
        headers: {
          'api-key': openaiKey,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const story = response.data?.choices?.[0]?.message?.content?.trim();
    
    if (!story) {
      context.log.error('Unexpected OpenAI response format', response.data);
      context.res = {
        status: 500,
        body: { error: 'Unexpected response from story generation service' }
      };
      return;
    }

    // === CACHE RESULT ===
    await setInCache(cacheKey, story, 86400); // 24-hour cache

    context.log(`Story generated successfully for topic: ${topic}`);
    
    context.res = {
      status: 200,
      body: { 
        story,
        metadata: {
          topic,
          difficultyLevel,
          tokensUsed: response.data?.usage?.completion_tokens || 0
        }
      }
    };

  } catch (error) {
    context.log.error('Story generation function error:', error);

    // Handle specific error types
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        context.res = {
          status: 503,
          body: { error: 'Story generation service rate limited. Please try again later.' }
        };
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        context.log.error('Authentication failed for OpenAI service');
        context.res = {
          status: 500,
          body: { error: 'Story generation service authentication failed' }
        };
      } else if (error.response?.status === 400) {
        context.log.error('Invalid request to OpenAI:', error.response.data);
        context.res = {
          status: 400,
          body: { error: 'Invalid parameters for story generation' }
        };
      } else {
        context.res = {
          status: 500,
          body: { error: 'Story generation service unavailable' }
        };
      }
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
