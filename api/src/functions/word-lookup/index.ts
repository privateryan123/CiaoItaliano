import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

/**
 * Scrape WordReference IT-DE for word definitions and forms
 */
async function scrapeWordReference(word: string): Promise<{
  baseForm: string | null;
  translations: string[];
  wordType: string | null;
}> {
  try {
    const url = `https://www.wordreference.com/itde/${encodeURIComponent(word.toLowerCase())}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'de-DE,de;q=0.9'
      },
      timeout: 8000
    });
    
    const html = response.data as string;
    const translations: string[] = [];
    let baseForm: string | null = null;
    let wordType: string | null = null;
    
    // Check if redirected to a different form (conjugated → infinitive)
    // WordReference shows "Formentabelle" link for inflected words
    const inflectionMatch = html.match(/href="\/conj\/itverbs\.aspx\?v=([^"]+)"/i);
    if (inflectionMatch) {
      baseForm = decodeURIComponent(inflectionMatch[1]);
    }
    
    // Extract word type (verb, noun, etc) from POS tag
    const posMatch = html.match(/<span class="POS2"[^>]*>([^<]+)<\/span>/i);
    if (posMatch) {
      wordType = posMatch[1].trim();
    }
    
    // Extract translations from ToWrd cells
    const toWrdRegex = /<td class="ToWrd"[^>]*>([^<]+)/gi;
    let match;
    while ((match = toWrdRegex.exec(html)) !== null && translations.length < 6) {
      const trans = match[1].trim().replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
      if (trans && trans.length > 0 && trans.length < 50 && !translations.includes(trans)) {
        translations.push(trans);
      }
    }
    
    // Also try FrWrd pattern as fallback
    if (translations.length === 0) {
      const frwrdRegex = /<strong>([^<]+)<\/strong>.*?<td[^>]*class="ToWrd"[^>]*>([^<]+)/gis;
      while ((match = frwrdRegex.exec(html)) !== null && translations.length < 6) {
        const trans = match[2].trim().replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
        if (trans && trans.length > 0 && trans.length < 50 && !translations.includes(trans)) {
          translations.push(trans);
        }
      }
    }
    
    return { baseForm, translations, wordType };
  } catch (error) {
    console.error('WordReference scrape error:', error);
    return { baseForm: null, translations: [], wordType: null };
  }
}

/**
 * POST /api/word-lookup - Look up Italian word translation
 * Uses WordReference for definitions + OpenAI for grammatical context
 */
export async function wordLookup(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body: any = request.body ? JSON.parse(await request.text()) : {};
    const { word, context } = body;

    if (!word || word.length === 0 || word.length > 100) {
      return { status: 400, jsonBody: { error: 'Word must be 1-100 chars' } };
    }

    // Step 1: Scrape WordReference for reliable translations
    const wrData = await scrapeWordReference(word);
    
    // Step 2: Use OpenAI to analyze grammatical form and provide context
    const OPENAI_URL = process.env.AZURE_OPENAI_URL;
    const OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
    const OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

    let aiAnalysis: any = null;
    
    if (OPENAI_URL && OPENAI_KEY && OPENAI_DEPLOYMENT) {
      try {
        const contextHint = context ? `\nSatz: "${context}"` : '';
        const wrHint = wrData.translations.length > 0 
          ? `\nWordReference Übersetzungen: ${wrData.translations.slice(0, 3).join(', ')}` 
          : '';
        const baseHint = wrData.baseForm ? `\nGrundform laut WordReference: ${wrData.baseForm}` : '';
        
        const prompt = `Analysiere "${word}" (Italienisch→Deutsch).${contextHint}${wrHint}${baseHint}

Gib mir ein JSON mit:
- "baseForm": Infinitiv (bei Verben) oder Grundform (bei Nomen/Adj). Falls "${word}" schon Grundform ist, wiederhole es.
- "baseMeaning": Deutsche Bedeutung der Grundform (1-3 Wörter)
- "wordForm": Grammatische Form von "${word}" (z.B. "3. Pers. Sing. Präsens", "fem. Plural", "Partizip Perfekt"). Kurz halten!
- "contextMeaning": Übersetzung von "${word}" im Satzkontext (1-3 Wörter)

Beispiel für "mangia" im Satz "Il gatto mangia":
{"baseForm":"mangiare","baseMeaning":"essen","wordForm":"3. Pers. Sing. Präsens","contextMeaning":"frisst"}

NUR valides JSON, keine Erklärungen:`;

        const response = await axios.post(
          `${OPENAI_URL}openai/deployments/${OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
          {
            messages: [
              { role: 'system', content: 'Antworte nur mit validem JSON. Keine Markdown-Formatierung.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 150,
            temperature: 0.1
          },
          { headers: { 'api-key': OPENAI_KEY, 'Content-Type': 'application/json' } }
        );

        const raw = response.data?.choices?.[0]?.message?.content?.trim() || '';
        const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
        aiAnalysis = JSON.parse(cleaned);
      } catch (aiError) {
        console.error('AI analysis error:', aiError);
      }
    }

    // Step 3: Combine results
    const result = {
      word: word,
      baseForm: aiAnalysis?.baseForm || wrData.baseForm || word,
      baseMeaning: aiAnalysis?.baseMeaning || (wrData.translations[0] || null),
      wordForm: aiAnalysis?.wordForm || wrData.wordType || null,
      translation: aiAnalysis?.contextMeaning || wrData.translations[0] || null,
      alternatives: wrData.translations.slice(1, 4)
    };

    return { status: 200, jsonBody: result };

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
