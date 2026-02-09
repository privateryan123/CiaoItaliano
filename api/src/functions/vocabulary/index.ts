import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import { getVocabulary, saveVocabularyItem, removeVocabularyItem } from '../../shared/blobStorage';
import axios from 'axios';

/**
 * Lookup word in WordReference and scrape definition
 */
async function lookupWordReference(word: string): Promise<{ definitions: string[], examples: string[] }> {
  try {
    // WordReference doesn't have an official API, so we use the mobile endpoint
    // which returns simpler HTML that's easier to parse
    const url = `https://www.wordreference.com/iten/${encodeURIComponent(word)}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 5000
    });
    
    const html = response.data;
    
    // Extract main translations from the table
    const definitions: string[] = [];
    const examples: string[] = [];
    
    // Simple regex to find translation entries in WordReference HTML
    // Look for Italian to German translations in the table cells
    const translationRegex = /<td class="ToWrd"[^>]*>([^<]+)<\/td>/gi;
    let match;
    while ((match = translationRegex.exec(html)) !== null && definitions.length < 5) {
      const def = match[1].trim();
      if (def && !definitions.includes(def)) {
        definitions.push(def);
      }
    }
    
    // If no ToWrd found, try alternative pattern
    if (definitions.length === 0) {
      const altRegex = /<span class="FrWrd"[^>]*>.*?<\/span>.*?<td[^>]*>([^<]+)<\/td>/gis;
      while ((match = altRegex.exec(html)) !== null && definitions.length < 5) {
        const def = match[1].trim();
        if (def && def.length > 0 && !definitions.includes(def)) {
          definitions.push(def);
        }
      }
    }
    
    return { definitions, examples };
  } catch (error) {
    console.error('WordReference lookup error:', error);
    return { definitions: [], examples: [] };
  }
}

/**
 * GET /api/vocabulary - Get all vocabulary for a user
 * POST /api/vocabulary - Add a word or sentence
 * DELETE /api/vocabulary - Remove a word or sentence
 */
export async function vocabulary(request: HttpRequest): Promise<HttpResponseInit> {
  // For now we use a default user ID - later can integrate with auth
  const userId = request.headers.get('x-user-id') || 'default';
  
  try {
    if (request.method === 'GET') {
      const vocab = await getVocabulary(userId);
      return {
        status: 200,
        jsonBody: vocab
      };
    }
    
    if (request.method === 'POST') {
      const body: any = request.body ? JSON.parse(await request.text()) : {};
      const { type, italian, german } = body;
      
      if (!type || !italian) {
        return { status: 400, jsonBody: { error: 'type and italian are required' } };
      }
      
      if (type !== 'word' && type !== 'sentence') {
        return { status: 400, jsonBody: { error: 'type must be "word" or "sentence"' } };
      }
      
      let finalGerman = german;
      let wordRefUrl: string | undefined;
      let definitions: string[] = [];
      
      // For words, lookup in WordReference
      if (type === 'word') {
        wordRefUrl = `https://www.wordreference.com/iten/${encodeURIComponent(italian)}`;
        
        // Try to get definitions from WordReference
        const wrData = await lookupWordReference(italian);
        definitions = wrData.definitions;
        
        // If no German translation provided, use first definition or translate
        if (!finalGerman && definitions.length > 0) {
          finalGerman = definitions[0];
        }
        
        // Fallback to translation API if still no German
        if (!finalGerman) {
          const TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
          const TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
          const TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION || 'westeurope';
          
          if (TRANSLATOR_KEY && TRANSLATOR_ENDPOINT) {
            try {
              const transResponse = await axios.post(
                `${TRANSLATOR_ENDPOINT}translate?api-version=3.0&from=it&to=de`,
                [{ text: italian }],
                {
                  headers: {
                    'Ocp-Apim-Subscription-Key': TRANSLATOR_KEY,
                    'Ocp-Apim-Subscription-Region': TRANSLATOR_REGION,
                    'Content-Type': 'application/json'
                  }
                }
              );
              finalGerman = transResponse.data?.[0]?.translations?.[0]?.text || italian;
            } catch (e) {
              console.error('Translation fallback error:', e);
              finalGerman = italian;
            }
          }
        }
      }
      
      const item = {
        italian,
        german: finalGerman || italian,
        added: new Date().toISOString(),
        ...(wordRefUrl && { wordRefUrl }),
        ...(definitions.length > 0 && { definitions })
      };
      
      const success = await saveVocabularyItem(userId, type, item);
      
      if (success) {
        return {
          status: 201,
          jsonBody: { success: true, item }
        };
      } else {
        return {
          status: 409,
          jsonBody: { error: 'Item already exists' }
        };
      }
    }
    
    if (request.method === 'DELETE') {
      const body: any = request.body ? JSON.parse(await request.text()) : {};
      const { type, italian } = body;
      
      if (!type || !italian) {
        return { status: 400, jsonBody: { error: 'type and italian are required' } };
      }
      
      await removeVocabularyItem(userId, type, italian);
      
      return {
        status: 200,
        jsonBody: { success: true }
      };
    }
    
    return { status: 405, jsonBody: { error: 'Method not allowed' } };
    
  } catch (error) {
    console.error('Vocabulary API error:', error);
    return { status: 500, jsonBody: { error: 'Server error' } };
  }
}

app.http('vocabulary', {
  methods: ['GET', 'POST', 'DELETE'],
  authLevel: 'anonymous',
  handler: vocabulary
});
