/* ============================================
   Italiano Ogni Giorno — Daily Content Data
   ============================================
   Content is organized by date (YYYY-MM-DD).
   Each day has: sentences, story, news.
   Last 3 days only - older content auto-expires.
   ============================================ */

const DAILY_CONTENT = {

  "2026-02-09": {
    date: "2026-02-09",
    weekday: "Monday",
    greeting: "Buon lunedì! 🌅",
    sentences: [
      {
        italian: "Buongiorno! Come sta oggi?",
        german: "Guten Morgen! Wie geht es Ihnen heute?",
        explanation: "Formal greeting. «Buongiorno» = Good morning. «Come sta?» = How are you? (formal)",
        keywords: ["buongiorno", "come", "sta"]
      },
      {
        italian: "Mi chiamo Anna. E Lei, come si chiama?",
        german: "Ich heiße Anna. Und Sie, wie heißen Sie?",
        explanation: "«Mi chiamo» = I am called. «E Lei?» = And you? (formal). «Chiamarsi» is reflexive.",
        keywords: ["chiamo", "lei"]
      },
      {
        italian: "Piacere di conoscerLa!",
        german: "Freut mich, Sie kennenzulernen!",
        explanation: "Formal way to say 'Nice to meet you'. «Piacere» = pleasure. «La» = you (formal, object).",
        keywords: ["piacere", "conoscere"]
      },
      {
        italian: "Di dove sei? Sono di Berlino.",
        german: "Woher kommst du? Ich bin aus Berlin.",
        explanation: "«Di dove» = from where. «Sei» = you are (informal). «Sono di» = I am from.",
        keywords: ["dove", "sei", "sono"]
      },
      {
        italian: "Parla italiano molto bene!",
        german: "Sie sprechen sehr gut Italienisch!",
        explanation: "A compliment! «Parlare» = to speak. «Molto bene» = very well.",
        keywords: ["parla", "italiano", "bene"]
      }
    ],
    story: {
      title: "Il Primo Caffè",
      topic: "Daily Life",
      level: "A1",
      readingTime: "3 min",
      pages: [
        [
          {
            italian: "Marco si sveglia alle sette di mattina.",
            german: "Marco wacht um sieben Uhr morgens auf.",
            note: "«Svegliarsi» = to wake up (reflexive). «Di mattina» = in the morning."
          },
          {
            italian: "La prima cosa che fa è preparare un caffè.",
            german: "Das Erste, was er macht, ist einen Kaffee zuzubereiten.",
            note: "«La prima cosa» = the first thing. «Preparare» = to prepare."
          },
          {
            italian: "Il profumo del caffè riempie la cucina.",
            german: "Der Duft des Kaffees erfüllt die Küche.",
            note: "«Profumo» = scent/fragrance. «Riempire» = to fill."
          }
        ],
        [
          {
            italian: "Marco beve il caffè guardando dalla finestra.",
            german: "Marco trinkt den Kaffee und schaut aus dem Fenster.",
            note: "«Bere» = to drink. «Guardare» = to look. Gerund shows simultaneous actions."
          },
          {
            italian: "Fuori il sole brilla sul mare azzurro.",
            german: "Draußen scheint die Sonne auf das blaue Meer.",
            note: "«Fuori» = outside. «Brillare» = to shine. «Azzurro» = blue."
          },
          {
            italian: "È una bellissima giornata per cominciare la settimana.",
            german: "Es ist ein wunderschöner Tag, um die Woche zu beginnen.",
            note: "«Bellissimo» = very beautiful (superlative). «Cominciare» = to begin."
          }
        ]
      ]
    },
    news: [
      {
        category: "Culture",
        headline: "Venice Carnival 2026 Celebrates Record Attendance",
        italianSummary: "Il Carnevale di Venezia ha registrato un numero record di visitatori quest'anno. Le maschere tradizionali e i costumi hanno attirato turisti da tutto il mondo. La città ha organizzato eventi speciali in Piazza San Marco. Il tema di quest'anno era 'Il Sogno Veneziano'. I gondolieri hanno offerto tour speciali lungo i canali decorati.",
        german: "Der Karneval von Venedig verzeichnete dieses Jahr eine Rekordbesucherzahl. Traditionelle Masken und Kostüme zogen Touristen aus der ganzen Welt an. Die Stadt organisierte besondere Veranstaltungen auf dem Markusplatz. Das Thema dieses Jahres war 'Der Venezianische Traum'. Gondoliere boten spezielle Touren entlang der dekorierten Kanäle an.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "Food",
        headline: "Italian Olive Oil Exports Reach New Heights",
        italianSummary: "Le esportazioni di olio d'oliva italiano hanno raggiunto un nuovo record. La qualità dell'olio extravergine italiano è sempre più apprezzata nel mondo. La Puglia e la Toscana sono i principali produttori. I consumatori cercano prodotti autentici e di alta qualità. Il settore prevede una crescita del quindici percento.",
        german: "Die italienischen Olivenölexporte haben einen neuen Rekord erreicht. Die Qualität des italienischen Extra-Vergine-Öls wird weltweit immer mehr geschätzt. Apulien und die Toskana sind die Hauptproduzenten. Verbraucher suchen authentische Produkte von hoher Qualität. Die Branche erwartet ein Wachstum von fünfzehn Prozent.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      }
    ]
  },

  "2026-02-08": {
    date: "2026-02-08",
    weekday: "Sunday",
    greeting: "Buona domenica! ☀️",
    sentences: [
      {
        italian: "Vorrei un caffè, per favore.",
        german: "Ich möchte einen Kaffee, bitte.",
        explanation: "«Vorrei» = I would like (conditional of volere). Very polite form for ordering.",
        keywords: ["vorrei", "caffè", "favore"]
      },
      {
        italian: "Quanto costa questo?",
        german: "Was kostet das?",
        explanation: "Essential shopping phrase. «Quanto» = how much. «Costare» = to cost.",
        keywords: ["quanto", "costa"]
      },
      {
        italian: "Il conto, per favore.",
        german: "Die Rechnung, bitte.",
        explanation: "«Il conto» = the bill. Used in restaurants when you want to pay.",
        keywords: ["conto", "favore"]
      },
      {
        italian: "Posso pagare con la carta?",
        german: "Kann ich mit Karte zahlen?",
        explanation: "«Posso» = I can. «Pagare» = to pay. «Carta» = card.",
        keywords: ["posso", "pagare", "carta"]
      },
      {
        italian: "È buonissimo! Complimenti allo chef!",
        german: "Es ist köstlich! Kompliment an den Koch!",
        explanation: "«Buonissimo» = superlative of «buono» (good). «-issimo» = very/extremely.",
        keywords: ["buonissimo", "complimenti"]
      }
    ],
    story: {
      title: "Al Ristorante",
      topic: "Food & Dining",
      level: "A1-A2",
      readingTime: "4 min",
      pages: [
        [
          {
            italian: "Sofia e Marco entrano in un piccolo ristorante a Firenze.",
            german: "Sofia und Marco betreten ein kleines Restaurant in Florenz.",
            note: "«Entrare in» = to enter. «Piccolo» = small."
          },
          {
            italian: "«Buonasera! Avete un tavolo per due?» chiede Sofia.",
            german: "«Guten Abend! Haben Sie einen Tisch für zwei?» fragt Sofia.",
            note: "«Buonasera» = Good evening. «Tavolo per due» = table for two."
          },
          {
            italian: "Il cameriere li accompagna a un tavolo vicino alla finestra.",
            german: "Der Kellner begleitet sie zu einem Tisch am Fenster.",
            note: "«Cameriere» = waiter. «Accompagnare» = to accompany."
          }
        ],
        [
          {
            italian: "«Cosa mi consiglia?» chiede Marco guardando il menù.",
            german: "«Was empfehlen Sie mir?» fragt Marco und schaut auf die Speisekarte.",
            note: "«Consigliare» = to recommend. «Menù» = menu."
          },
          {
            italian: "«I nostri pici al ragù sono famosi in tutta la città.»",
            german: "«Unsere Pici mit Ragù sind in der ganzen Stadt berühmt.»",
            note: "«Pici» = thick Tuscan pasta. «Ragù» = meat sauce."
          },
          {
            italian: "«Perfetto! Due porzioni di pici, per favore.»",
            german: "«Perfekt! Zwei Portionen Pici, bitte.»",
            note: "«Porzione» = portion. Numbers before nouns: «due porzioni»."
          }
        ],
        [
          {
            italian: "La pasta arriva fumante e profumata.",
            german: "Die Pasta kommt dampfend und duftend.",
            note: "«Fumante» = steaming. «Profumato» = fragrant."
          },
          {
            italian: "«Mmm, è squisita!» dice Sofia dopo il primo boccone.",
            german: "«Mmm, es ist köstlich!» sagt Sofia nach dem ersten Bissen.",
            note: "«Squisito» = exquisite/delicious. «Boccone» = bite."
          },
          {
            italian: "Alla fine, ordinano anche un tiramisù da dividere.",
            german: "Am Ende bestellen sie auch ein Tiramisù zum Teilen.",
            note: "«Alla fine» = in the end. «Dividere» = to share/divide."
          }
        ]
      ]
    },
    news: [
      {
        category: "Travel",
        headline: "Italy Introduces New Tourist Rail Pass",
        italianSummary: "L'Italia ha introdotto un nuovo biglietto ferroviario per i turisti. Con il 'Discover Italy Pass' si può viaggiare su tutti i treni regionali per una settimana. Il pass costa novantanove euro e include sconti per musei. I viaggiatori possono acquistarlo online o nelle stazioni principali. L'iniziativa promuove il turismo sostenibile.",
        german: "Italien hat ein neues Zugticket für Touristen eingeführt. Mit dem 'Discover Italy Pass' kann man eine Woche lang alle Regionalzüge nutzen. Der Pass kostet neunundneunzig Euro und beinhaltet Museumsrabatte. Reisende können ihn online oder an Hauptbahnhöfen kaufen. Die Initiative fördert nachhaltigen Tourismus.",
        source: "https://www.trenitalia.com",
        sourceName: "Trenitalia"
      },
      {
        category: "Art",
        headline: "Uffizi Gallery Extends Evening Hours",
        italianSummary: "La Galleria degli Uffizi di Firenze estende gli orari di apertura serali. I visitatori potranno ammirare i capolavori fino alle ventidue ogni venerdì. L'iniziativa mira a ridurre l'affollamento durante le ore diurne. Saranno organizzati anche concerti e eventi culturali. I biglietti serali costano venti euro.",
        german: "Die Uffizien in Florenz verlängern die Abendöffnungszeiten. Besucher können die Meisterwerke jeden Freitag bis zweiundzwanzig Uhr bewundern. Die Initiative zielt darauf ab, die Überfüllung tagsüber zu reduzieren. Es werden auch Konzerte und kulturelle Veranstaltungen organisiert. Abendkarten kosten zwanzig Euro.",
        source: "https://www.uffizi.it",
        sourceName: "Galleria degli Uffizi"
      }
    ]
  },

  "2026-02-07": {
    date: "2026-02-07",
    weekday: "Saturday",
    greeting: "Buon sabato! 🌤️",
    sentences: [
      {
        italian: "Dov'è la stazione centrale?",
        german: "Wo ist der Hauptbahnhof?",
        explanation: "«Dov'è» = where is (dove + è). «Stazione centrale» = central/main station.",
        keywords: ["dove", "stazione"]
      },
      {
        italian: "A che ora parte il prossimo treno per Roma?",
        german: "Um wie viel Uhr fährt der nächste Zug nach Rom?",
        explanation: "«A che ora» = at what time. «Partire» = to depart. «Prossimo» = next.",
        keywords: ["ora", "parte", "treno"]
      },
      {
        italian: "Quanto costa un biglietto di andata e ritorno?",
        german: "Wie viel kostet eine Hin- und Rückfahrkarte?",
        explanation: "«Andata e ritorno» = round trip. «Biglietto» = ticket.",
        keywords: ["costa", "biglietto", "andata"]
      },
      {
        italian: "Mi scusi, è occupato questo posto?",
        german: "Entschuldigung, ist dieser Platz besetzt?",
        explanation: "«Mi scusi» = excuse me (formal). «Occupato» = occupied. «Posto» = seat/place.",
        keywords: ["scusi", "occupato", "posto"]
      },
      {
        italian: "Il treno è in ritardo di venti minuti.",
        german: "Der Zug hat zwanzig Minuten Verspätung.",
        explanation: "«In ritardo» = delayed/late. «Di venti minuti» = by twenty minutes.",
        keywords: ["ritardo", "minuti"]
      }
    ],
    story: {
      title: "Un Viaggio in Treno",
      topic: "Travel",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Laura arriva alla stazione di Milano Centrale con la sua valigia.",
            german: "Laura kommt am Mailänder Hauptbahnhof mit ihrem Koffer an.",
            note: "«Arrivare» = to arrive. «Valigia» = suitcase."
          },
          {
            italian: "Oggi va a visitare la sua amica Giulia a Napoli.",
            german: "Heute besucht sie ihre Freundin Giulia in Neapel.",
            note: "«Andare a visitare» = to go visit. «Amica» = friend (female)."
          },
          {
            italian: "Controlla il tabellone delle partenze: binario sette.",
            german: "Sie überprüft die Abfahrtstafel: Gleis sieben.",
            note: "«Tabellone» = display board. «Binario» = platform/track."
          },
          {
            italian: "Ha ancora dieci minuti. Compra un cornetto e un caffè.",
            german: "Sie hat noch zehn Minuten. Sie kauft ein Croissant und einen Kaffee.",
            note: "«Ancora» = still/yet. «Cornetto» = croissant (Italian style)."
          }
        ],
        [
          {
            italian: "Laura sale sul treno e cerca il suo posto.",
            german: "Laura steigt in den Zug und sucht ihren Platz.",
            note: "«Salire» = to get on/climb. «Cercare» = to look for."
          },
          {
            italian: "«Mi scusi, è questo il posto 45?» chiede a un signore.",
            german: "«Entschuldigung, ist das Platz 45?» fragt sie einen Herrn.",
            note: "«Signore» = gentleman/sir. Polite way to address strangers."
          },
          {
            italian: "«Sì, esatto. Si accomodi.» L'uomo le sorride gentilmente.",
            german: "«Ja, genau. Bitte nehmen Sie Platz.» Der Mann lächelt sie freundlich an.",
            note: "«Accomodarsi» = to take a seat (formal). «Gentilmente» = kindly."
          }
        ],
        [
          {
            italian: "Il treno parte puntuale. Laura guarda il paesaggio dal finestrino.",
            german: "Der Zug fährt pünktlich ab. Laura schaut aus dem Fenster auf die Landschaft.",
            note: "«Puntuale» = punctual/on time. «Paesaggio» = landscape. «Finestrino» = window (in vehicle)."
          },
          {
            italian: "Vede colline verdi, piccoli paesi e campi dorati.",
            german: "Sie sieht grüne Hügel, kleine Dörfer und goldene Felder.",
            note: "«Colline» = hills. «Paesi» = villages/towns. «Dorato» = golden."
          },
          {
            italian: "Quattro ore dopo, il treno arriva a Napoli Centrale.",
            german: "Vier Stunden später kommt der Zug in Neapel Centrale an.",
            note: "«Dopo» = after/later. Time expressions: «quattro ore dopo» = four hours later."
          },
          {
            italian: "Giulia l'aspetta sul binario con un grande abbraccio.",
            german: "Giulia erwartet sie auf dem Bahnsteig mit einer großen Umarmung.",
            note: "«Aspettare» = to wait for. «Abbraccio» = hug/embrace."
          }
        ]
      ]
    },
    news: [
      {
        category: "Sports",
        headline: "Serie A Weekend Preview: Milan Derby",
        italianSummary: "Questo weekend la Serie A offre il derby di Milano tra Inter e Milan. Entrambe le squadre sono in ottima forma e lottano per il titolo. Gli esperti prevedono una partita molto combattuta. Lo stadio San Siro sarà tutto esaurito. I tifosi di tutta Italia si preparano per l'evento.",
        german: "Dieses Wochenende bietet die Serie A das Mailänder Derby zwischen Inter und Milan. Beide Mannschaften sind in Topform und kämpfen um den Titel. Experten erwarten ein hart umkämpftes Spiel. Das San Siro Stadion wird ausverkauft sein. Fans aus ganz Italien bereiten sich auf das Event vor.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Science",
        headline: "Italian Scientists Make Breakthrough in Renewable Energy",
        italianSummary: "Ricercatori italiani hanno sviluppato una nuova tecnologia per l'energia solare. Il sistema è trenta percento più efficiente dei pannelli tradizionali. L'Università di Bologna ha guidato il progetto. La tecnologia potrebbe essere disponibile sul mercato entro due anni. L'Italia punta a diventare leader europeo nelle energie rinnovabili.",
        german: "Italienische Forscher haben eine neue Technologie für Solarenergie entwickelt. Das System ist dreißig Prozent effizienter als herkömmliche Panels. Die Universität Bologna leitete das Projekt. Die Technologie könnte innerhalb von zwei Jahren auf dem Markt sein. Italien strebt an, europäischer Marktführer bei erneuerbaren Energien zu werden.",
        source: "https://www.corriere.it",
        sourceName: "Corriere della Sera"
      }
    ]
  }
};

// Helper to get content for a specific date
function getContentForDate(dateStr) {
  return DAILY_CONTENT[dateStr] || null;
}

// Get today's date string
function getTodayDateStr() {
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

// Get available dates (sorted, newest first)
function getAvailableDates() {
  return Object.keys(DAILY_CONTENT).sort().reverse();
}

// Get available dates including Azure storage (async)
async function getAvailableDatesAsync() {
  const localDates = Object.keys(DAILY_CONTENT);
  
  // Try to get dates from Azure
  if (typeof ContentAPI !== 'undefined') {
    const cloudDates = await ContentAPI.fetchAvailableDates();
    // Merge and deduplicate
    const allDates = [...new Set([...localDates, ...cloudDates])];
    return allDates.sort().reverse();
  }
  
  return localDates.sort().reverse();
}

// Format date for display
function formatDateDisplay(dateStr) {
  const lang = Store.getLanguage();
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsDe = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const weekdaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdaysDe = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  
  const months = lang === 'de' ? monthsDe : monthsEn;
  const weekdays = lang === 'de' ? weekdaysDe : weekdaysEn;
  
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  
  const fullFormat = lang === 'de' 
    ? `${weekdays[date.getDay()]}, ${d}. ${months[m - 1]} ${y}`
    : `${weekdays[date.getDay()]}, ${months[m - 1]} ${d}, ${y}`;
  
  return {
    full: fullFormat,
    short: lang === 'de' ? `${d}. ${months[m - 1]}` : `${months[m - 1]} ${d}`,
    day: d,
    monthShort: months[m - 1].substring(0, 3),
    weekday: weekdays[date.getDay()]
  };
}
