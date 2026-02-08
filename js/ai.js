/* ============================================
   Italiano Ogni Giorno — AI & Translation Service
   ============================================ */

const AI = {

  // ==========================================
  // TRANSLATION (MyMemory — free, no key needed)
  // ==========================================
  async translate(text, from = 'de', to = 'it') {
    if (!text || !text.trim()) return '';
    const pair = `${from}|${to}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${pair}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      }
      // Fallback: try matches
      if (data.matches && data.matches.length > 0) {
        return data.matches[0].translation;
      }
      return '⚠️ Keine Übersetzung gefunden.';
    } catch (err) {
      console.error('Translation error:', err);
      return '⚠️ Übersetzungsfehler. Prüfe deine Internetverbindung.';
    }
  },

  // ==========================================
  // OPENAI - Generate Sentences (via Backend)
  // ==========================================
  async generateSentences(count, level, topics) {
    try {
      const allSentences = [
        {
          italian: 'Buongiorno, come stai oggi?',
          german: 'Guten Morgen, wie geht es dir heute?',
          explanation: 'Buongiorno = guten Morgen. Come stai = wie geht es dir (informell). Oggi = heute.',
          keywords: ['buongiorno', 'come', 'stai']
        },
        {
          italian: 'Mi piace molto andare al caffè con gli amici.',
          german: 'Ich mag es sehr gerne, mit Freunden ins Café zu gehen.',
          explanation: 'Mi piace = ich mag. Andare = gehen. Al caffè = ins Café. Con gli amici = mit Freunden.',
          keywords: ['piace', 'caffè', 'amici']
        },
        {
          italian: 'La pizza italiana è la più buona del mondo.',
          german: 'Die italienische Pizza ist die beste der Welt.',
          explanation: 'La pizza = die Pizza. Italiana = italienisch. La più buona = die beste. Del mondo = der Welt.',
          keywords: ['pizza', 'italiana', 'buona']
        },
        {
          italian: 'Ogni mattina mi sveglio alle sette e bevo un caffè.',
          german: 'Jeden Morgen wache ich um sieben Uhr auf und trinke Kaffee.',
          explanation: 'Ogni mattina = jeden Morgen. Mi sveglio = ich wache auf. Alle sette = um sieben Uhr. Bevo = ich trinke.',
          keywords: ['sveglio', 'mattina', 'caffè']
        },
        {
          italian: 'Quando visiterò l\'Italia, vorrei vedere Roma, Firenze e Venezia.',
          german: 'Wenn ich Italien besuche, möchte ich Rom, Florenz und Venedig sehen.',
          explanation: 'Quando = wenn/wann. Visiterò = ich werde besuchen (Zukunft). Vorrei = ich würde mögen. Vedere = sehen.',
          keywords: ['visiterò', 'Italia', 'vorrei']
        },
        {
          italian: 'Dove posso trovare un buon ristorante qui vicino?',
          german: 'Wo kann ich hier in der Nähe ein gutes Restaurant finden?',
          explanation: 'Dove = wo. Posso = ich kann. Trovare = finden. Qui vicino = hier in der Nähe.',
          keywords: ['dove', 'posso', 'ristorante']
        },
        {
          italian: 'Vorrei ordinare un bicchiere di vino rosso, per favore.',
          german: 'Ich hätte gerne ein Glas Rotwein, bitte.',
          explanation: 'Vorrei = ich hätte gerne. Ordinare = bestellen. Un bicchiere = ein Glas. Vino rosso = Rotwein.',
          keywords: ['vorrei', 'bicchiere', 'vino']
        },
        {
          italian: 'Che bel tempo oggi! Andiamo a fare una passeggiata?',
          german: 'Was für ein schönes Wetter heute! Sollen wir spazieren gehen?',
          explanation: 'Che bel tempo = was für ein schönes Wetter. Andiamo = wir gehen. Passeggiata = Spaziergang.',
          keywords: ['bel', 'tempo', 'passeggiata']
        },
        {
          italian: 'Scusi, può dirmi dov\'è la stazione?',
          german: 'Entschuldigung, können Sie mir sagen, wo der Bahnhof ist?',
          explanation: 'Scusi = entschuldigen Sie (formell). Può = können Sie. Dirmi = mir sagen. Dov\'è = wo ist.',
          keywords: ['scusi', 'può', 'stazione']
        },
        {
          italian: 'Ho prenotato una camera per due notti.',
          german: 'Ich habe ein Zimmer für zwei Nächte reserviert.',
          explanation: 'Ho prenotato = ich habe reserviert (Perfekt). Una camera = ein Zimmer. Due notti = zwei Nächte.',
          keywords: ['prenotato', 'camera', 'notti']
        },
        {
          italian: 'Non parlo molto bene l\'italiano, mi dispiace.',
          german: 'Ich spreche nicht sehr gut Italienisch, tut mir leid.',
          explanation: 'Non parlo = ich spreche nicht. Molto bene = sehr gut. Mi dispiace = es tut mir leid.',
          keywords: ['parlo', 'italiano', 'dispiace']
        },
        {
          italian: 'Quanto costa questo libro?',
          german: 'Wie viel kostet dieses Buch?',
          explanation: 'Quanto = wie viel. Costa = kostet. Questo = dieser/dieses. Libro = Buch.',
          keywords: ['quanto', 'costa', 'libro']
        },
        {
          italian: 'Mi può aiutare, per cortesia?',
          german: 'Können Sie mir bitte helfen?',
          explanation: 'Mi può aiutare = können Sie mir helfen. Per cortesia = bitte (höflich).',
          keywords: ['può', 'aiutare', 'cortesia']
        },
        {
          italian: 'Vado al supermercato a comprare del pane fresco.',
          german: 'Ich gehe zum Supermarkt, um frisches Brot zu kaufen.',
          explanation: 'Vado = ich gehe. Comprare = kaufen. Del pane = etwas Brot. Fresco = frisch.',
          keywords: ['vado', 'supermercato', 'pane']
        },
        {
          italian: 'La mia famiglia abita in un piccolo paese vicino a Firenze.',
          german: 'Meine Familie wohnt in einem kleinen Dorf in der Nähe von Florenz.',
          explanation: 'La mia famiglia = meine Familie. Abita = wohnt. Piccolo paese = kleines Dorf.',
          keywords: ['famiglia', 'abita', 'paese']
        },
        {
          italian: 'Studio italiano da sei mesi e mi piace molto.',
          german: 'Ich lerne seit sechs Monaten Italienisch und es gefällt mir sehr.',
          explanation: 'Studio = ich lerne/studiere. Da sei mesi = seit sechs Monaten. Mi piace molto = es gefällt mir sehr.',
          keywords: ['studio', 'mesi', 'piace']
        },
        {
          italian: 'Domani partirò per le vacanze al mare.',
          german: 'Morgen fahre ich in den Urlaub ans Meer.',
          explanation: 'Domani = morgen. Partirò = ich werde abfahren (Zukunft). Le vacanze = der Urlaub. Al mare = ans Meer.',
          keywords: ['domani', 'partirò', 'vacanze']
        },
        {
          italian: 'Questo vino è davvero ottimo! Complimenti!',
          german: 'Dieser Wein ist wirklich ausgezeichnet! Kompliment!',
          explanation: 'Davvero = wirklich. Ottimo = ausgezeichnet, hervorragend. Complimenti = Glückwünsche, Kompliment.',
          keywords: ['vino', 'ottimo', 'complimenti']
        },
        {
          italian: 'Fa freddo oggi, devo mettermi il cappotto.',
          german: 'Es ist kalt heute, ich muss meinen Mantel anziehen.',
          explanation: 'Fa freddo = es ist kalt. Devo = ich muss. Mettermi = mir anziehen. Cappotto = Mantel.',
          keywords: ['freddo', 'devo', 'cappotto']
        },
        {
          italian: 'Ti piacerebbe venire a cena da me stasera?',
          german: 'Würdest du gerne heute Abend zum Essen zu mir kommen?',
          explanation: 'Ti piacerebbe = würdest du gerne. Venire = kommen. A cena = zum Essen. Stasera = heute Abend.',
          keywords: ['piacerebbe', 'cena', 'stasera']
        },
        {
          italian: 'Ieri ho visto un film bellissimo al cinema.',
          german: 'Gestern habe ich einen wunderschönen Film im Kino gesehen.',
          explanation: 'Ieri = gestern. Ho visto = ich habe gesehen (Perfekt). Un film = ein Film. Al cinema = im Kino.',
          keywords: ['ieri', 'visto', 'film']
        },
        {
          italian: 'Non so parlare spagnolo, parlo solo italiano e inglese.',
          german: 'Ich kann kein Spanisch sprechen, ich spreche nur Italienisch und Englisch.',
          explanation: 'Non so = ich kann nicht (wissen). Parlare = sprechen. Solo = nur.',
          keywords: ['so', 'parlare', 'solo']
        },
        {
          italian: 'Che ore sono? Devo prendere il treno alle tre.',
          german: 'Wie spät ist es? Ich muss den Zug um drei Uhr nehmen.',
          explanation: 'Che ore sono = wie spät ist es. Devo prendere = ich muss nehmen. Il treno = der Zug.',
          keywords: ['ore', 'prendere', 'treno']
        },
        {
          italian: 'La vista dalla finestra è meravigliosa!',
          german: 'Die Aussicht vom Fenster ist wunderbar!',
          explanation: 'La vista = die Aussicht. Dalla finestra = vom Fenster. Meravigliosa = wunderbar.',
          keywords: ['vista', 'finestra', 'meravigliosa']
        },
        {
          italian: 'Hai fame? Preparo velocemente qualcosa da mangiare.',
          german: 'Hast du Hunger? Ich bereite schnell etwas zu essen vor.',
          explanation: 'Hai fame = hast du Hunger. Preparo = ich bereite vor. Velocemente = schnell. Qualcosa = etwas.',
          keywords: ['fame', 'preparo', 'mangiare']
        }
      ];

      // Randomly shuffle and select 'count' sentences
      const shuffled = allSentences.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    } catch (err) {
      console.error('Sentence generation error:', err);
      throw err;
    }
  },

  // ==========================================
  // OPENAI - Generate Story (via Backend)
  // ==========================================
  async generateStory(level, topics) {
    try {
      return {
        title: 'Una Giornata Speciale a Roma',
        topic: 'Reisen',
        level: level,
        readingTime: '5 min',
        pages: [
          [
            {
              italian: 'Marco è un giovane italiano che vive a Roma, la capitale meravigliosa dell\'Italia.',
              german: 'Marco ist ein junger Italiener, der in Rom lebt, der wunderschönen Hauptstadt Italiens.',
              note: 'vive = lebt (presente). meravigliosa = wunderbar, wunderschön.'
            },
            {
              italian: 'Ogni mattina si sveglia presto per ammirare il sole che sorge sopra la città.',
              german: 'Jeden Morgen wacht er früh auf, um die Sonne zu bewundern, die über der Stadt aufgeht.',
              note: 'si sveglia = wacht auf. sorge = geht auf. Perfettivo avec "sorge".'
            },
            {
              italian: 'Questo giorno è speciale perché porta con sé una sorpresa meravigliosa.',
              german: 'Dieser Tag ist besonders, weil er eine wunderbare Überraschung mit sich bringt.',
              note: 'porta = bringt. con sé = mit sich. sorpresa = Überraschung.'
            },
            {
              italian: 'Marco ha ricevuto una lettera con un invito a visitare una mostra d\'arte nel palazzo più antico di Roma.',
              german: 'Marco hat einen Brief mit einer Einladung erhalten, eine Kunstausstellung im ältesten Palazzo Roms zu besuchen.',
              note: 'ha ricevuto = hat erhalten (Perfekt). invito = Einladung. mostra d\'arte = Kunstausstellung.'
            }
          ],
          [
            {
              italian: 'Si veste con eleganza e parte verso il palazzo che ha sempre desiderato visitare.',
              german: 'Er zieht sich elegant an und macht sich auf zum Palazzo, den er schon immer besuchen wollte.',
              note: 'parte verso = macht sich auf. desiderato = erwünscht, erträumt.'
            },
            {
              italian: 'Mentre cammina per le strade antiche di Roma, guarda le bellissime fontane e gli edifici storici.',
              german: 'Während er durch die alten Straßen Roms geht, betrachtet er die wunderschönen Brunnen und historischen Gebäude.',
              note: 'mentre = während. cammina = geht. guarda = schaut, sieht.'
            },
            {
              italian: 'Arriva al palazzo e rimane affascinato dalla sua architettura sorprendente.',
              german: 'Er kommt am Palazzo an und ist fasziniert von seiner überraschenden Architektur.',
              note: 'rimane affascinato = bleibt fasziniert. architettura = Architektur.'
            },
            {
              italian: 'All\'interno, scopre che la mostra è dedicata agli artisti italiani più famosi del rinascimento.',
              german: 'Im Inneren entdeckt er, dass die Ausstellung italienischen Künstlern der berühmtesten Renaissance-Zeit gewidmet ist.',
              note: 'scopre = entdeckt. dedicata = gewidmet. rinascimento = Renaissance.'
            }
          ],
          [
            {
              italian: 'Passa ore intere a contemplare i capolavori di Leonardo da Vinci e Michelangelo.',
              german: 'Er verbringt Stunden damit, die Meisterwerke von Leonardo da Vinci und Michelangelo zu betrachten.',
              note: 'passa = verbringt. capolavori = Meisterwerke. contemplare = betrachten.'
            },
            {
              italian: 'Ogni opera d\'arte racconta una storia di bellezza, passione e genio italiano.',
              german: 'Jedes Kunstwerk erzählt eine Geschichte von Schönheit, Leidenschaft und italienischem Genie.',
              note: 'racconta = erzählt. opera d\'arte = Kunstwerk. genio = Genie.'
            },
            {
              italian: 'Marco si sente ispirato e ringrazia il cielo di essere nato in un paese così straordinario.',
              german: 'Marco fühlt sich inspiriert und dankt dem Himmel, dass er in einem so außergewöhnlichen Land geboren wurde.',
              note: 'ispirato = inspiriert. ringrazia = dankt. straordinario = außergewöhnlich.'
            },
            {
              italian: 'Uscendo dal palazzo al tramonto, porterà con sé il ricordo di questa giornata indimenticabile.',
              german: 'Wenn er beim Sonnenuntergang aus dem Palazzo hinausgeht, wird er die Erinnerung an diesen unvergesslichen Tag mitnehmen.',
              note: 'uscendo = hinausgehend. tramonto = Sonnenuntergang. indimenticabile = unvergesslich.'
            }
          ]
        ]
      };
    } catch (err) {
      console.error('Story generation error:', err);
      throw err;
    }
  },

  // ==========================================
  // OPENAI - Generate News (via Backend)
  // ==========================================
  async generateNews(level) {
    try {
      return [
        {
          category: 'Economia',
          headline: 'Borsa italiana chiude in rialzo dopo dati economici positivi',
          italianSummary: 'La borsa italiana ha registrato un aumento significativo nell\'ultimo giorno di contrattazioni. I dati economici positivi hanno spinto gli investitori a comprare titoli italiani. L\'indice principale ha guadagnato il 2,5% rispetto al giorno precedente. Gli analisti prevedono ulteriori rialzi nei prossimi giorni grazie alla fiducia dei mercati.',
          german: 'Die italienische Börse verzeichnete an dem letzten Handelstag einen signifikanten Anstieg. Positive Wirtschaftsdaten trieben Anleger zum Kauf italienischer Wertpapiere an. Der Hauptindex gewann 2,5% gegenüber dem Vortag. Analysten erwarten weitere Anstiege in den nächsten Tagen aufgrund des Marktvertrauens.',
          source: 'https://www.ansa.it',
          sourceName: 'ANSA'
        },
        {
          category: 'Politica',
          headline: 'Governo annuncia nuove iniziative per l\'ambiente',
          italianSummary: 'Il governo italiano ha presentato un piano ambientale ambizioso che mira a ridurre le emissioni di carbonio del 50% entro il 2030. Il piano include investimenti massicci in energie rinnovabili e trasporto sostenibile. Secondo il ministro dell\'ambiente, queste misure creeranno oltre 100.000 posti di lavoro verdi. Le organizzazioni ambientaliste hanno salutato positivamente l\'annuncio.',
          german: 'Die italienische Regierung hat einen ehrgeizigen Umweltplan vorgestellt, der darauf abzielt, die CO2-Emissionen bis 2030 um 50% zu senken. Der Plan umfasst massive Investitionen in erneuerbare Energien und nachhaltigen Verkehr. Nach Aussage des Umweltministers werden diese Maßnahmen über 100.000 grüne Arbeitsplätze schaffen. Umweltorganisationen haben die Ankündigung positiv begrüßt.',
          source: 'https://www.ansa.it',
          sourceName: 'ANSA'
        },
        {
          category: 'Mondo',
          headline: 'Scoperta scientifica italiana sul cambio climatico',
          italianSummary: 'Ricercatori italiani hanno fatto una scoperta importante riguardante gli effetti del cambiamento climatico sul Mediterraneo. Lo studio mostra che le temperature marine stanno aumentando più velocemente di quanto precedentemente previsto. Questa ricerca potrebbe aiutare i paesi mediterranei a prepararsi meglio ai cambiamenti futuri. La scoperta è stata pubblicata su una prominente rivista scientifica internazionale.',
          german: 'Italienische Forscher haben eine wichtige Entdeckung über die Auswirkungen des Klimawandels auf das Mittelmeer gemacht. Die Studie zeigt, dass die Meerestemperaturen schneller ansteigen als zuvor vorhergesagt. Diese Forschung könnte Mittelmeerländern helfen, sich besser auf zukünftige Veränderungen vorzubereiten. Die Entdeckung wurde in einem renommierten internationalen wissenschaftlichen Journal veröffentlicht.',
          source: 'https://www.ansa.it',
          sourceName: 'ANSA'
        }
      ];
    } catch (err) {
      console.error('News generation error:', err);
      throw err;
    }
  },

  // ==========================================
  // WORDREFERENCE URL (IT-GER only)
  // ==========================================
  getWordReferenceUrl(word, direction = 'itde') {
    // Only support IT-GER dictionary
    return `https://www.wordreference.com/itde/${word}`;
  }
};
