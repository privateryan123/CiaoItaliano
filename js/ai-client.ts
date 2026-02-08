/**
 * CiaoItaliano - Azure Functions API Client
 * 
 * This module provides type-safe wrappers around the backend API endpoints.
 * All secrets are handled server-side; the frontend only calls public endpoints.
 */

interface TranslateRequest {
  text: string;
  sourceLanguage?: string;  // default: 'de'
  targetLanguage?: string;  // default: 'it'
}

interface TranslateResponse {
  translatedText: string;
}

interface StoryRequest {
  topic: string;
  difficultyLevel?: string;  // default: 'A2', allowed: A1|A2|B1|B2
  maxTokens?: number;        // default: 2000
}

interface StoryResponse {
  story: string;
  metadata?: {
    topic: string;
    difficultyLevel: string;
    tokensUsed: number;
  };
}

interface ErrorResponse {
  error: string;
}

// Get API base URL - respects proxy routing
const API_BASE = '/api';

/**
 * Translate text from one language to another
 * Server-side: Uses Azure Cognitive Services Translator
 * 
 * @example
 * const result = await AIClient.translate({
 *   text: 'Guten Morgen',
 *   sourceLanguage: 'de',
 *   targetLanguage: 'it'
 * });
 * console.log(result.translatedText); // "Buongiorno"
 */
export async function translate(req: TranslateRequest): Promise<TranslateResponse> {
  try {
    const response = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text: req.text,
        sourceLanguage: req.sourceLanguage || 'de',
        targetLanguage: req.targetLanguage || 'it'
      })
    });

    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json() as TranslateResponse;
  } catch (error) {
    throw new AIClientError(
      error instanceof Error ? error.message : 'Translation failed',
      'TRANSLATE'
    );
  }
}

/**
 * Generate an Italian learning story
 * Server-side: Uses Azure OpenAI
 * 
 * @example
 * const result = await AIClient.generateStory({
 *   topic: 'Daily life',
 *   difficultyLevel: 'A2',
 *   maxTokens: 1500
 * });
 * console.log(result.story);
 */
export async function generateStory(req: StoryRequest): Promise<StoryResponse> {
  try {
    const response = await fetch(`${API_BASE}/story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        topic: req.topic,
        difficultyLevel: req.difficultyLevel || 'A2',
        maxTokens: req.maxTokens || 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json() as StoryResponse;
  } catch (error) {
    throw new AIClientError(
      error instanceof Error ? error.message : 'Story generation failed',
      'STORY'
    );
  }
}

/**
 * Batch translate multiple texts (for efficiency)
 */
export async function translateBatch(
  texts: string[],
  sourceLanguage: string = 'de',
  targetLanguage: string = 'it'
): Promise<string[]> {
  const results = await Promise.all(
    texts.map(text =>
      translate({ text, sourceLanguage, targetLanguage })
    )
  );
  return results.map(r => r.translatedText);
}

/**
 * Generate story with retry logic
 * Handles rate limiting (429 errors) with exponential backoff
 */
export async function generateStoryWithRetry(
  req: StoryRequest,
  maxRetries: number = 3
): Promise<StoryResponse> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await generateStory(req);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if it's a rate limit error
      if (lastError.message.includes('Rate limit')) {
        const delayMs = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }

      // Non-retryable error
      throw lastError;
    }
  }

  throw new AIClientError(
    lastError?.message || 'Story generation failed after retries',
    'STORY_RETRY'
  );
}

/**
 * Custom error class for AI client operations
 */
export class AIClientError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'AIClientError';
  }

  isRateLimited(): boolean {
    return this.message.includes('Rate limit') || this.code === 'RATE_LIMITED';
  }

  isAuthError(): boolean {
    return this.message.includes('401') || this.message.includes('Authentication');
  }

  isNetworkError(): boolean {
    return this.message.includes('network') || this.message.includes('timeout');
  }
}

/**
 * Usage Example in App
 * ==================
 * 
 * // In your Vue/React/Vanilla JS component:
 * 
 * async function generateDailyContent() {
 *   try {
 *     // Generate story
 *     const storyResult = await generateStoryWithRetry({
 *       topic: 'Alltag',
 *       difficultyLevel: 'A2'
 *     });
 *     
 *     console.log('Story:', storyResult.story);
 *     console.log('Tokens used:', storyResult.metadata?.tokensUsed);
 *     
 *     // Cache in localStorage
 *     localStorage.setItem('daily_story_' + new Date().toDateString(), storyResult.story);
 * 
 *   } catch (error) {
 *     if (error instanceof AIClientError) {
 *       if (error.isRateLimited()) {
 *         showToast('Rate limited. Please try again in a few minutes.');
 *       } else if (error.isAuthError()) {
 *         showToast('Authentication failed. Check API configuration.');
 *       } else {
 *         showToast('Error: ' + error.message);
 *       }
 *     }
 *   }
 * }
 */
