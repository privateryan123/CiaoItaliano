/* ============================================
   Italiano Ogni Giorno — Daily Content Data
   ============================================
   Content is organized by date (YYYY-MM-DD).
   Each day has: sentences, story, news.
   ============================================ */

const DAILY_CONTENT = {

  "2026-02-03": {
    date: "2026-02-03",
    weekday: "Dienstag",
    greeting: "Buongiorno! 🌅",
    sentences: [
      {
        italian: "Ciao, come stai?",
        german: "Hallo, wie geht es dir?",
        explanation: "«Ciao» ist informell für «Hallo». «Come stai?» = Wie geht es dir?",
        keywords: ["ciao", "come", "stai"]
      },
      {
        italian: "Mi chiamo Marco.",
        german: "Ich heiße Marco.",
        explanation: "«Chimarsi» = heißen. «Mi chiamo» = Ich heiße. Das klassische Vorstellungssatz.",
        keywords: ["chiamo"]
      },
      {
        italian: "Sono felice di conoscerti.",
        german: "Ich freue mich, dich kennenzulernen.",
        explanation: "«Felice di» = glücklich/erfreut über. «Conoscere» = kennenlernen.",
        keywords: ["felice", "conoscere"]
      },
      {
        italian: "Parli italiano?",
        german: "Sprichst du italienisch?",
        explanation: "«Parlare» = sprechen. «Parli» = du sprichst (formale Form).",
        keywords: ["parli", "italiano"]
      },
      {
        italian: "Un po', grazie per chiedere.",
        german: "Ein bisschen, danke dass du fragst.",
        explanation: "«Un po'» = ein bisschen. «Grazie per chiedere» = danke, dass du fragst.",
        keywords: ["po'", "grazie"]
      }
    ],
    story: {
      title: "Il primo giorno",
      topic: "Schule",
      level: "A1",
      readingTime: "3 min",
      pages: [
        [
          {
            italian: "Anna entra nella scuola per la prima volta.",
            german: "Anna betritt die Schule zum ersten Mal.",
            note: "«Entra» = betritt. «La prima volta» = zum ersten Mal."
          },
          {
            italian: "Ha un nuovo zaino rosso e splendente.",
            german: "Sie hat einen neuen, glänzenden roten Rucksack.",
            note: "«Zaino» = Rucksack. «Rosso» = rot. «Splendente» = strahlend."
          },
          {
            italian: "La maestra la accoglie con un sorriso caldo.",
            german: "Die Lehrerin begrüßt sie mit einem warmen Lächeln.",
            note: "«Maestra» = Lehrerin. «Accogliere» = begrüßen. «Caldo» = warm."
          }
        ],
        [
          {
            italian: "«Benvenuta!» dice la maestra. «Come ti chiami?»",
            german: "«Willkommen!» sagt die Lehrerin. «Wie heißt du?»",
            note: "«Benvenuta» = Willkommen (weiblich). «Ti chiami» = du heißt."
          },
          {
            italian: "«Sono Anna», risponde la bambina shyly.",
            german: "«Ich bin Anna», antwortet das Mädchen schüchtern.",
            note: "«Bambina» = Mädchen. Deutsche Wörter im Italienischen sind manchmal möglich."
          }
        ],
        [
          {
            italian: "Anna conosce nuovi amici nella classe.",
            german: "Anna lernt neue Freunde in der Klasse kennen.",
            note: "«Conoscere» = kennenlernen. «Amici» = Freunde."
          },
          {
            italian: "Il primo giorno è bellissimo!",
            german: "Der erste Tag ist wunderbar!",
            note: "«Bellissimo» = wunderbar (Superlativ von «bello»)."
          }
        ]
      ]
    },
    news: [
      {
        category: "Bildung",
        headline: "Neue italienische Sprachlern-App erfolgreich gestartet",
        italianSummary: "Una nuova applicazione per imparare l'italiano è stata lanciata con successo. L'app insegna ai principianti la lingua italiana con lezioni quotidiane, storie e notizie. Ha già trovato migliaia di utenti in tutto il mondo. La piattaforma offre una modalità offline per imparare senza connessione internet.",
        german: "Eine neue italienische Sprachlern-App wurde erfolgreich gestartet. Die App lehrt Anfängern Italienisch mit täglichen Unterricht, Geschichten und Nachrichten. Sie hat bereits Tausende von Benutzern weltweit gefunden. Die Plattform bietet einen Offline-Modus zum Lernen ohne Internetverbindung.",
        source: "https://www.education.it",
        sourceName: "Education Today"
      },
      {
        category: "Tourismus",
        headline: "Venedig verzeichnet Rekordbesucher im Februar",
        italianSummary: "La città di Venezia ha ricevuto un numero record di visitatori questo febbraio. Il Carnevale di Venezia attrae turisti da tutto il mondo. I hotel sono al completo e i ristoranti offrono piatti veneziani tradizionali. I gondolieri sono più occupati che mai con i turisti.",
        german: "Die Stadt Venedig hat diese Woche eine Rekordanzahl von Besuchern erhalten. Der Karneval in Venedig zieht Touristen aus der ganzen Welt an. Hotels sind ausgebucht und Restaurants bieten traditionelle venezianische Gerichte. Gondoliere sind beschäftigter als je zuvor mit den Touristen.",
        source: "https://www.venezia.it",
        sourceName: "Venezia Turismo"
      }
    ]
  },

  "2026-02-04": {
    date: "2026-02-04",
    weekday: "Mittwoch",
    greeting: "Buongiorno! 🌤️",
    sentences: [
      {
        italian: "La ricetta della pasta carbonara è semplice.",
        german: "Das Rezept für Pasta Carbonara ist einfach.",
        explanation: "«Ricetta» = Rezept. «Semplice» = einfach. Carbonara ist ein klassisches italienisches Gericht.",
        keywords: ["ricetta", "carbonara", "semplice"]
      },
      {
        italian: "Mi piace molto il caffè italiano.",
        german: "Mir gefällt italienischer Kaffee sehr gut.",
        explanation: "«Mi piace» = mir gefällt. «Molto» = sehr. Italienischer Kaffee ist weltberühmt.",
        keywords: ["piace", "caffè"]
      },
      {
        italian: "Posso avere un bicchiere d'acqua?",
        german: "Kann ich ein Glas Wasser haben?",
        explanation: "«Posso avere» = kann ich haben. «Bicchiere» = Glas. Ein politer Höflichkeitssatz.",
        keywords: ["posso", "avere", "bicchiere"]
      },
      {
        italian: "Quando torna da lavoro?",
        german: "Wann kommt er/sie von der Arbeit zurück?",
        explanation: "«Tornare» = zurückkommen. «Da lavoro» = von der Arbeit. «Quando» = wann.",
        keywords: ["quando", "torna", "lavoro"]
      },
      {
        italian: "Stasera guardiamo un film?",
        german: "Gucken wir heute Abend einen Film?",
        explanation: "«Guardiamo» = wir schauen/gucken. «Stasera» = heute Abend. Ein Vorschlag für den Abend.",
        keywords: ["stasera", "guardiamo", "film"]
      }
    ],
    story: {
      title: "Una gita al parco",
      topic: "Freizeit",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Luca e Sofia decidono di fare una gita al parco domenica.",
            german: "Luca und Sofia beschließen, am Sonntag einen Ausflug in den Park zu machen.",
            note: "«Gita» = Ausflug. «Domenica» = Sonntag. Naturerlebnisse sind in Italien sehr beliebt."
          },
          {
            italian: "Il sole brilla e il cielo è azzurro.",
            german: "Die Sonne scheint und der Himmel ist blau.",
            note: "«Brillare» = scheinen/leuchten. «Azzurro» = blau."
          }
        ],
        [
          {
            italian: "Nel parco, vedono molti bambini che giocano.",
            german: "Im Park sehen sie viele spielende Kinder.",
            note: "«Giocano» = spielen. «Molti» = viele."
          },
          {
            italian: "Sofia compra il gelato. Luca preferisce la coppa di frutti di bosco.",
            german: "Sofia kauft Eis. Luca bevorzugt ein Beet mit Waldfrüchten.",
            note: "«Gelato» = Eis. «Frutti di bosco» = Waldfrüchte."
          }
        ],
        [
          {
            italian: "Camminano lungo il lago e parlano per ore.",
            german: "Sie gehen am See spazieren und sprechen stundenlang.",
            note: "«Camminano» = gehen. «Lago» = See. «Per ore» = stundenlang."
          },
          {
            italian: "È stata una giornata bellissima!",
            german: "Es war ein wunderbar schöner Tag!",
            note: "«È stata» = es war. «Bellissima» = wunderbar schön (Superlativ)."
          }
        ]
      ]
    },
    news: [
      {
        category: "Gastronomie",
        headline: "Mailand: Gehobene Restaurants konkurrieren um Michelin-Sterne",
        italianSummary: "A Milano, i migliori ristoranti di tutta Italia competono per le stelle Michelin. La città è sede di moltissimi chef rinomati che creano piatti innovativi. La cucina lombarda è sempre più apprezzata a livello internazionale. I turisti gourmet visitano Milano per le sue eccellenti opzioni culinarie.",
        german: "In Mailand konkurrieren die besten Restaurants Italiens um Michelin-Sterne. Die Stadt ist Heimat vieler berühmter Köche, die innovative Gerichte kreieren. Die lombardische Küche wird international immer geschätzter. Gourmet-Touristen besuchen Mailand für seine hervorragenden kulinarischen Optionen.",
        source: "https://www.milano.it",
        sourceName: "Milano Guida Turistica"
      }
    ]
  },

  "2026-02-08": {
    date: "2026-02-08",
    weekday: "Sonntag",
    greeting: "Buona domenica! ☀️",
    sentences: [
      {
        italian: "Dove si trova la stazione?",
        german: "Wo ist der Bahnhof?",
        explanation: "«Dove si trova» = Wo befindet sich. Eine der wichtigsten Fragen zum Finden von Orten.",
        keywords: ["dove", "stazione"]
      },
      {
        italian: "Mi piacciono i libri di Italo Calvino.",
        german: "Mir gefallen die Bücher von Italo Calvino.",
        explanation: "«Piacere» mit indirektem Objekt: «Mi piacciono» (mir gefallen). «Libri» = Bücher.",
        keywords: ["piacciono", "libri"]
      },
      {
        italian: "Potremmo andare al cinema stasera?",
        german: "Könnten wir heute Abend ins Kino gehen?",
        explanation: "«Potremmo» = Wir könnten (condizionale). «Stasera» = heute Abend. Eine höfliche Vorschlag.",
        keywords: ["potremmo", "cinema", "stasera"]
      },
      {
        italian: "Lei parla italiano molto bene!",
        german: "Sie sprechen italienisch sehr gut!",
        explanation: "«Lei» = formelles «Sie» (Singular). «Molto bene» = sehr gut. Ein Kompliment auf formale Weise.",
        keywords: ["lei", "molto", "bene"]
      },
      {
        italian: "Non capisco quello che dici.",
        german: "Ich verstehe nicht, was du sagst.",
        explanation: "«Capire» = verstehen. «Quello che» = was/das was. Essentiell für Verständigungsschwierigkeiten.",
        keywords: ["capisco", "quello"]
      }
    ],
    story: {
      title: "Una domenica al mercato",
      topic: "Alltag",
      level: "A1",
      readingTime: "4 min",
      pages: [
        [
          {
            italian: "Sofia si sveglia la domenica mattina. Quale bel giorno!",
            german: "Sofia wacht Sonntagmorgen auf. Was für ein schöner Tag!",
            note: "«Svegliarsi» = aufwachen. «Quale bel giorno» = Was für ein schöner Tag."
          },
          {
            italian: "Decide di andare al mercato della sua città.",
            german: "Sie beschließt, zum Markt ihrer Stadt zu gehen.",
            note: "«Decidere» = beschließen. «Mercato» = Markt."
          },
          {
            italian: "Prende una borsa e esce di casa.",
            german: "Sie nimmt eine Tasche und verlässt das Haus.",
            note: "«Borsa» = Tasche/Handtasche. «Uscire» = hinausgehen."
          },
          {
            italian: "Il sole brilla nei cieli azzurri.",
            german: "Die Sonne scheint am blauen Himmel.",
            note: "«Brillare» = scheinen/leuchten. «Cieli azzurri» = blaue Himmel."
          }
        ],
        [
          {
            italian: "Al mercato, Sofia vede tanti venditori.",
            german: "Auf dem Markt sieht Sofia viele Verkäufer.",
            note: "«Venditori» = Verkäufer. «Tanti» = viele."
          },
          {
            italian: "Un ragazzo vende mele rosse bellissime.",
            german: "Ein Junge verkauft wunderschöne rote Äpfel.",
            note: "«Mele» = Äpfel. «Bellissime» = wunderschön (Superlativ)."
          },
          {
            italian: "«Buongiorno! Quante mele vuoi?» chiede il ragazzo.",
            german: "«Guten Morgen! Wie viele Äpfel möchtest du?» fragt der Junge.",
            note: "«Quante» = wie viele (Plural weiblich). «Vuoi» = du möchtest."
          },
          {
            italian: "«Cinque, per favore!» dice Sofia con un sorriso.",
            german: "«Fünf, bitte!» sagt Sofia mit einem Lächeln.",
            note: "«Cinque» = fünf. «Per favore» = bitte."
          }
        ],
        [
          {
            italian: "Sofia compra anche pomodori, pane e formaggio.",
            german: "Sofia kauft auch Tomaten, Brot und Käse.",
            note: "«Pomodori» = Tomaten. «Pane» = Brot. «Formaggio» = Käse."
          },
          {
            italian: "La borsa è piena di cose buone.",
            german: "Die Tasche ist voll mit guten Dingen.",
            note: "«Piena» = voll. «Cose buone» = gute Dinge."
          },
          {
            italian: "Sofia è felice. Ha tutto quello che serve per la cena.",
            german: "Sofia ist glücklich. Sie hat alles, was sie für das Abendessen braucht.",
            note: "«Tutto quello che» = alles was. «Serve» = braucht."
          },
          {
            italian: "Torna a casa, pronta a cucinare!",
            german: "Sie kehrt nach Hause zurück, bereit zum Kochen!",
            note: "«Tornare» = zurückkehren. «Cucinare» = kochen."
          }
        ]
      ]
    },
    news: [
      {
        category: "Kultur",
        headline: "Florenz: Neue Leonardo-da-Vinci-Ausstellung eröffnet",
        italianSummary: "A Firenze apre una grande mostra dedicata a Leonardo da Vinci. L'esposizione presenta oltre 200 disegni e schizzi del genio rinascimentale. I visitatori possono ammirare le sue invenzioni, i suoi studi scientifici e le sue opere d'arte. La mostra sarà aperta fino a settembre 2026. Tanti turisti da tutto il mondo visiteranno questa importante esposizione. È un'occasione unica per comprendere il genio di Leonardo.",
        german: "In Florenz eröffnet eine große Ausstellung zu Leonardo da Vinci. Die Ausstellung präsentiert über 200 Zeichnungen und Skizzen des Renaissance-Genies. Besucher können seine Erfindungen, wissenschaftlichen Studien und Kunstwerke bewundern. Die Ausstellung ist bis September 2026 geöffnet. Viele Touristen aus der ganzen Welt werden diese wichtige Ausstellung besuchen. Es ist eine einmalige Gelegenheit, Leonardos Genie zu verstehen.",
        source: "https://www.uffizi.it",
        sourceName: "Galleria degli Uffizi"
      },
      {
        category: "Natur",
        headline: "Italienische Alpen: Skigebiet erlebt besten Winter seit 10 Jahren",
        italianSummary: "Le Dolomiti, montagne bellissime nel nord-est dell'Italia, stanno vivendo una stagione invernale spettacolare. Nevicate abbondanti hanno ricoperto le piste e le valli. Gli sciatori da tutta Europa stanno arrivando per godersi le pendici bianche. Le rieste sono in perfette condizioni. I villaggi montani sono pieni di turisti e di allegria. Questo inverno promette di essere memorabile per gli appassionati di sci.",
        german: "Die Dolomiten, wunderschöne Berge im Nordosten Italiens, erleben eine spektakuläre Wintersaison. Üppige Schneefälle haben die Pisten und Täler bedeckt. Skifahrer aus ganz Europa kommen an, um die weißen Hänge zu genießen. Die Pisten sind in perfektem Zustand. Die Bergheilägendörfer sind voller Touristen und Freude. Dieser Winter verspricht für Skifans unvergesslich zu sein.",
        source: "https://www.dolomiti.it",
        sourceName: "Dolomiti Turismo"
      }
    ]
  },

  "2026-02-07": {
    date: "2026-02-07",
    weekday: "Samstag",
    greeting: "Buon sabato! 🌤️",
    sentences: [
      {
        italian: "Mi piacerebbe prendere un caffè con te.",
        german: "Ich würde gerne einen Kaffee mit dir trinken.",
        explanation: "«Mi piacerebbe» ist der Konjunktiv (condizionale) von «piacere» — höflicher als «voglio» (ich will). Perfekt für Einladungen.",
        keywords: ["piacerebbe", "prendere"]
      },
      {
        italian: "Scusa, potresti parlare più lentamente?",
        german: "Entschuldigung, könntest du langsamer sprechen?",
        explanation: "«Potresti» (condizionale von «potere») macht die Bitte sehr höflich. «Più lentamente» = langsamer.",
        keywords: ["potresti", "lentamente"]
      },
      {
        italian: "Che tempo fa oggi? Sembra che piova.",
        german: "Wie ist das Wetter heute? Es sieht aus, als ob es regnet.",
        explanation: "«Che tempo fa» ist die Standardfrage fürs Wetter. «Sembra che» + Konjunktiv (congiuntivo) drückt Vermutung aus.",
        keywords: ["tempo", "sembra", "piova"]
      },
      {
        italian: "Ho voglia di fare una passeggiata al parco.",
        german: "Ich habe Lust, einen Spaziergang im Park zu machen.",
        explanation: "«Avere voglia di» + Infinitiv = Lust haben, etwas zu tun. Eine sehr natürliche Wendung im Alltag.",
        keywords: ["voglia", "passeggiata"]
      },
      {
        italian: "Non ti preoccupare, andrà tutto bene.",
        german: "Mach dir keine Sorgen, es wird alles gut.",
        explanation: "Ein tröstender Satz. «Preoccuparsi» = sich Sorgen machen. «Andrà» = Futur von «andare» (gehen).",
        keywords: ["preoccupare", "andrà"]
      }
    ],
    story: {
      title: "Un caffè al Bar Sport",
      topic: "Alltag",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Marco entra nel Bar Sport alle otto di mattina, come ogni giorno.",
            german: "Marco betritt das Bar Sport um acht Uhr morgens, wie jeden Tag.",
            note: "In Italien heißen Cafés oft «bar». Man steht an der Theke (al banco) oder setzt sich (al tavolo)."
          },
          {
            italian: "«Buongiorno, Lucia! Il solito, per favore», dice con un sorriso.",
            german: "«Guten Morgen, Lucia! Das Übliche, bitte», sagt er mit einem Lächeln.",
            note: "«Il solito» — das Übliche. Stammgäste in Italien bestellen oft so."
          },
          {
            italian: "Lucia prepara un espresso corto e lo mette sul bancone.",
            german: "Lucia bereitet einen kurzen Espresso zu und stellt ihn auf die Theke.",
            note: "«Espresso corto» = weniger Wasser, stärkerer Geschmack. «Lo» = ihn (Pronomen)."
          },
          {
            italian: "Il profumo del caffè riempie il piccolo locale, come una calda coperta.",
            german: "Der Duft des Kaffees erfüllt das kleine Lokal wie eine warme Decke.",
            note: "«Riempire» = füllen. «Locale» = Lokal/Geschäft. Schöne bildhafte Sprache."
          }
        ],
        [
          {
            italian: "«Come stai oggi?» chiede Lucia mentre pulisce una tazza.",
            german: "«Wie geht es dir heute?» fragt Lucia, während sie eine Tasse reinigt.",
            note: "«Mentre» = während. Drückt gleichzeitige Handlungen aus."
          },
          {
            italian: "«Bene, grazie. Oggi ho un colloquio di lavoro importante.»",
            german: "«Gut, danke. Heute habe ich ein wichtiges Vorstellungsgespräch.»",
            note: "«Colloquio di lavoro» = Vorstellungsgespräch. «Importante» steht nach dem Nomen."
          },
          {
            italian: "«In bocca al lupo!» risponde Lucia sorridendo.",
            german: "«Viel Glück!» antwortet Lucia lächelnd.",
            note: "«In bocca al lupo» = wörtlich «in den Mund des Wolfes». Die Antwort ist «Crepi!» (Er soll sterben!)."
          },
          {
            italian: "Marco ride e risponde: «Crepi! Speriamo bene.»",
            german: "Marco lacht und antwortet: «Danke! Hoffen wir das Beste.»",
            note: "«Sperare» = hoffen. «Speriamo bene» ist eine häufige umgangssprachliche Wendung."
          }
        ],
        [
          {
            italian: "Marco beve il suo caffè in un sorso e lascia un euro sul bancone.",
            german: "Marco trinkt seinen Kaffee in einem Schluck und lässt einen Euro auf der Theke.",
            note: "«In un sorso» = in einem Schluck. Espresso wird in Italien schnell getrunken."
          },
          {
            italian: "«Grazie, Lucia. A domani!» dice uscendo dal bar.",
            german: "«Danke, Lucia. Bis morgen!» sagt er, als er das Café verlässt.",
            note: "«Uscendo» — Gerundium von «uscire». Beschreibt eine gleichzeitige Handlung."
          },
          {
            italian: "Fuori piove leggermente, ma Marco si sente pronto per tutto.",
            german: "Draußen regnet es leicht, aber Marco fühlt sich bereit für alles.",
            note: "«Sentirsi» = sich fühlen (reflexiv). «Pronto per» = bereit für."
          },
          {
            italian: "Apre l'ombrello e cammina verso la metropolitana con passo sicuro.",
            german: "Er öffnet den Regenschirm und geht mit sicherem Schritt zur U-Bahn.",
            note: "«Ombrello» = Regenschirm. «Con passo sicuro» = mit sicherem Schritt."
          }
        ],
        [
          {
            italian: "In metropolitana, Marco ripassa mentalmente le risposte per il colloquio.",
            german: "In der U-Bahn geht Marco gedanklich die Antworten für das Gespräch durch.",
            note: "«Ripassare» = wiederholen/durchgehen. «Mentalmente» = gedanklich."
          },
          {
            italian: "Arriva davanti all'ufficio e fa un respiro profondo.",
            german: "Er kommt vor dem Büro an und atmet tief ein.",
            note: "«Fare un respiro profondo» = tief einatmen. «Davanti a» = vor (räumlich)."
          },
          {
            italian: "Due ore dopo, esce con un grande sorriso: ha ottenuto il lavoro!",
            german: "Zwei Stunden später kommt er mit einem großen Lächeln heraus: Er hat die Stelle bekommen!",
            note: "«Ottenere» = bekommen/erhalten. «Due ore dopo» = zwei Stunden später."
          },
          {
            italian: "La prima cosa che fa è tornare al Bar Sport: «Lucia, festeggiamo! Offro io!»",
            german: "Das Erste, was er tut, ist zum Bar Sport zurückzukehren: «Lucia, feiern wir! Ich lade ein!»",
            note: "«Offrire» = einladen/ausgeben. «Offro io» = Ich lade ein (ich bezahle)."
          }
        ]
      ]
    },
    news: [
      {
        category: "Kultur",
        headline: "Neues italienisches Filmfestival in Berlin angekündigt",
        italianSummary: "Un nuovo festival del cinema italiano avrà luogo a Berlino in primavera. Il festival presenterà più di trenta film italiani contemporanei, inclusi documentari e cortometraggi. I registi saranno presenti per discutere le loro opere con il pubblico. Il festival vuole rafforzare i legami culturali tra Italia e Germania. Le proiezioni si terranno in diversi cinema storici della città. L'ingresso sarà gratuito per gli studenti universitari.",
        german: "Ein neues Festival für italienisches Kino wird im Frühling in Berlin stattfinden. Es werden über dreißig zeitgenössische italienische Filme gezeigt, darunter Dokumentarfilme und Kurzfilme. Die Regisseure werden anwesend sein, um ihre Werke mit dem Publikum zu besprechen. Das Festival möchte die kulturellen Bindungen zwischen Italien und Deutschland stärken. Die Vorführungen finden in verschiedenen historischen Kinos der Stadt statt. Der Eintritt ist für Universitätsstudenten kostenlos.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "Reisen",
        headline: "Italien führt neues Zugticket für Touristen ein",
        italianSummary: "L'Italia ha introdotto un nuovo biglietto ferroviario per i turisti. Con il \u00abDiscover Italy Pass\u00bb si può viaggiare su tutti i treni regionali per una settimana. Il pass costa novantanove euro e include anche sconti per musei e attrazioni. I viaggiatori possono acquistarlo online o nelle stazioni principali. L'iniziativa è pensata per promuovere il turismo sostenibile e ridurre l'uso dell'auto. Finora, più di diecimila turisti hanno già approfittato dell'offerta.",
        german: "Italien hat ein neues Zugticket für Touristen eingeführt. Mit dem \u00abDiscover Italy Pass\u00bb kann man eine Woche lang alle Regionalzüge nutzen. Der Pass kostet neunundneunzig Euro und beinhaltet auch Rabatte für Museen und Sehenswürdigkeiten. Reisende können ihn online oder an den Hauptbahnsteigen kaufen. Die Initiative soll nachhaltigen Tourismus fördern und die Autonutzung verringern. Bisher haben bereits über zehntausend Touristen das Angebot genutzt.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      },
      {
        category: "Gesellschaft",
        headline: "Immer mehr Deutsche lernen Italienisch",
        italianSummary: "Secondo un nuovo studio, il numero di tedeschi che imparano l'italiano è cresciuto del venti per cento. La motivazione principale è l'amore per la cultura italiana. Molti studenti vogliono poter comunicare durante le vacanze in Italia. Anche il cibo e la musica italiana sono tra le ragioni più citate. Le scuole di lingua in Germania hanno registrato un aumento significativo delle iscrizioni. Gli esperti prevedono che questa tendenza continuerà nei prossimi anni.",
        german: "Laut einer neuen Studie ist die Zahl der Deutschen, die Italienisch lernen, um zwanzig Prozent gestiegen. Die Hauptmotivation ist die Liebe zur italienischen Kultur. Viele Studenten möchten sich im Urlaub in Italien verständigen können. Auch italienisches Essen und Musik gehören zu den meistgenannten Gründen. Sprachschulen in Deutschland verzeichneten einen deutlichen Anstieg der Anmeldungen. Experten erwarten, dass sich dieser Trend in den nächsten Jahren fortsetzen wird.",
        source: "https://www.corriere.it",
        sourceName: "Corriere della Sera"
      }
    ]
  },

  "2026-02-06": {
    date: "2026-02-06",
    weekday: "Freitag",
    greeting: "Buon venerdì! ☀️",
    sentences: [
      {
        italian: "Dove si trova la fermata dell'autobus più vicina?",
        german: "Wo befindet sich die nächste Bushaltestelle?",
        explanation: "«Trovarsi» = sich befinden. «Più vicino/a» = am nächsten. Sehr nützlich auf Reisen.",
        keywords: ["trova", "fermata", "vicina"]
      },
      {
        italian: "Vorrei prenotare un tavolo per due persone.",
        german: "Ich möchte einen Tisch für zwei Personen reservieren.",
        explanation: "«Vorrei» (condizionale von «volere») ist die höflichste Art, etwas zu bestellen oder zu bitten.",
        keywords: ["vorrei", "prenotare"]
      },
      {
        italian: "Mi sono svegliato presto stamattina perché non riuscivo a dormire.",
        german: "Ich bin heute Morgen früh aufgewacht, weil ich nicht schlafen konnte.",
        explanation: "«Svegliarsi» (reflexiv) = aufwachen. «Riuscire a» + Infinitiv = es schaffen, etwas zu tun.",
        keywords: ["svegliato", "riuscivo"]
      },
      {
        italian: "Questa torta è buonissima! Chi l'ha fatta?",
        german: "Dieser Kuchen ist super lecker! Wer hat ihn gemacht?",
        explanation: "«-issimo/a» = Superlativ. «L'ha fatta» = hat ihn/sie gemacht. «La» wird zu «l'» vor «ha».",
        keywords: ["buonissima", "fatta"]
      }
    ],
    story: {
      title: "La Domenica al Mercato",
      topic: "Alltag",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Ogni domenica mattina, Anna va al mercato del quartiere.",
            german: "Jeden Sonntagmorgen geht Anna zum Markt des Viertels.",
            note: "«Ogni» = jede/r. «Quartiere» = Stadtviertel. Märkte sind in Italien ein wichtiger Treffpunkt."
          },
          {
            italian: "Le piace scegliere la frutta e la verdura fresca direttamente dai contadini.",
            german: "Sie mag es, frisches Obst und Gemüse direkt von den Bauern auszusuchen.",
            note: "«Le piace» = es gefällt ihr. «Contadini» = Bauern. Frische Produkte sind in Italien sehr wichtig."
          },
          {
            italian: "Oggi vuole preparare una pasta al pomodoro per tutta la famiglia.",
            german: "Heute möchte sie eine Tomatensauce-Pasta für die ganze Familie zubereiten.",
            note: "«Tutta la famiglia» = die ganze Familie. «Pasta al pomodoro» ist ein Klassiker."
          },
          {
            italian: "Prende la borsa della spesa e esce di casa con il sole in faccia.",
            german: "Sie nimmt die Einkaufstasche und verlässt das Haus mit der Sonne im Gesicht.",
            note: "«Borsa della spesa» = Einkaufstasche. «Uscire di casa» = das Haus verlassen."
          }
        ],
        [
          {
            italian: "«Buongiorno, signora! Questi pomodori sono appena arrivati dalla Sicilia.»",
            german: "«Guten Morgen, gnädige Frau! Diese Tomaten sind gerade aus Sizilien angekommen.»",
            note: "«Signora» — höfliche Anrede. «Appena» = gerade eben. Sizilianische Tomaten sind berühmt!"
          },
          {
            italian: "Anna prende un chilo di pomodori, una cipolla e del basilico fresco.",
            german: "Anna nimmt ein Kilo Tomaten, eine Zwiebel und frisches Basilikum.",
            note: "«Del basilico» — Teilungsartikel (etwas Basilikum). Wichtige Struktur im Italienischen!"
          },
          {
            italian: "«Quanto costa tutto?» chiede aprendo il portafoglio.",
            german: "«Was kostet alles?» fragt sie und öffnet das Portemonnaie.",
            note: "«Quanto costa» — die wichtigste Frage auf dem Markt! «Aprendo» = Gerundium von «aprire»."
          },
          {
            italian: "«Tre euro e cinquanta. Per lei, solo tre euro!» dice il venditore con un occhiolino.",
            german: "«Drei fünfzig. Für Sie nur drei Euro!» sagt der Verkäufer mit einem Augenzwinkern.",
            note: "«Per lei» = für Sie (formell). «Occhiolino» = Augenzwinkern. Typisch für den Markt!"
          }
        ],
        [
          {
            italian: "Tornata a casa, Anna mette la musica e comincia a cucinare.",
            german: "Zu Hause angekommen, macht Anna Musik an und beginnt zu kochen.",
            note: "«Tornata a casa» — Partizip mit Bewegungsverb. «Cominciare a» + Infinitiv = anfangen zu."
          },
          {
            italian: "Taglia i pomodori a pezzetti e li mette nella padella con un filo d'olio.",
            german: "Sie schneidet die Tomaten in kleine Stücke und gibt sie mit einem Schuss Öl in die Pfanne.",
            note: "«Tagliare» = schneiden. «Filo d'olio» = Schuss Öl (wörtlich: Faden Öl)."
          },
          {
            italian: "La cucina si riempie del profumo del sugo che cuoce lentamente.",
            german: "Die Küche füllt sich mit dem Duft der Soße, die langsam kocht.",
            note: "«Riempirsi di» = sich füllen mit. «Sugo» = Soße/Sauce. Ein wunderschönes Bild."
          },
          {
            italian: "Aggiunge sale, pepe e un pizzico di zucchero per bilanciare l'acidità.",
            german: "Sie fügt Salz, Pfeffer und eine Prise Zucker hinzu, um die Säure auszugleichen.",
            note: "«Pizzico» = Prise. «Bilanciare» = ausgleichen. Ein Geheimtipp für Tomatensauce!"
          }
        ],
        [
          {
            italian: "Alle dodici, tutta la famiglia è seduta a tavola. «Buon appetito!»",
            german: "Um zwölf Uhr sitzt die ganze Familie am Tisch. «Guten Appetit!»",
            note: "«Essere seduto» = sitzen. Das gemeinsame Essen ist in Italien ein fast heiliges Ritual."
          },
          {
            italian: "I bambini mangiano con entusiasmo. «Mamma, questa pasta è buonissima!»",
            german: "Die Kinder essen mit Begeisterung. «Mama, diese Pasta ist superlecker!»",
            note: "«Buonissimo/a» = Superlativ von «buono». «-issimo» drückt das Höchstmaß aus."
          },
          {
            italian: "Anna sorride soddisfatta. Questi sono i momenti più belli della settimana.",
            german: "Anna lächelt zufrieden. Das sind die schönsten Momente der Woche.",
            note: "«Soddisfatto/a» = zufrieden. «Più belli» = am schönsten (Superlativ)."
          },
          {
            italian: "Dopo pranzo, qualcuno propone già: «Domenica prossima facciamo le lasagne?»",
            german: "Nach dem Essen schlägt schon jemand vor: «Machen wir nächsten Sonntag Lasagne?»",
            note: "«Proporre» = vorschlagen. «Domenica prossima» = nächsten Sonntag."
          }
        ]
      ]
    },
    news: [
      {
        category: "Wirtschaft",
        headline: "Italienischer Olivenölexport erreicht Rekordhoch",
        italianSummary: "Le esportazioni di olio d'oliva italiano hanno raggiunto un nuovo record. La qualità dell'olio extravergine italiano è sempre più apprezzata nel mondo. In particolare, i mercati asiatici mostrano una crescita impressionante della domanda. La Puglia e la Calabria sono le regioni che producono di più. I produttori italiani investono in tecnologie moderne per migliorare la qualità. Questo successo è il risultato di anni di lavoro e dedizione.",
        german: "Die Exporte von italienischem Olivenöl haben einen neuen Rekord erreicht. Die Qualität des italienischen Extra-Vergine-Öls wird weltweit immer mehr geschätzt. Insbesondere die asiatischen Märkte zeigen ein beeindruckendes Nachfragewachstum. Apulien und Kalabrien sind die Regionen mit der höchsten Produktion. Italienische Produzenten investieren in moderne Technologien zur Qualitätsverbesserung. Dieser Erfolg ist das Ergebnis jahrelanger Arbeit und Hingabe.",
        source: "https://www.ilsole24ore.com",
        sourceName: "Il Sole 24 Ore"
      },
      {
        category: "Kultur",
        headline: "Venedig plant neue Maßnahmen für nachhaltigen Tourismus",
        italianSummary: "Venezia ha annunciato nuove misure per il turismo sostenibile. I visitatori dovranno prenotare la visita in anticipo durante i mesi estivi. La città introdurrà un biglietto d'ingresso di cinque euro per i turisti giornalieri. L'obiettivo è ridurre il sovraffollamento e proteggere la città storica. Inoltre, saranno creati percorsi alternativi per distribuire meglio i flussi turistici. I residenti veneziani potranno muoversi liberamente senza restrizioni.",
        german: "Venedig hat neue Maßnahmen für nachhaltigen Tourismus angekündigt. Besucher müssen ihren Besuch in den Sommermonaten im Voraus buchen. Die Stadt wird ein Eintrittsgeld von fünf Euro für Tagesbesucher einführen. Ziel ist es, die Überfüllung zu reduzieren und die historische Stadt zu schützen. Zudem werden alternative Routen geschaffen, um die Touristenströme besser zu verteilen. Die Einwohner Venedigs können sich weiterhin frei und ohne Einschränkungen bewegen.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      },
      {
        category: "Sport",
        headline: "Serie A: Spannendes Wochenende steht bevor",
        italianSummary: "Questo fine settimana la Serie A offre partite emozionanti. Il derby di Milano tra Inter e Milan è l'evento più atteso. Entrambe le squadre sono in ottima forma e lottano per il titolo. Gli esperti prevedono una partita molto combattuta con tanti gol. Anche Napoli gioca in casa contro la Juventus in un altro scontro importante. I tifosi di tutta Italia si preparano per un fine settimana indimenticabile.",
        german: "An diesem Wochenende bietet die Serie A spannende Spiele. Das Mailänder Derby zwischen Inter und Milan ist das am meisten erwartete Ereignis. Beide Mannschaften sind in ausgezeichneter Form und kämpfen um den Titel. Experten erwarten ein sehr umkämpftes Spiel mit vielen Toren. Auch Neapel spielt zu Hause gegen Juventus in einem weiteren wichtigen Aufeinandertreffen. Fans aus ganz Italien bereiten sich auf ein unvergessliches Wochenende vor.",
        source: "https://www.gazzetta.it",
        sourceName: "La Gazzetta dello Sport"
      }
    ]
  },

  "2026-02-05": {
    date: "2026-02-05",
    weekday: "Donnerstag",
    greeting: "Buon giovedì! 🌿",
    sentences: [
      {
        italian: "Mi fa male la testa. Hai un'aspirina?",
        german: "Ich habe Kopfschmerzen. Hast du eine Aspirina?",
        explanation: "«Fare male» = wehtun. «Mi fa male la testa» — wörtlich: «Der Kopf tut mir weh». Nützlich beim Arzt!",
        keywords: ["male", "testa"]
      },
      {
        italian: "Sono appena tornato dalle vacanze in Sardegna.",
        german: "Ich bin gerade aus dem Urlaub auf Sardinien zurückgekommen.",
        explanation: "«Appena» = gerade eben. «Tornare» nutzt «essere» als Hilfsverb, deshalb «sono tornato».",
        keywords: ["appena", "tornato"]
      },
      {
        italian: "Quanto ci vuole per arrivare alla stazione?",
        german: "Wie lange braucht man, um zum Bahnhof zu kommen?",
        explanation: "«Volerci» = brauchen (Zeit). «Ci vogliono dieci minuti» = Man braucht zehn Minuten.",
        keywords: ["vuole", "arrivare"]
      }
    ],
    story: {
      title: "Una Telefonata Importante",
      topic: "Beruf",
      level: "A2-B1",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Il telefono di Giulia suona mentre sta pranzando.",
            german: "Giulias Telefon klingelt, während sie gerade zu Mittag isst.",
            note: "«Stare» + Gerundium = gerade etwas tun. «Sta pranzando» = sie isst gerade zu Mittag."
          },
          {
            italian: "È un numero sconosciuto. Giulia esita un attimo, poi risponde.",
            german: "Es ist eine unbekannte Nummer. Giulia zögert einen Moment, dann antwortet sie.",
            note: "«Sconosciuto» = unbekannt. «Esitare» = zögern. «Un attimo» = einen Augenblick."
          },
          {
            italian: "«Pronto? Sono la dottoressa Martini dell'ospedale San Raffaele.»",
            german: "«Hallo? Ich bin Doktorin Martini vom Krankenhaus San Raffaele.»",
            note: "«Pronto» ist die Standardbegrüßung am Telefon in Italien. Wörtlich: «bereit»."
          },
          {
            italian: "La voce è professionale ma gentile. Giulia sente il cuore accelerare.",
            german: "Die Stimme ist professionell, aber freundlich. Giulia spürt, wie ihr Herz schneller schlägt.",
            note: "«Accelerare» = beschleunigen. «Gentile» = freundlich/höflich."
          }
        ],
        [
          {
            italian: "Il cuore di Giulia batte più forte. Ha fatto domanda per un posto da infermiera tre settimane fa.",
            german: "Giulias Herz schlägt schneller. Sie hat sich vor drei Wochen auf eine Stelle als Krankenschwester beworben.",
            note: "«Fare domanda per» = sich bewerben für. «Tre settimane fa» = vor drei Wochen."
          },
          {
            italian: "«Siamo lieti di comunicarle che è stata selezionata per il posto.»",
            german: "«Wir freuen uns, Ihnen mitzuteilen, dass Sie für die Stelle ausgewählt wurden.»",
            note: "Formelle Sprache: «comunicarle» = Ihnen mitzuteilen. «È stata selezionata» = passiv."
          },
          {
            italian: "Giulia chiude gli occhi e sorride. «Grazie mille. Non vedo l'ora di cominciare!»",
            german: "Giulia schließt die Augen und lächelt. «Vielen Dank. Ich kann es kaum erwarten anzufangen!»",
            note: "«Non vedo l'ora di» = Ich kann es kaum erwarten. Drückt große Vorfreude aus."
          },
          {
            italian: "«Può iniziare lunedì prossimo? Le invieremo tutti i dettagli via email.»",
            german: "«Können Sie nächsten Montag anfangen? Wir senden Ihnen alle Details per E-Mail.»",
            note: "«Inviare» = senden. «Via email» = per E-Mail. Formelle Kommunikation."
          }
        ],
        [
          {
            italian: "Dopo la telefonata, Giulia resta seduta in silenzio per un minuto.",
            german: "Nach dem Telefonat bleibt Giulia eine Minute still sitzen.",
            note: "«Restare seduto» = sitzen bleiben. «In silenzio» = in Stille."
          },
          {
            italian: "Poi salta in piedi e corre dalla sua coinquilina: «Elena! Elena! Ce l'ho fatta!»",
            german: "Dann springt sie auf und rennt zu ihrer Mitbewohnerin: «Elena! Elena! Ich hab's geschafft!»",
            note: "«Farcela» = es schaffen. «Ce l'ho fatta» ist eine sehr häufige Redewendung."
          },
          {
            italian: "Elena la abbraccia forte. «Te lo meriti! Andiamo a festeggiare stasera!»",
            german: "Elena umarmt sie fest. «Du hast es verdient! Lass uns heute Abend feiern!»",
            note: "«Meritarsi» = verdienen. «Abbracciare» = umarmen."
          },
          {
            italian: "Giulia chiama subito sua madre. Sa che sarà la persona più felice di tutte.",
            german: "Giulia ruft sofort ihre Mutter an. Sie weiß, dass sie die glücklichste Person von allen sein wird.",
            note: "«Subito» = sofort. «La più felice di tutte» = Superlativ."
          }
        ],
        [
          {
            italian: "«Mamma? Ho una bellissima notizia!» La madre di Giulia piange di gioia.",
            german: "«Mama? Ich habe eine wunderschöne Neuigkeit!» Giulias Mutter weint vor Freude.",
            note: "«Piangere di gioia» = vor Freude weinen. «Notizia» = Neuigkeit."
          },
          {
            italian: "La sera, Giulia ed Elena vanno nel loro ristorante preferito.",
            german: "Am Abend gehen Giulia und Elena in ihr Lieblingsrestaurant.",
            note: "«Preferito» = Lieblings-. «Andare» im Präsens: vado, vai, va, andiamo, andate, vanno."
          },
          {
            italian: "Ordinano una bottiglia di prosecco e brindano al futuro.",
            german: "Sie bestellen eine Flasche Prosecco und stoßen auf die Zukunft an.",
            note: "«Brindare a» = anstoßen auf. «Ordinare» = bestellen."
          },
          {
            italian: "«Al nuovo inizio!» dice Giulia, con il sorriso più grande del mondo.",
            german: "«Auf den neuen Anfang!» sagt Giulia, mit dem größten Lächeln der Welt.",
            note: "«Inizio» = Anfang. «Il più grande del mondo» = der größte der Welt."
          }
        ]
      ]
    },
    news: [
      {
        category: "Wissenschaft",
        headline: "Italienische Forscher entwickeln neues Recycling-Verfahren",
        italianSummary: "Ricercatori italiani hanno sviluppato un nuovo metodo per riciclare la plastica. Il processo è più efficiente e meno costoso dei metodi attuali. La tecnologia permette di trasformare i rifiuti di plastica in materiali riutilizzabili in meno di ventiquattro ore. L'università di Bologna ha guidato il progetto in collaborazione con aziende private. I risultati sono stati pubblicati su una rivista scientifica internazionale. Questa innovazione potrebbe cambiare radicalmente il modo in cui gestiamo i rifiuti.",
        german: "Italienische Forscher haben eine neue Methode zum Recycling von Plastik entwickelt. Das Verfahren ist effizienter und kostengünstiger als aktuelle Methoden. Die Technologie ermöglicht es, Plastikabfall in weniger als vierundzwanzig Stunden in wiederverwendbare Materialien umzuwandeln. Die Universität Bologna leitete das Projekt in Zusammenarbeit mit privaten Unternehmen. Die Ergebnisse wurden in einer internationalen Fachzeitschrift veröffentlicht. Diese Innovation könnte die Art und Weise, wie wir Abfall behandeln, grundlegend verändern.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "Essen & Trinken",
        headline: "Napoli feiert die Pizza mit internationalem Festival",
        italianSummary: "Napoli ospiterà un grande festival internazionale della pizza. Pizzaioli da tutto il mondo si incontreranno per celebrare la tradizione napoletana. Il festival durerà tre giorni e includerà dimostrazioni di cottura, degustazioni e competizioni. Verranno utilizzati solo ingredienti locali e di alta qualità. I visitatori potranno anche partecipare a corsi per imparare a fare la vera pizza napoletana. L'evento è gratuito e si terrà nel centro storico della città.",
        german: "Neapel wird ein großes internationales Pizza-Festival veranstalten. Pizzabäcker aus der ganzen Welt treffen sich, um die neapolitanische Tradition zu feiern. Das Festival dauert drei Tage und umfasst Kochvorführungen, Verkostungen und Wettbewerbe. Es werden ausschließlich lokale Zutaten höchster Qualität verwendet. Besucher können auch an Kursen teilnehmen, um echte neapolitanische Pizza zu machen. Die Veranstaltung ist kostenlos und findet in der Altstadt statt.",
        source: "https://www.corriere.it",
        sourceName: "Corriere della Sera"
      }
    ]
  },

  "2026-02-04": {
    date: "2026-02-04",
    weekday: "Mittwoch",
    greeting: "Buon mercoledì! ✨",
    sentences: [
      {
        italian: "Ieri sera siamo andati a mangiare in un ristorante fantastico.",
        german: "Gestern Abend sind wir in ein fantastisches Restaurant essen gegangen.",
        explanation: "«Andare a mangiare» = essen gehen. «Siamo andati» — «andare» nutzt «essere» im Passato prossimo.",
        keywords: ["andati", "mangiare"]
      },
      {
        italian: "Non ho capito bene. Puoi ripetere, per favore?",
        german: "Ich habe nicht gut verstanden. Kannst du bitte wiederholen?",
        explanation: "Ein absolut wichtiger Satz! «Capire» = verstehen. «Ripetere» = wiederholen. Unverzichtbar im Alltag.",
        keywords: ["capito", "ripetere"]
      },
      {
        italian: "Che bello! Finalmente è arrivata la primavera.",
        german: "Wie schön! Endlich ist der Frühling gekommen.",
        explanation: "«Che bello!» = Wie schön! Ein häufiger Ausruf. «Finalmente» = endlich.",
        keywords: ["bello", "finalmente"]
      }
    ],
    story: {
      title: "Il Nuovo Vicino",
      topic: "Alltag",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Qualcuno bussa alla porta. Sofia apre e vede un uomo con una scatola di biscotti.",
            german: "Jemand klopft an die Tür. Sofia öffnet und sieht einen Mann mit einer Schachtel Kekse.",
            note: "«Bussare» = klopfen. «Scatola» = Schachtel/Karton."
          },
          {
            italian: "«Buongiorno! Sono il suo nuovo vicino. Mi chiamo Alessandro.»",
            german: "«Guten Tag! Ich bin Ihr neuer Nachbar. Ich heiße Alessandro.»",
            note: "Formelle Anrede: «il suo» statt «il tuo». Unter Nachbarn anfangs üblich."
          },
          {
            italian: "«Piacere, io sono Sofia! Benvenuto nel palazzo.»",
            german: "«Freut mich, ich bin Sofia! Willkommen im Haus.»",
            note: "«Piacere» = Freut mich (bei Vorstellungen). «Palazzo» = Wohngebäude."
          },
          {
            italian: "Alessandro le porge la scatola. «Ho portato dei biscotti fatti in casa.»",
            german: "Alessandro reicht ihr die Schachtel. «Ich habe selbstgemachte Kekse mitgebracht.»",
            note: "«Porgere» = reichen. «Fatti in casa» = selbstgemacht (wörtlich: zu Hause gemacht)."
          }
        ],
        [
          {
            italian: "Sofia invita Alessandro a prendere un caffè. Lui accetta volentieri.",
            german: "Sofia lädt Alessandro auf einen Kaffee ein. Er nimmt gerne an.",
            note: "«Invitare a» + Infinitiv = einladen zu. «Volentieri» = gerne."
          },
          {
            italian: "Parlano per un'ora di tutto: del quartiere, del lavoro, della vita.",
            german: "Sie sprechen eine Stunde lang über alles: über das Viertel, die Arbeit, das Leben.",
            note: "«Parlare di» = sprechen über. Beachte die Zusammenziehung: «di + il = del»."
          },
          {
            italian: "Alessandro racconta che si è trasferito da Napoli per lavoro.",
            german: "Alessandro erzählt, dass er wegen der Arbeit von Neapel umgezogen ist.",
            note: "«Trasferirsi» = umziehen (reflexiv). «Per lavoro» = wegen der Arbeit."
          },
          {
            italian: "«Mi manca un po' il mare, ma questa città mi piace molto.»",
            german: "«Das Meer fehlt mir ein bisschen, aber diese Stadt gefällt mir sehr.»",
            note: "«Mancare» = fehlen (wie «gefallen» — umgekehrte Konstruktion). «Mi manca il mare» = Das Meer fehlt mir."
          }
        ],
        [
          {
            italian: "Sofia gli parla dei posti migliori del quartiere: il panificio, la libreria, il parco.",
            german: "Sofia erzählt ihm von den besten Orten des Viertels: die Bäckerei, die Buchhandlung, der Park.",
            note: "«Gli» = ihm. «Panificio» = Bäckerei. «Libreria» = Buchhandlung (nicht Bibliothek!)."
          },
          {
            italian: "«C'è anche un mercato il sabato mattina. Si mangia benissimo qui!»",
            german: "«Es gibt auch einen Markt am Samstagmorgen. Man isst hier hervorragend!»",
            note: "«Si mangia» = man isst (unpersönliches «si»). «Benissimo» = sehr gut/hervorragend."
          },
          {
            italian: "Alessandro sorride. Gli piace già questa vicina così gentile.",
            german: "Alessandro lächelt. Ihm gefällt diese so freundliche Nachbarin bereits.",
            note: "«Gli piace» = ihm gefällt. «Così» = so. Beachte die Wortstellung!"
          },
          {
            italian: "«Sai cosa? Sabato ti porto al mercato. Ti faccio assaggiare il miglior arancino!»",
            german: "«Weißt du was? Samstag bringe ich dich zum Markt. Ich lasse dich das beste Arancino probieren!»",
            note: "«Far assaggiare» = probieren lassen. «Arancino» = sizilianische Reisbällchen. Eine Spezialität!"
          }
        ],
        [
          {
            italian: "«È stato un piacere conoscerti. A presto, Sofia!»",
            german: "«Es war schön, dich kennenzulernen. Bis bald, Sofia!»",
            note: "Wechsel zu «tu»! Nach dem Kaffee duzen sie sich — typisch italienisch."
          },
          {
            italian: "Alessandro torna nel suo appartamento e comincia a disfare le scatole.",
            german: "Alessandro kehrt in seine Wohnung zurück und beginnt, die Kartons auszupacken.",
            note: "«Disfare» = auspacken. «Scatole» = Kartons/Kisten (Plural)."
          },
          {
            italian: "Mentre sistema i libri, pensa che trasferirsi qui è stata la scelta giusta.",
            german: "Während er die Bücher einräumt, denkt er, dass der Umzug hierher die richtige Wahl war.",
            note: "«Sistemare» = einräumen/ordnen. «Scelta giusta» = richtige Wahl."
          },
          {
            italian: "Dal balcone sente il rumore della città. «Sì, mi troverò bene qui.»",
            german: "Vom Balkon hört er die Geräusche der Stadt. «Ja, mir wird es hier gut gehen.»",
            note: "«Trovarsi bene» = sich wohlfühlen. «Rumore» = Geräusch/Lärm."
          }
        ]
      ]
    },
    news: [
      {
        category: "Technologie",
        headline: "Mailand testet autonome Elektrobusse",
        italianSummary: "Milano ha iniziato a testare autobus elettrici autonomi nel centro città. Il progetto pilota durerà sei mesi e coinvolgerà tre linee. Gli autobus possono trasportare fino a venti passeggeri e seguono percorsi prestabiliti. Un operatore è sempre presente a bordo per garantire la sicurezza. I primi risultati mostrano una riduzione significativa delle emissioni inquinanti. Se il test avrà successo, la città prevede di espandere il servizio a dieci linee entro il prossimo anno.",
        german: "Mailand hat begonnen, autonome Elektrobusse in der Innenstadt zu testen. Das Pilotprojekt wird sechs Monate dauern und drei Linien umfassen. Die Busse können bis zu zwanzig Passagiere befördern und folgen voreingestellten Routen. Ein Operator ist immer an Bord, um die Sicherheit zu gewährleisten. Erste Ergebnisse zeigen eine deutliche Reduzierung der Schadstoffemissionen. Bei Erfolg des Tests plant die Stadt, den Dienst bis nächstes Jahr auf zehn Linien auszuweiten.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      },
      {
        category: "Reisen",
        headline: "Sizilien wird zum Hotspot für digitale Nomaden",
        italianSummary: "La Sicilia sta diventando una destinazione popolare per i nomadi digitali. Diverse città offrono spazi di coworking e connessione internet veloce. Il costo della vita è significativamente più basso rispetto alle grandi città europee. Catania e Palermo sono le città più scelte dai lavoratori da remoto. Il clima mite e la ricca tradizione culinaria rendono l'isola ancora più attraente. Il governo regionale offre incentivi fiscali per chi decide di trasferirsi in Sicilia.",
        german: "Sizilien wird zu einem beliebten Reiseziel für digitale Nomaden. Mehrere Städte bieten Coworking-Spaces und schnelles Internet an. Die Lebenshaltungskosten sind deutlich niedriger als in großen europäischen Städten. Catania und Palermo sind die beliebtesten Städte bei Remote-Arbeitern. Das milde Klima und die reiche kulinarische Tradition machen die Insel noch attraktiver. Die Regionalregierung bietet steuerliche Anreize für alle, die nach Sizilien ziehen.",
        source: "https://www.ansa.it",
        sourceName: "ANSA"
      },
      {
        category: "Kultur",
        headline: "Neue Ausstellung über Leonardo da Vinci in Florenz",
        italianSummary: "Una nuova mostra dedicata a Leonardo da Vinci aprirà a Firenze la prossima settimana. L'esposizione include disegni mai esposti al pubblico. Provengono da collezioni private e musei di tutto il mondo. I visitatori potranno anche esplorare ricostruzioni interattive delle sue invenzioni più famose. La mostra resterà aperta per sei mesi e si prevede un grande afflusso di visitatori. I biglietti possono essere acquistati online per evitare le lunghe code.",
        german: "Eine neue Ausstellung über Leonardo da Vinci wird nächste Woche in Florenz eröffnet. Die Ausstellung umfasst Zeichnungen, die noch nie öffentlich gezeigt wurden. Sie stammen aus privaten Sammlungen und Museen weltweit. Besucher können auch interaktive Nachbauten seiner berühmtesten Erfindungen erkunden. Die Ausstellung bleibt sechs Monate geöffnet und es wird ein großer Besucherandrang erwartet. Eintrittskarten können online erworben werden, um lange Warteschlangen zu vermeiden.",
        source: "https://www.corriere.it",
        sourceName: "Corriere della Sera"
      }
    ]
  },

  "2026-02-03": {
    date: "2026-02-03",
    weekday: "Dienstag",
    greeting: "Buon martedì! 🌸",
    sentences: [
      {
        italian: "A che ora apre il museo domani mattina?",
        german: "Um wie viel Uhr öffnet das Museum morgen früh?",
        explanation: "«A che ora» = Um wie viel Uhr. Sehr wichtige Frage im Alltag. «Domani mattina» = morgen früh.",
        keywords: ["ora", "apre"]
      },
      {
        italian: "Secondo me, questo vino è migliore di quello.",
        german: "Meiner Meinung nach ist dieser Wein besser als jener.",
        explanation: "«Secondo me» = meiner Meinung nach. «Migliore di» = besser als (unregelmäßiger Komparativ von «buono»).",
        keywords: ["secondo", "migliore"]
      },
      {
        italian: "Devo andare dal dentista la settimana prossima.",
        german: "Ich muss nächste Woche zum Zahnarzt gehen.",
        explanation: "«Dovere» = müssen. «Dal dentista» = zum Zahnarzt (da + il = dal). «Prossimo/a» = nächste/r.",
        keywords: ["devo", "prossima"]
      },
      {
        italian: "Ti va di venire con noi al cinema stasera?",
        german: "Hast du Lust, heute Abend mit uns ins Kino zu kommen?",
        explanation: "«Ti va di» + Infinitiv = Hast du Lust zu. Sehr umgangssprachlich und gebräuchlich unter Freunden.",
        keywords: ["va", "venire", "stasera"]
      }
    ],
    story: {
      title: "Persi a Roma",
      topic: "Reisen",
      level: "A2",
      readingTime: "5 min",
      pages: [
        [
          {
            italian: "Thomas e Klara sono a Roma per la prima volta.",
            german: "Thomas und Klara sind zum ersten Mal in Rom.",
            note: "«Per la prima volta» = zum ersten Mal. Einfache aber wichtige Wendung."
          },
          {
            italian: "Vogliono visitare il Colosseo, ma si sono persi.",
            german: "Sie wollen das Kolosseum besuchen, aber sie haben sich verlaufen.",
            note: "«Perdersi» (reflexiv) = sich verlaufen. «Si sono persi» = sie haben sich verlaufen."
          },
          {
            italian: "«Scusi, sa dov'è il Colosseo?» chiede Thomas a un passante.",
            german: "«Entschuldigung, wissen Sie, wo das Kolosseum ist?» fragt Thomas einen Passanten.",
            note: "«Scusi» = formelle Entschuldigung. «Sa» = Sie wissen (formell, von «sapere»)."
          },
          {
            italian: "Il passante si ferma e li guarda con un sorriso amichevole.",
            german: "Der Passant bleibt stehen und schaut sie mit einem freundlichen Lächeln an.",
            note: "«Fermarsi» = stehen bleiben. «Amichevole» = freundlich/freundschaftlich."
          }
        ],
        [
          {
            italian: "L'uomo sorride gentilmente. «Certo! Andate sempre dritto, poi girate a sinistra.»",
            german: "Der Mann lächelt freundlich. «Natürlich! Geht immer geradeaus, dann biegt links ab.»",
            note: "Wegbeschreibung: «dritto» = geradeaus, «girare a sinistra» = links abbiegen, «a destra» = rechts."
          },
          {
            italian: "«Dopo circa cinque minuti lo vedrete. Non potete sbagliare!»",
            german: "«Nach ungefähr fünf Minuten werdet ihr es sehen. Ihr könnt euch nicht irren!»",
            note: "«Vedrete» = Futur von «vedere». «Sbagliare» = sich irren, einen Fehler machen."
          },
          {
            italian: "«Grazie mille!» rispondono insieme, e riprendono a camminare.",
            german: "«Vielen Dank!» antworten sie zusammen, und gehen weiter.",
            note: "«Riprendere a» + Infinitiv = wieder anfangen zu. «Insieme» = zusammen."
          },
          {
            italian: "Per strada si fermano a comprare un gelato. «Due coni, per favore!»",
            german: "Unterwegs halten sie an, um ein Eis zu kaufen. «Zwei Waffeln, bitte!»",
            note: "«Cono» = Waffel/Eistüte. «Per strada» = unterwegs/auf der Straße."
          }
        ],
        [
          {
            italian: "Quando finalmente vedono il Colosseo, restano a bocca aperta.",
            german: "Als sie endlich das Kolosseum sehen, bleibt ihnen der Mund offen stehen.",
            note: "«Restare a bocca aperta» = staunen, sprachlos sein (wörtlich: mit offenem Mund bleiben)."
          },
          {
            italian: "«È ancora più grande di quello che immaginavo!» dice Klara.",
            german: "«Es ist noch größer als ich es mir vorgestellt habe!» sagt Klara.",
            note: "«Più grande di quello che» = größer als das, was. «Immaginare» = sich vorstellen."
          },
          {
            italian: "Thomas scatta una foto e pensa: «Roma è davvero magica.»",
            german: "Thomas macht ein Foto und denkt: «Rom ist wirklich magisch.»",
            note: "«Scattare una foto» = ein Foto machen. «Davvero» = wirklich, tatsächlich."
          },
          {
            italian: "Si siedono sulle scalinate lì vicino e guardano i turisti passare.",
            german: "Sie setzen sich auf die Stufen in der Nähe und schauen den Touristen beim Vorbeigehen zu.",
            note: "«Sedersi» = sich setzen. «Scalinate» = Treppen/Stufen. «Lì vicino» = dort in der Nähe."
          }
        ],
        [
          {
            italian: "Klara apre la guida turistica. «Adesso andiamo ai Fori Romani?»",
            german: "Klara öffnet den Reiseführer. «Gehen wir jetzt zum Forum Romanum?»",
            note: "«Guida turistica» = Reiseführer. «Adesso» = jetzt. «Fori Romani» = Forum Romanum."
          },
          {
            italian: "«Sì, ma prima facciamo una pausa. Prendiamo un caffè?»",
            german: "«Ja, aber zuerst machen wir eine Pause. Trinken wir einen Kaffee?»",
            note: "«Fare una pausa» = eine Pause machen. «Prendere un caffè» = einen Kaffee trinken."
          },
          {
            italian: "Nel bar vicino al Colosseo, ordinano due cappuccini e un tiramisù da dividere.",
            german: "In der Bar neben dem Kolosseum bestellen sie zwei Cappuccini und ein Tiramisù zum Teilen.",
            note: "«Dividere» = teilen. «Cappuccini» = Plural von «cappuccino». Achtung: nach 11 Uhr trinkt man in Italien keinen Cappuccino!"
          },
          {
            italian: "Thomas alza la tazza: «Alla nostra prima avventura romana!» Klara ride: «E sicuramente non l'ultima!»",
            german: "Thomas hebt die Tasse: «Auf unser erstes römisches Abenteuer!» Klara lacht: «Und sicher nicht das letzte!»",
            note: "«Alzare» = heben. «Avventura» = Abenteuer. «Sicuramente» = sicherlich."
          }
        ]
      ]
    },
    news: [
      {
        category: "Gesellschaft",
        headline: "Rom plant autofreie Sonntage in der Innenstadt",
        italianSummary: "Roma organizzerà domeniche senza auto nel centro storico una volta al mese. L'obiettivo è migliorare la qualità dell'aria e promuovere la mobilità sostenibile. Durante queste giornate, le strade principali saranno riservate a pedoni e ciclisti. I negozi e i ristoranti potranno espandere i loro spazi all'aperto. Il trasporto pubblico sarà potenziato con corse aggiuntive. I cittadini romani hanno accolto l'iniziativa con grande entusiasmo.",
        german: "Rom wird einmal im Monat autofreie Sonntage in der Altstadt organisieren. Ziel ist es, die Luftqualität zu verbessern und nachhaltige Mobilität zu fördern. An diesen Tagen werden die Hauptstraßen für Fußgänger und Radfahrer reserviert. Geschäfte und Restaurants können ihre Außenflächen erweitern. Der öffentliche Nahverkehr wird mit zusätzlichen Fahrten verstärkt. Die römischen Bürger haben die Initiative mit großer Begeisterung aufgenommen.",
        source: "https://www.repubblica.it",
        sourceName: "La Repubblica"
      },
      {
        category: "Essen & Trinken",
        headline: "Carbonara-Rezept sorgt international für Diskussion",
        italianSummary: "Una famosa chef americana ha pubblicato una ricetta di carbonara con panna. Gli italiani hanno reagito con umorismo e indignazione sui social media. La vera carbonara napoletana si prepara solo con guanciale, uova, pecorino e pepe nero. L'aggiunta di panna è considerata un vero e proprio sacrilegio in Italia. La discussione ha generato migliaia di commenti e meme divertenti. Alla fine, la chef ha ammesso di aver sbagliato e ha promesso di visitare Roma per imparare la ricetta autentica.",
        german: "Eine berühmte amerikanische Köchin hat ein Carbonara-Rezept mit Sahne veröffentlicht. Italiener reagierten in sozialen Medien mit Humor und Empörung. Die echte neapolitanische Carbonara wird nur mit Guanciale, Eiern, Pecorino und schwarzem Pfeffer zubereitet. Die Zugabe von Sahne gilt in Italien als regelrechtes Sakrileg. Die Diskussion erzeugte Tausende von Kommentaren und lustige Memes. Am Ende gab die Köchin zu, sich geirrt zu haben, und versprach, Rom zu besuchen, um das authentische Rezept zu lernen.",
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
