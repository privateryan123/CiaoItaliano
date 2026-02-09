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
        category: "Sports",
        headline: "Inter Milan Secures Champions League Spot with Dramatic Win",
        italianSummary: "L'Inter ha battuto la Juventus tre a due in una partita emozionante. Il gol decisivo è arrivato al novantesimo minuto. Lautaro Martínez ha segnato una doppietta straordinaria. I tifosi nerazzurri hanno festeggiato tutta la notte. L'Inter si qualifica per la Champions League.",
        german: "Inter besiegte Juventus drei zu zwei in einem spannenden Spiel. Das entscheidende Tor fiel in der neunzigsten Minute. Lautaro Martínez erzielte einen außergewöhnlichen Doppelpack. Die Inter-Fans feierten die ganze Nacht. Inter qualifiziert sich für die Champions League.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Sports",
        headline: "Italian Skier Wins Gold at World Championships",
        italianSummary: "Sofia Goggia ha vinto l'oro nella discesa libera ai Mondiali di sci. L'atleta italiana ha dominato la gara con un tempo eccezionale. È la terza medaglia d'oro mondiale della sua carriera. Goggia ha dedicato la vittoria alla sua famiglia. L'Italia festeggia un altro trionfo nello sci alpino.",
        german: "Sofia Goggia gewann Gold in der Abfahrt bei der Ski-WM. Die italienische Athletin dominierte das Rennen mit einer außergewöhnlichen Zeit. Es ist die dritte WM-Goldmedaille ihrer Karriere. Goggia widmete den Sieg ihrer Familie. Italien feiert einen weiteren Triumph im alpinen Skisport.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Politics",
        headline: "Italian Parliament Approves New Education Reform",
        italianSummary: "Il Parlamento italiano ha approvato una riforma scolastica storica. La nuova legge aumenta i fondi per le scuole pubbliche. Gli insegnanti riceveranno stipendi più alti dal prossimo anno. Il ministro dell'istruzione ha definito la riforma 'un passo fondamentale'. L'opposizione ha votato contro alcune misure.",
        german: "Das italienische Parlament hat eine historische Schulreform verabschiedet. Das neue Gesetz erhöht die Mittel für öffentliche Schulen. Lehrer werden ab nächstem Jahr höhere Gehälter erhalten. Der Bildungsminister nannte die Reform 'einen grundlegenden Schritt'. Die Opposition stimmte gegen einige Maßnahmen.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "World",
        headline: "EU Summit in Rome Addresses Climate Change",
        italianSummary: "I leader europei si sono riuniti a Roma per discutere il cambiamento climatico. L'Italia ha proposto nuove misure per ridurre le emissioni. Il presidente del Consiglio ha chiesto maggiori investimenti nelle energie rinnovabili. Tutti i paesi membri hanno firmato un accordo comune. Il summit è stato considerato un grande successo diplomatico.",
        german: "Europäische Staats- und Regierungschefs trafen sich in Rom, um den Klimawandel zu besprechen. Italien schlug neue Maßnahmen zur Emissionsreduzierung vor. Der Ministerpräsident forderte mehr Investitionen in erneuerbare Energien. Alle Mitgliedsländer unterzeichneten ein gemeinsames Abkommen. Der Gipfel wurde als großer diplomatischer Erfolg gewertet.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      },
      {
        category: "Economy",
        headline: "Italian Exports Hit Record High in January",
        italianSummary: "Le esportazioni italiane hanno raggiunto un nuovo record a gennaio. Il settore manifatturiero ha registrato una crescita del dodici percento. I prodotti Made in Italy sono sempre più richiesti all'estero. La moda e l'alimentare guidano la crescita. Gli economisti prevedono un anno positivo per l'economia italiana.",
        german: "Die italienischen Exporte erreichten im Januar einen neuen Rekord. Der Fertigungssektor verzeichnete ein Wachstum von zwölf Prozent. Made in Italy-Produkte sind im Ausland immer gefragter. Mode und Lebensmittel treiben das Wachstum an. Ökonomen prognostizieren ein positives Jahr für die italienische Wirtschaft.",
        source: "https://www.ilsole24ore.com",
        sourceName: "Il Sole 24 Ore"
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
        category: "Sports",
        headline: "Napoli Extends Lead at Top of Serie A",
        italianSummary: "Il Napoli ha vinto due a zero contro la Roma e consolida il primo posto in classifica. Osimhen ha segnato entrambi i gol nella ripresa. La squadra di Spalletti sembra inarrestabile quest'anno. I tifosi napoletani sognano lo scudetto. Il prossimo match sarà contro l'Atalanta.",
        german: "Napoli gewann zwei zu null gegen Roma und festigt den ersten Platz in der Tabelle. Osimhen erzielte beide Tore in der zweiten Halbzeit. Spallettis Team scheint dieses Jahr unaufhaltsam. Die neapolitanischen Fans träumen vom Meistertitel. Das nächste Spiel ist gegen Atalanta.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Sports",
        headline: "Ferrari Reveals New Formula 1 Car for 2026 Season",
        italianSummary: "La Ferrari ha presentato la nuova monoposto per la stagione di Formula 1. Il design innovativo promette maggiore velocità e efficienza. Charles Leclerc e Carlos Sainz sono entusiasti del nuovo veicolo. Il team spera di competere per il titolo mondiale. I test pre-stagionali inizieranno la prossima settimana.",
        german: "Ferrari präsentierte den neuen Rennwagen für die Formel-1-Saison. Das innovative Design verspricht mehr Geschwindigkeit und Effizienz. Charles Leclerc und Carlos Sainz sind begeistert vom neuen Fahrzeug. Das Team hofft, um den Weltmeistertitel zu kämpfen. Die Vorsaisontests beginnen nächste Woche.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Politics",
        headline: "President Mattarella Meets with German Chancellor",
        italianSummary: "Il Presidente Mattarella ha incontrato il Cancelliere tedesco al Quirinale. I due leader hanno discusso di cooperazione economica europea. L'Italia e la Germania rafforzano i legami bilaterali. Sono stati firmati accordi per l'energia e la tecnologia. La visita è stata definita 'estremamente produttiva'.",
        german: "Präsident Mattarella traf den deutschen Bundeskanzler im Quirinal. Die beiden Staatschefs besprachen die europäische Wirtschaftskooperation. Italien und Deutschland stärken die bilateralen Beziehungen. Es wurden Abkommen für Energie und Technologie unterzeichnet. Der Besuch wurde als 'äußerst produktiv' bezeichnet.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "World",
        headline: "Italian Peacekeepers Lead UN Mission in Lebanon",
        italianSummary: "L'Italia guida la missione ONU in Libano con tremila soldati. Il contingente italiano è il più grande della missione UNIFIL. I militari italiani lavorano per mantenere la pace nella regione. Il Ministro della Difesa ha visitato le truppe ieri. La comunità internazionale ha elogiato l'impegno italiano.",
        german: "Italien führt die UN-Mission im Libanon mit dreitausend Soldaten. Das italienische Kontingent ist das größte der UNIFIL-Mission. Die italienischen Soldaten arbeiten daran, den Frieden in der Region zu bewahren. Der Verteidigungsminister besuchte gestern die Truppen. Die internationale Gemeinschaft lobte das italienische Engagement.",
        source: "https://www.corriere.it",
        sourceName: "Corriere della Sera"
      },
      {
        category: "Economy",
        headline: "Italian Tourism Revenue Surpasses Pre-Pandemic Levels",
        italianSummary: "Il turismo italiano ha superato i livelli pre-pandemia. Le città d'arte hanno registrato numeri record di visitatori. Roma, Firenze e Venezia guidano la ripresa turistica. Gli alberghi segnalano prenotazioni piene fino all'estate. Il settore prevede un anno eccezionale per l'economia.",
        german: "Der italienische Tourismus übertraf das Vor-Pandemie-Niveau. Kunststädte verzeichneten Rekordbesucherzahlen. Rom, Florenz und Venedig führen die touristische Erholung an. Hotels melden ausgebuchte Reservierungen bis zum Sommer. Die Branche erwartet ein außergewöhnliches Jahr für die Wirtschaft.",
        source: "https://www.ilsole24ore.com",
        sourceName: "Il Sole 24 Ore"
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
        headline: "Juventus Signs New Star Player from Barcelona",
        italianSummary: "La Juventus ha annunciato l'acquisto di un nuovo attaccante dal Barcellona. Il trasferimento è costato sessanta milioni di euro. Il giocatore ha firmato un contratto di cinque anni. I tifosi bianconeri accolgono con entusiasmo il nuovo arrivo. L'allenatore lo considera fondamentale per la prossima stagione.",
        german: "Juventus gab die Verpflichtung eines neuen Stürmers von Barcelona bekannt. Der Transfer kostete sechzig Millionen Euro. Der Spieler unterschrieb einen Fünfjahresvertrag. Die Juventus-Fans begrüßen den Neuzugang mit Begeisterung. Der Trainer hält ihn für grundlegend für die nächste Saison.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Sports",
        headline: "Italian National Team Prepares for Euro 2028 Qualifiers",
        italianSummary: "La Nazionale italiana si prepara per le qualificazioni a Euro 2028. Il CT ha convocato venticinque giocatori per il ritiro. L'Italia affronterà la Spagna nella prima partita. I tifosi sperano in una ripetizione del successo del 2021. Gli allenamenti inizieranno lunedì prossimo.",
        german: "Die italienische Nationalmannschaft bereitet sich auf die Qualifikation zur Euro 2028 vor. Der Nationaltrainer berief fünfundzwanzig Spieler für das Trainingslager. Italien trifft im ersten Spiel auf Spanien. Die Fans hoffen auf eine Wiederholung des Erfolgs von 2021. Das Training beginnt nächsten Montag.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      },
      {
        category: "Politics",
        headline: "New Immigration Law Passes in Italian Senate",
        italianSummary: "Il Senato italiano ha approvato una nuova legge sull'immigrazione. La legge semplifica il processo per i lavoratori qualificati. Le aziende italiane potranno assumere più facilmente dipendenti stranieri. L'opposizione ha criticato alcune disposizioni. La legge entrerà in vigore il primo aprile.",
        german: "Der italienische Senat verabschiedete ein neues Einwanderungsgesetz. Das Gesetz vereinfacht das Verfahren für qualifizierte Arbeitskräfte. Italienische Unternehmen können leichter ausländische Mitarbeiter einstellen. Die Opposition kritisierte einige Bestimmungen. Das Gesetz tritt am ersten April in Kraft.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "World",
        headline: "Pope Francis Announces Historic Visit to China",
        italianSummary: "Papa Francesco ha annunciato una visita storica in Cina. Sarà il primo Papa a visitare il paese dal Vaticano. Il viaggio è previsto per settembre di quest'anno. I leader religiosi di tutto il mondo hanno accolto con favore la notizia. La visita potrebbe migliorare le relazioni diplomatiche.",
        german: "Papst Franziskus kündigte einen historischen Besuch in China an. Er wird der erste Papst sein, der das Land aus dem Vatikan besucht. Die Reise ist für September dieses Jahres geplant. Religiöse Führer weltweit begrüßten die Nachricht. Der Besuch könnte die diplomatischen Beziehungen verbessern.",
        source: "https://www.vaticannews.va",
        sourceName: "Vatican News"
      },
      {
        category: "Economy",
        headline: "Italian Central Bank Raises Growth Forecast",
        italianSummary: "La Banca d'Italia ha alzato le previsioni di crescita economica. Il PIL italiano dovrebbe crescere del due percento quest'anno. L'inflazione sta diminuendo più rapidamente del previsto. Il settore dei servizi guida la ripresa economica. Gli investimenti stranieri in Italia sono in aumento.",
        german: "Die Bank von Italien erhöhte die Wachstumsprognose. Das italienische BIP soll dieses Jahr um zwei Prozent wachsen. Die Inflation sinkt schneller als erwartet. Der Dienstleistungssektor treibt die wirtschaftliche Erholung an. Ausländische Investitionen in Italien nehmen zu.",
        source: "https://www.ilsole24ore.com",
        sourceName: "Il Sole 24 Ore"
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
