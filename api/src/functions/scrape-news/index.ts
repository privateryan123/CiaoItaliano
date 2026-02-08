import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import axios from 'axios';

interface SentencePair {
  italian: string;
  german: string;
}

interface NewsArticle {
  category: string;
  headline: string;
  url: string;
  sentences: SentencePair[];
  scrapedAt: string;
}

/**
 * POST /api/scrape-news - Scrape ANSA.it for daily news articles
 */
export async function scrapeNews(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    const TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
    const TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;

    if (!TRANSLATOR_KEY || !TRANSLATOR_ENDPOINT) {
      return { status: 500, jsonBody: { error: 'Translator not configured' } };
    }

    // Fetch ANSA.it homepage
    const ansaResponse = await axios.get('https://www.ansa.it/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = ansaResponse.data;

    // Extract article URLs from different categories
    const articles: NewsArticle[] = [];

    // Extract URLs from politica (1 article)
    const politicsMatch = html.match(/href="(\/sito\/notizie\/politica\/[^"]+)"/);
    if (politicsMatch) {
      const article = await scrapeArticle(politicsMatch[1], 'Politica', TRANSLATOR_KEY, TRANSLATOR_ENDPOINT, TRANSLATOR_REGION);
      if (article) articles.push(article);
    }

    // Extract URLs from mondo (2 articles)
    const mondoMatches = html.match(/href="(\/sito\/notizie\/mondo\/[^"]+)"/g);
    if (mondoMatches && mondoMatches.length >= 2) {
      for (let i = 0; i < Math.min(2, mondoMatches.length); i++) {
        const urlMatch = mondoMatches[i].match(/href="([^"]+)"/);
        if (urlMatch) {
          const article = await scrapeArticle(urlMatch[1], 'Mondo', TRANSLATOR_KEY, TRANSLATOR_ENDPOINT, TRANSLATOR_REGION);
          if (article) articles.push(article);
        }
      }
    }

    // Extract URLs from sport (1 article)
    const sportMatch = html.match(/href="(\/sito\/notizie\/sport\/[^"]+)"/);
    if (sportMatch) {
      const article = await scrapeArticle(sportMatch[1], 'Sport', TRANSLATOR_KEY, TRANSLATOR_ENDPOINT, TRANSLATOR_REGION);
      if (article) articles.push(article);
    }

    // Extract URLs from economia (1 article)
    const economiaMatch = html.match(/href="(\/sito\/notizie\/economia\/[^"]+)"/);
    if (economiaMatch) {
      const article = await scrapeArticle(economiaMatch[1], 'Economia', TRANSLATOR_KEY, TRANSLATOR_ENDPOINT, TRANSLATOR_REGION);
      if (article) articles.push(article);
    }

    return {
      status: 200,
      jsonBody: {
        date: new Date().toISOString().split('T')[0],
        articles: articles
      }
    };

  } catch (error: any) {
    console.error('Scraping error:', error.message);
    return {
      status: 500,
      jsonBody: { error: error.message || 'Failed to scrape news' }
    };
  }
}

async function scrapeArticle(
  urlPath: string, 
  category: string,
  translatorKey: string,
  translatorEndpoint: string,
  translatorRegion: string
): Promise<NewsArticle | null> {
  try {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `https://www.ansa.it${urlPath}`;
    
    const response = await axios.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;

    // Extract headline
    const headlineMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const headline = headlineMatch ? headlineMatch[1].trim() : 'Untitled';

    // Extract article text - look for paragraph tags
    const paragraphs: string[] = [];
    const pMatches = html.matchAll(/<p[^>]*>([^<]+)<\/p>/g);
    
    for (const match of pMatches) {
      const text = match[1].trim();
      // Filter out navigation/metadata text
      if (text.length > 50 && !text.includes('ANSA') && !text.includes('Riproduzione riservata')) {
        paragraphs.push(text);
        if (paragraphs.length >= 5) break; // Limit to first 5 paragraphs
      }
    }

    if (paragraphs.length === 0) {
      return null;
    }

    // Split into sentences and translate
    const sentences: SentencePair[] = [];
    
    for (const paragraph of paragraphs) {
      // Split by sentence (basic Italian sentence splitting)
      const sentenceList = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      
      for (const sentence of sentenceList) {
        const italianSentence = sentence.trim();
        if (italianSentence.length < 10) continue;

        // Translate to German using Azure Translator
        const translation = await translateText(italianSentence, translatorKey, translatorEndpoint, translatorRegion);
        
        sentences.push({
          italian: italianSentence,
          german: translation
        });

        if (sentences.length >= 10) break; // Limit to 10 sentences per article
      }
      
      if (sentences.length >= 10) break;
    }

    return {
      category,
      headline,
      url: fullUrl,
      sentences,
      scrapedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Error scraping article ${urlPath}:`, error);
    return null;
  }
}

async function translateText(
  text: string,
  key: string,
  endpoint: string,
  region: string
): Promise<string> {
  try {
    const response = await axios.post(
      `${endpoint}/translate?api-version=3.0&from=it&to=de`,
      [{ text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': region,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data[0]?.translations[0]?.text || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original if translation fails
  }
}

app.http('scrape-news', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: scrapeNews
});
