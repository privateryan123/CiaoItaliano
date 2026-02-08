import { HttpRequest, HttpResponseInit, app } from '@azure/functions';

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
 * GET /api/scrape-news - Scrape ANSA.it for daily news articles
 */
export async function scrapeNews(request: HttpRequest): Promise<HttpResponseInit> {
  try {
    // Return test data to verify endpoint is working
    const testArticles: NewsArticle[] = [
      {
        category: 'Politica',
        headline: 'Governo annuncia riforme economiche',
        url: 'https://www.ansa.it/',
        sentences: [
          {
            italian: 'Il governo italiano ha annunciato nuove riforme.',
            german: 'Die italienische Regierung hat neue Reformen angekündigt.'
          },
          {
            italian: 'Le misure dovrebbero entrare in vigore entro marzo.',
            german: 'Die Maßnahmen sollen bis März in Kraft treten.'
          }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Mondo',
        headline: 'Elezioni in corso in due paesi europei',
        url: 'https://www.ansa.it/',
        sentences: [
          {
            italian: 'Oggi si tengono elezioni importanti in Europa.',
            german: 'Heute finden wichtige Wahlen in Europa statt.'
          },
          {
            italian: 'I risultati influenzeranno la politica del continente.',
            german: 'Die Ergebnisse werden die Politik des Kontinents beeinflussen.'
          }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Mondo',
        headline: 'Nuovi accordi commerciali firmati',
        url: 'https://www.ansa.it/',
        sentences: [
          {
            italian: 'Tre paesi hanno firmato un accordo commerciale storico.',
            german: 'Drei Länder haben ein historisches Handelsabkommen unterzeichnet.'
          },
          {
            italian: 'L\'accordo mira a ridurre le tariffe doganali.',
            german: 'Das Abkommen zielt darauf ab, Zollsätze zu senken.'
          }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Sport',
        headline: 'Calcio: Italia vince contro la rivale',
        url: 'https://www.ansa.it/',
        sentences: [
          {
            italian: 'La nazionale italiana di calcio ha vinto 2-1 contro una squadra rivale.',
            german: 'Die italienische Fußballnationalmannschaft besiegte ein Rivalesteam mit 2:1.'
          },
          {
            italian: 'È stata una partita entusiasmante con molte emozioni.',
            german: 'Es war ein spannendes Spiel mit vielen Emotionen.'
          }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Economia',
        headline: 'Mercato azionario in rialzo oggi',
        url: 'https://www.ansa.it/',
        sentences: [
          {
            italian: 'L\'economia italiana cresce più del previsto questo trimestre.',
            german: 'Die italienische Wirtschaft wächst dieses Quartal stärker als erwartet.'
          },
          {
            italian: 'Gli analisti sono moderatamente ottimisti per il futuro.',
            german: 'Analysten sind für die Zukunft gemäßigt optimistisch.'
          }
        ],
        scrapedAt: new Date().toISOString()
      }
    ];

    return {
      status: 200,
      jsonBody: {
        date: new Date().toISOString().split('T')[0],
        articles: testArticles
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

app.http('scrape-news', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: scrapeNews
});
