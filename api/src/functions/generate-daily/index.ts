import { app, InvocationContext, Timer, HttpRequest, HttpResponseInit } from '@azure/functions';
import { BlobStorage } from '../../shared/blobStorage';

// Daily content topics for variety
const TOPICS = [
  'Greetings & Introductions',
  'Food & Dining', 
  'Travel & Transportation',
  'Shopping & Money',
  'Family & Relationships',
  'Weather & Seasons',
  'Work & Professions',
  'Hobbies & Free Time',
  'Health & Body',
  'Home & Living',
  'Numbers & Time',
  'Emotions & Feelings'
];

const STORY_TOPICS = [
  'La vita quotidiana',
  'Un viaggio in Italia',
  'Al ristorante',
  'La famiglia italiana',
  'Una giornata al mare',
  'Lo shopping in città',
  'La festa di compleanno',
  'Il primo giorno di lavoro'
];

// Get topic based on date (rotates through topics)
function getTopicForDate(dateStr: string): string {
  const date = new Date(dateStr);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  return TOPICS[dayOfYear % TOPICS.length];
}

function getStoryTopicForDate(dateStr: string): string {
  const date = new Date(dateStr);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  return STORY_TOPICS[dayOfYear % STORY_TOPICS.length];
}

// Generate sentences for a topic (placeholder - replace with AI call)
function generateSentences(topic: string, dateStr: string): any[] {
  // This would call Azure OpenAI in production
  // For now, return template sentences based on topic
  const sentenceTemplates: Record<string, any[]> = {
    'Greetings & Introductions': [
      { italian: "Buongiorno! Come sta?", german: "Guten Tag! Wie geht es Ihnen?", explanation: "Formal greeting. «Buongiorno» = Good day, «Come sta?» = How are you? (formal)", keywords: ["buongiorno", "come", "sta"] },
      { italian: "Mi chiamo Anna. E Lei?", german: "Ich heiße Anna. Und Sie?", explanation: "«Mi chiamo» = I am called. «E Lei?» = And you? (formal)", keywords: ["chiamo", "lei"] },
      { italian: "Piacere di conoscerLa.", german: "Freut mich, Sie kennenzulernen.", explanation: "Formal way to say 'Nice to meet you'. «Piacere» = pleasure", keywords: ["piacere", "conoscere"] },
      { italian: "Di dove sei?", german: "Woher kommst du?", explanation: "«Di dove» = from where, «sei» = you are (informal)", keywords: ["dove", "sei"] },
      { italian: "Sono tedesco/tedesca.", german: "Ich bin Deutscher/Deutsche.", explanation: "«Sono» = I am. Nationality changes based on gender.", keywords: ["sono", "tedesco"] }
    ],
    'Food & Dining': [
      { italian: "Vorrei un caffè, per favore.", german: "Ich möchte einen Kaffee, bitte.", explanation: "«Vorrei» = I would like (conditional). Very polite form.", keywords: ["vorrei", "caffè", "favore"] },
      { italian: "Il conto, per favore.", german: "Die Rechnung, bitte.", explanation: "«Il conto» = the bill. Common phrase in restaurants.", keywords: ["conto", "favore"] },
      { italian: "Che cosa mi consiglia?", german: "Was empfehlen Sie mir?", explanation: "«Consigliare» = to recommend. «Che cosa» = what", keywords: ["consiglia", "cosa"] },
      { italian: "È buonissimo!", german: "Es ist sehr lecker!", explanation: "«Buonissimo» = superlative of «buono» (good). -issimo = very", keywords: ["buonissimo"] },
      { italian: "Posso avere il menù?", german: "Kann ich die Speisekarte haben?", explanation: "«Posso» = I can. «Avere» = to have. «Menù» = menu", keywords: ["posso", "avere", "menù"] }
    ],
    'Travel & Transportation': [
      { italian: "Quanto costa un biglietto?", german: "Wie viel kostet eine Fahrkarte?", explanation: "«Quanto costa» = how much does it cost. «Biglietto» = ticket", keywords: ["quanto", "costa", "biglietto"] },
      { italian: "A che ora parte il treno?", german: "Um wie viel Uhr fährt der Zug ab?", explanation: "«A che ora» = at what time. «Partire» = to depart", keywords: ["ora", "parte", "treno"] },
      { italian: "Dov'è la stazione?", german: "Wo ist der Bahnhof?", explanation: "«Dov'è» = where is (dove + è). «Stazione» = station", keywords: ["dove", "stazione"] },
      { italian: "Vorrei prenotare un posto.", german: "Ich möchte einen Platz reservieren.", explanation: "«Prenotare» = to book/reserve. «Posto» = place/seat", keywords: ["prenotare", "posto"] },
      { italian: "Il volo è in ritardo.", german: "Der Flug hat Verspätung.", explanation: "«Volo» = flight. «In ritardo» = delayed/late", keywords: ["volo", "ritardo"] }
    ],
    'Shopping & Money': [
      { italian: "Quanto costa questo?", german: "Wie viel kostet das?", explanation: "«Questo» = this. Essential shopping phrase.", keywords: ["quanto", "costa", "questo"] },
      { italian: "Posso pagare con carta?", german: "Kann ich mit Karte zahlen?", explanation: "«Pagare» = to pay. «Carta» = card", keywords: ["pagare", "carta"] },
      { italian: "È troppo caro.", german: "Das ist zu teuer.", explanation: "«Troppo» = too much. «Caro» = expensive", keywords: ["troppo", "caro"] },
      { italian: "Avete una taglia più piccola?", german: "Haben Sie eine kleinere Größe?", explanation: "«Taglia» = size. «Più piccola» = smaller", keywords: ["taglia", "piccola"] },
      { italian: "Lo prendo.", german: "Ich nehme es.", explanation: "«Prendere» = to take. «Lo» = it (masculine)", keywords: ["prendo"] }
    ],
    'Family & Relationships': [
      { italian: "Ho una sorella e un fratello.", german: "Ich habe eine Schwester und einen Bruder.", explanation: "«Sorella» = sister. «Fratello» = brother", keywords: ["sorella", "fratello"] },
      { italian: "I miei genitori abitano a Roma.", german: "Meine Eltern wohnen in Rom.", explanation: "«Genitori» = parents. «Abitare» = to live/reside", keywords: ["genitori", "abitano"] },
      { italian: "Sei sposato/sposata?", german: "Bist du verheiratet?", explanation: "«Sposato/a» = married. Changes based on gender.", keywords: ["sposato"] },
      { italian: "Ho due figli.", german: "Ich habe zwei Kinder.", explanation: "«Figli» = children/sons. «Figlie» = daughters", keywords: ["figli"] },
      { italian: "Mia nonna cucina benissimo.", german: "Meine Großmutter kocht sehr gut.", explanation: "«Nonna» = grandmother. «Nonno» = grandfather", keywords: ["nonna", "cucina"] }
    ],
    'Weather & Seasons': [
      { italian: "Che tempo fa oggi?", german: "Wie ist das Wetter heute?", explanation: "«Che tempo fa» = what's the weather like. Idiomatic expression.", keywords: ["tempo", "oggi"] },
      { italian: "Fa molto caldo.", german: "Es ist sehr heiß.", explanation: "«Fa caldo» = it's hot. «Fa freddo» = it's cold", keywords: ["caldo"] },
      { italian: "Piove da tre giorni.", german: "Es regnet seit drei Tagen.", explanation: "«Piovere» = to rain. «Da» = since/for (time)", keywords: ["piove", "giorni"] },
      { italian: "In estate vado al mare.", german: "Im Sommer fahre ich ans Meer.", explanation: "«Estate» = summer. «Mare» = sea", keywords: ["estate", "mare"] },
      { italian: "L'autunno è la mia stagione preferita.", german: "Der Herbst ist meine Lieblingsjahreszeit.", explanation: "«Autunno» = autumn. «Stagione» = season", keywords: ["autunno", "stagione"] }
    ],
    'Work & Professions': [
      { italian: "Che lavoro fai?", german: "Was arbeitest du?", explanation: "«Lavoro» = work/job. «Fare» = to do/make", keywords: ["lavoro", "fai"] },
      { italian: "Sono insegnante.", german: "Ich bin Lehrer/Lehrerin.", explanation: "No article needed before professions in Italian.", keywords: ["insegnante"] },
      { italian: "Lavoro in un'azienda italiana.", german: "Ich arbeite in einer italienischen Firma.", explanation: "«Azienda» = company. «Lavorare» = to work", keywords: ["lavoro", "azienda"] },
      { italian: "A che ora finisci di lavorare?", german: "Um wie viel Uhr hörst du auf zu arbeiten?", explanation: "«Finire» = to finish. «Di lavorare» = working", keywords: ["finisci", "lavorare"] },
      { italian: "Ho una riunione alle dieci.", german: "Ich habe um zehn Uhr eine Besprechung.", explanation: "«Riunione» = meeting. «Alle dieci» = at ten", keywords: ["riunione", "dieci"] }
    ],
    'Hobbies & Free Time': [
      { italian: "Nel tempo libero leggo molto.", german: "In meiner Freizeit lese ich viel.", explanation: "«Tempo libero» = free time. «Leggere» = to read", keywords: ["tempo", "libero", "leggo"] },
      { italian: "Mi piace giocare a calcio.", german: "Ich spiele gern Fußball.", explanation: "«Mi piace» = I like. «Giocare a» = to play (sport)", keywords: ["piace", "giocare", "calcio"] },
      { italian: "Vado spesso al cinema.", german: "Ich gehe oft ins Kino.", explanation: "«Spesso» = often. «Cinema» = cinema/movies", keywords: ["spesso", "cinema"] },
      { italian: "Suono la chitarra.", german: "Ich spiele Gitarre.", explanation: "«Suonare» = to play (instrument). «Chitarra» = guitar", keywords: ["suono", "chitarra"] },
      { italian: "Cucino ogni sera.", german: "Ich koche jeden Abend.", explanation: "«Cucinare» = to cook. «Ogni» = every", keywords: ["cucino", "sera"] }
    ],
    'Health & Body': [
      { italian: "Non mi sento bene.", german: "Ich fühle mich nicht gut.", explanation: "«Sentirsi» = to feel (reflexive). «Bene» = well", keywords: ["sento", "bene"] },
      { italian: "Mi fa male la testa.", german: "Ich habe Kopfschmerzen.", explanation: "«Mi fa male» = it hurts me. «Testa» = head", keywords: ["male", "testa"] },
      { italian: "Ho bisogno di un medico.", german: "Ich brauche einen Arzt.", explanation: "«Ho bisogno di» = I need. «Medico» = doctor", keywords: ["bisogno", "medico"] },
      { italian: "Dove si trova la farmacia?", german: "Wo befindet sich die Apotheke?", explanation: "«Trovarsi» = to be located. «Farmacia» = pharmacy", keywords: ["trova", "farmacia"] },
      { italian: "Devo prendere questa medicina.", german: "Ich muss diese Medizin nehmen.", explanation: "«Dovere» = must. «Medicina» = medicine", keywords: ["devo", "medicina"] }
    ],
    'Home & Living': [
      { italian: "Abito in un appartamento.", german: "Ich wohne in einer Wohnung.", explanation: "«Abitare» = to live. «Appartamento» = apartment", keywords: ["abito", "appartamento"] },
      { italian: "La cucina è molto grande.", german: "Die Küche ist sehr groß.", explanation: "«Cucina» = kitchen. «Grande» = big/large", keywords: ["cucina", "grande"] },
      { italian: "Ho un balcone con vista sul parco.", german: "Ich habe einen Balkon mit Blick auf den Park.", explanation: "«Vista» = view. «Sul» = on the", keywords: ["balcone", "vista", "parco"] },
      { italian: "Devo pulire la casa.", german: "Ich muss das Haus putzen.", explanation: "«Pulire» = to clean. «Casa» = house/home", keywords: ["pulire", "casa"] },
      { italian: "Il bagno è al primo piano.", german: "Das Badezimmer ist im ersten Stock.", explanation: "«Bagno» = bathroom. «Piano» = floor/story", keywords: ["bagno", "piano"] }
    ],
    'Numbers & Time': [
      { italian: "Sono le tre e mezza.", german: "Es ist halb vier.", explanation: "Italian time: 3:30 = «le tre e mezza» (three and a half)", keywords: ["tre", "mezza"] },
      { italian: "Il negozio apre alle nove.", german: "Das Geschäft öffnet um neun Uhr.", explanation: "«Aprire» = to open. «Alle nove» = at nine", keywords: ["negozio", "apre", "nove"] },
      { italian: "Costa ventitré euro.", german: "Es kostet dreiundzwanzig Euro.", explanation: "«Ventitré» = 23. Numbers 21-29: venti + number", keywords: ["costa", "ventitré", "euro"] },
      { italian: "È il primo maggio.", german: "Es ist der erste Mai.", explanation: "Dates use ordinal only for «primo» (1st), then cardinal", keywords: ["primo", "maggio"] },
      { italian: "Ci vediamo fra un'ora.", german: "Wir sehen uns in einer Stunde.", explanation: "«Fra» = in (time). «Ora» = hour", keywords: ["vediamo", "fra", "ora"] }
    ],
    'Emotions & Feelings': [
      { italian: "Sono molto felice oggi.", german: "Ich bin heute sehr glücklich.", explanation: "«Felice» = happy. «Molto» = very", keywords: ["felice", "oggi"] },
      { italian: "Mi sento stanco/stanca.", german: "Ich fühle mich müde.", explanation: "«Stanco/a» = tired. Adjective agrees with gender.", keywords: ["sento", "stanco"] },
      { italian: "Sono preoccupato per l'esame.", german: "Ich mache mir Sorgen wegen der Prüfung.", explanation: "«Preoccupato» = worried. «Esame» = exam", keywords: ["preoccupato", "esame"] },
      { italian: "Che bella sorpresa!", german: "Was für eine schöne Überraschung!", explanation: "«Che» + adjective = What a...! «Sorpresa» = surprise", keywords: ["bella", "sorpresa"] },
      { italian: "Mi manchi tanto.", german: "Du fehlst mir so sehr.", explanation: "«Mancare» = to miss (reversed structure in Italian)", keywords: ["manchi", "tanto"] }
    ]
  };

  return sentenceTemplates[topic] || sentenceTemplates['Greetings & Introductions'];
}

// Generate a story for a topic
function generateStory(topic: string, dateStr: string): any {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateStr);
  
  return {
    title: topic,
    topic: topic,
    level: 'A1-A2',
    readingTime: '3 min',
    pages: [
      [
        { italian: "Era una bella giornata di sole.", german: "Es war ein schöner sonniger Tag.", note: "«Era» = it was. «Giornata» = day (duration)" },
        { italian: "Marco si svegliò presto quella mattina.", german: "Marco wachte an diesem Morgen früh auf.", note: "«Svegliarsi» = to wake up. Passato remoto tense." },
        { italian: "Aveva molte cose da fare.", german: "Er hatte viele Dinge zu erledigen.", note: "«Avere da fare» = to have things to do" }
      ],
      [
        { italian: "Prima fece colazione con la sua famiglia.", german: "Zuerst frühstückte er mit seiner Familie.", note: "«Fare colazione» = to have breakfast" },
        { italian: "Poi uscì di casa e prese l'autobus.", german: "Dann verließ er das Haus und nahm den Bus.", note: "«Uscire» = to go out. «Prendere» = to take" },
        { italian: "Il viaggio durò circa mezz'ora.", german: "Die Fahrt dauerte etwa eine halbe Stunde.", note: "«Durare» = to last. «Mezz'ora» = half hour" }
      ]
    ]
  };
}

// Generate news articles
function generateNews(dateStr: string): any[] {
  return [
    {
      category: "Cultura",
      headline: "New Italian Film Wins International Award",
      italianSummary: "Un nuovo film italiano ha vinto un premio importante al festival internazionale del cinema. Il regista ha dedicato il premio alla sua famiglia e al team di produzione.",
      german: "Ein neuer italienischer Film hat einen wichtigen Preis beim internationalen Filmfestival gewonnen. Der Regisseur widmete den Preis seiner Familie und dem Produktionsteam.",
      source: "https://www.ansa.it",
      sourceName: "ANSA"
    },
    {
      category: "Sport",
      headline: "Serie A Weekend Results",
      italianSummary: "La partita di domenica ha visto una vittoria emozionante per la squadra di casa. I tifosi hanno festeggiato fino a tarda notte nelle strade della città.",
      german: "Das Sonntagsspiel sah einen aufregenden Sieg für die Heimmannschaft. Die Fans feierten bis spät in die Nacht auf den Straßen der Stadt.",
      source: "https://www.gazzetta.it",
      sourceName: "Gazzetta dello Sport"
    },
    {
      category: "Gastronomia",
      headline: "Traditional Recipe Gains UNESCO Recognition",
      italianSummary: "Una ricetta tradizionale italiana è stata aggiunta alla lista del patrimonio culturale immateriale dell'UNESCO. Gli chef di tutto il mondo celebrano questo riconoscimento.",
      german: "Ein traditionelles italienisches Rezept wurde in die Liste des immateriellen Kulturerbes der UNESCO aufgenommen. Köche aus aller Welt feiern diese Anerkennung.",
      source: "https://www.repubblica.it",
      sourceName: "La Repubblica"
    }
  ];
}

// Get date string in YYYY-MM-DD format
function getDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Main function to generate daily content
async function generateDailyContent(myTimer: Timer, context: InvocationContext): Promise<void> {
  context.log('Daily content generation started at:', new Date().toISOString());

  // Generate for today (tomorrow in PST context since this runs at 11pm)
  const today = new Date();
  // Add 1 day since we're generating for the next day
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = getDateStr(tomorrow);

  const topic = getTopicForDate(dateStr);
  const storyTopic = getStoryTopicForDate(dateStr);

  const content = {
    date: dateStr,
    topic: topic,
    sentences: generateSentences(topic, dateStr),
    story: generateStory(storyTopic, dateStr),
    news: generateNews(dateStr),
    generatedAt: new Date().toISOString()
  };

  try {
    await BlobStorage.saveContent(dateStr, content);
    context.log(`Successfully generated and saved content for ${dateStr}`);
    context.log(`Topic: ${topic}, Story: ${storyTopic}`);
  } catch (error) {
    context.error('Failed to save daily content:', error);
    throw error;
  }
}

// HTTP trigger for manual generation (useful for testing and backfill)
app.http('generate-content', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'generate/{date?}',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const dateParam = request.params.date;
    const dates: string[] = [];

    if (dateParam) {
      // Generate for specific date
      dates.push(dateParam);
    } else {
      // Generate for last 3 days by default
      const today = new Date();
      for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(getDateStr(date));
      }
    }

    const results: any[] = [];
    
    for (const dateStr of dates) {
      const topic = getTopicForDate(dateStr);
      const storyTopic = getStoryTopicForDate(dateStr);

      const content = {
        date: dateStr,
        topic: topic,
        sentences: generateSentences(topic, dateStr),
        story: generateStory(storyTopic, dateStr),
        news: generateNews(dateStr),
        generatedAt: new Date().toISOString()
      };

      try {
        await BlobStorage.saveContent(dateStr, content);
        results.push({ date: dateStr, status: 'success', topic });
        context.log(`Generated content for ${dateStr}`);
      } catch (error) {
        results.push({ date: dateStr, status: 'error', error: String(error) });
        context.error(`Failed to generate content for ${dateStr}:`, error);
      }
    }

    return {
      jsonBody: {
        message: `Generated content for ${results.length} days`,
        results
      }
    };
  }
});

// Timer trigger: Runs daily at 11:00 PM PST (7:00 AM UTC next day)
// CRON: sec min hour day month weekday
// 11 PM PST = 7 AM UTC (PST is UTC-8)
app.timer('daily-content-generator', {
  // Run at 7:00 AM UTC (11:00 PM PST previous day)
  schedule: '0 0 7 * * *',
  handler: generateDailyContent
});

export default generateDailyContent;
