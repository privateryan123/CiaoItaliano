/* ============================================
   Italiano Ogni Giorno — Main App Controller
   ============================================ */

const App = {
  currentView: 'sentences',
  currentVocabTab: 'sentences',
  currentVerbsTab: 'verbs',
  translationDir: 'de-it',
  _lastTranslation: null,

  // Sub-views that belong under the "more" tab
  SUB_VIEWS: ['library', 'vocabulary', 'settings'],
  // Main tab views matching bottom nav
  MAIN_VIEWS: ['sentences', 'story', 'news', 'verbs', 'translator', 'more'],

  // ==========================================
  // INITIALIZATION
  // ==========================================
  async init() {
    console.log('=== App.init() starting ===');
    
    console.log('1. Initializing I18n...');
    I18n.init();
    
    console.log('2. Applying theme...');
    applyTheme(Store.getTheme());
    
    console.log('3. Setting up navigation...');
    this.setupNav();
    
    console.log('4. Setting up word tap...');
    this.setupWordTap();
    
    console.log('4.5. Syncing vocabulary from server...');
    await Store.syncVocabularyFromServer();

    // Preload speech synthesis voices
    this._italianVoice = null;
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Find best Italian voice (prefer native Italian voices)
        this._italianVoice = voices.find(v => v.lang === 'it-IT') ||
                             voices.find(v => v.lang.startsWith('it')) ||
                             voices.find(v => v.name.toLowerCase().includes('italian'));
        console.log('Italian voice found:', this._italianVoice?.name || 'none');
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Determine initial view from hash
    const hash = (location.hash || '#sentences').replace('#', '');
    const validViews = [...this.MAIN_VIEWS, ...this.SUB_VIEWS];
    const initialView = validViews.includes(hash) ? hash : 'sentences';
    
    console.log('5. Initial view determined:', initialView);
    console.log('6. Switching to initial view...');
    this.switchView(initialView, false);
    console.log('7. View switched, updating history...');
    
    history.replaceState({ view: initialView }, '', `#${initialView}`);

    console.log('8. Registering service worker...');
    this.registerSW();

    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view) {
        this.switchView(e.state.view, false);
      }
    });
  },

  // ==========================================
  // NAVIGATION
  // ==========================================
  setupNav() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view, true);
      });
    });
  },

  switchView(viewName, pushState = true) {
    console.log('=== switchView called ===', { viewName, pushState });
    
    // Figure out which nav tab to highlight
    const navTab = this.SUB_VIEWS.includes(viewName) ? 'more' : viewName;
    console.log('Nav tab to highlight:', navTab);

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === navTab);
    });

    // Hide all views, show target
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewName}`);
    console.log('Target view element:', targetView);
    if (targetView) {
      targetView.classList.add('active');
      console.log('View activated:', viewName);
    } else {
      console.error('Target view not found:', `view-${viewName}`);
    }

    const subtitle = document.getElementById('header-subtitle');
    const today = getTodayDateStr();
    console.log('Today date string:', today);

    switch (viewName) {
      case 'sentences': {
        console.log('Rendering sentences view...');
        const currentDate = Store.getCurrentSentenceDate();
        let sentences = Store.getSentencesForDate(currentDate);
        
        // Auto-generate if no sentences exist for this date
        if (!sentences) {
          this.generateSentencesForDate(currentDate).then(generatedSentences => {
            Store.setSentencesForDate(currentDate, generatedSentences);
            Views.renderSentences(currentDate, generatedSentences);
          });
        } else {
          Views.renderSentences(currentDate, sentences);
        }
        
        subtitle.textContent = I18n.t('subtitleSentences');
        break;
      }
      case 'story': {
        console.log('Rendering story view...');
        const storyDate = Store.getCurrentStoryDate();
        let storyData = Store.getStoryForDate(storyDate);
        
        // If no story exists for this date, generate one
        if (!storyData) {
          AI.generateStory(Store.getSettings().level, Store.getSettings().topics).then(story => {
            Store.setStoryForDate(storyDate, story);
            Views.renderStory(storyDate, story);
          });
        } else {
          Views.renderStory(storyDate, storyData);
        }
        subtitle.textContent = I18n.t('subtitleStory');
        break;
      }
      case 'news': {
        console.log('Rendering news view...');
        const newsDate = Store.getCurrentNewsDate();
        let newsData = Store.getNewsForDate(newsDate);
        
        // If no news exists for this date, generate
        if (!newsData) {
          this.generateNewsForDate(newsDate).then(articles => {
            Store.setNewsForDate(newsDate, articles);
            Views.renderNews(newsDate, articles);
          });
        } else {
          Views.renderNews(newsDate, newsData);
        }
        subtitle.textContent = I18n.t('subtitleNews');
        break;
      }
      case 'verbs':
        console.log('Rendering verbs view...');
        const selectedVerb = Store.getSelectedVerb();
        Views.renderVerbs(selectedVerb, this.currentVerbsTab || 'verbs');
        subtitle.textContent = I18n.t('subtitleVerbs');
        break;
      case 'translator':
        console.log('Rendering translator view...');
        // Sync vocabulary in background to ensure fresh data
        Store.syncVocabularyFromServer().then(() => {
          if (this.currentView === 'translator') {
            Views.renderTranslator(this.currentTranslatorTab || 'translator', this.currentTranslatorSubTab || 'sentences');
          }
        });
        Views.renderTranslator(this.currentTranslatorTab || 'translator', this.currentTranslatorSubTab || 'sentences');
        subtitle.textContent = I18n.t('subtitleTranslator');
        break;
      case 'more':
        console.log('Rendering more view...');
        Views.renderMore();
        subtitle.textContent = I18n.t('subtitleMore');
        break;
      case 'library':
        console.log('Rendering library view...');
        Views.renderLibrary();
        subtitle.textContent = I18n.t('subtitleLibrary');
        break;
      case 'vocabulary':
        console.log('Rendering vocabulary view...');
        // Sync vocabulary in background to ensure fresh data
        Store.syncVocabularyFromServer().then(() => {
          if (this.currentView === 'vocabulary') {
            Views.renderVocabulary(this.currentVocabTab);
          }
        });
        Views.renderVocabulary(this.currentVocabTab);
        subtitle.textContent = I18n.t('subtitleVocabulary');
        break;
      case 'settings':
        console.log('Rendering settings view...');
        Views.renderSettings();
        subtitle.textContent = I18n.t('subtitleSettings');
        break;
    }

    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      history.pushState({ view: viewName }, '', `#${viewName}`);
    }
  },

  /** Navigate to a sub-view under the "More" tab */
  switchSubView(name) {
    this.switchView(name, true);
  },

  // ==========================================
  // STORY NAVIGATION
  // ==========================================
  storyPage(pageIndex) {
    const storyData = Views._currentStoryData;
    if (!storyData) return;

    const settings = Store.getSettings();
    Views._currentStoryPage = pageIndex;

    const storyPages = document.getElementById('story-pages');
    if (storyPages) {
      storyPages.innerHTML = Views.renderStoryPage(storyData, pageIndex, settings.showExplanations);
      document.getElementById('story-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  navigateSentences(direction) {
    const currentDate = Store.getCurrentSentenceDate();
    const date = new Date(currentDate);
    date.setDate(date.getDate() + direction);
    
    const newDateStr = date.toISOString().split('T')[0];
    const today = getTodayDateStr();
    
    // Don't navigate into the future
    if (newDateStr > today) return;
    
    Store.setCurrentSentenceDate(newDateStr);
    
    // Check if sentences exist for this date, if not generate
    let sentences = Store.getSentencesForDate(newDateStr);
    if (!sentences) {
      this.generateSentencesForDate(newDateStr).then(generatedSentences => {
        Store.setSentencesForDate(newDateStr, generatedSentences);
        Views.renderSentences(newDateStr, generatedSentences);
      });
    } else {
      Views.renderSentences(newDateStr, sentences);
    }
  },

  goToTodaySentences() {
    const today = getTodayDateStr();
    Store.setCurrentSentenceDate(today);
    let sentences = Store.getSentencesForDate(today);
    if (!sentences) {
      this.generateSentencesForDate(today).then(generatedSentences => {
        Store.setSentencesForDate(today, generatedSentences);
        Views.renderSentences(today, generatedSentences);
      });
    } else {
      Views.renderSentences(today, sentences);
    }
  },

  async generateSentencesForDate(dateStr) {
    const settings = Store.getSettings();
    return AI.generateSentences(settings.sentenceCount, settings.level, settings.topics);
  },

  navigateStory(direction) {
    const currentDate = Store.getCurrentStoryDate();
    const date = new Date(currentDate);
    date.setDate(date.getDate() + direction);
    
    const newDateStr = date.toISOString().split('T')[0];
    const today = getTodayDateStr();
    
    // Don't navigate into the future
    if (newDateStr > today) return;
    
    Store.setCurrentStoryDate(newDateStr);
    
    // Check if story exists for this date, if not generate one
    let story = Store.getStoryForDate(newDateStr);
    if (!story) {
      // Generate a new story for this date
      AI.generateStory(Store.getSettings().level, Store.getSettings().topics).then(storyData => {
        Store.setStoryForDate(newDateStr, storyData);
        Views.renderStory(newDateStr, storyData);
      });
    } else {
      Views.renderStory(newDateStr, story);
    }
  },

  goToTodayStory() {
    const today = getTodayDateStr();
    Store.setCurrentStoryDate(today);
    let story = Store.getStoryForDate(today);
    if (!story) {
      AI.generateStory(Store.getSettings().level, Store.getSettings().topics).then(storyData => {
        Store.setStoryForDate(today, storyData);
        Views.renderStory(today, storyData);
      });
    } else {
      Views.renderStory(today, story);
    }
  },

  navigateNews(direction) {
    const currentDate = Store.getCurrentNewsDate();
    const date = new Date(currentDate);
    date.setDate(date.getDate() + direction);
    
    const newDateStr = date.toISOString().split('T')[0];
    const today = getTodayDateStr();
    
    // Don't navigate into the future
    if (newDateStr > today) return;
    
    Store.setCurrentNewsDate(newDateStr);
    
    // Check if news exists for this date, if not generate
    let newsArticles = Store.getNewsForDate(newDateStr);
    if (!newsArticles) {
      // Generate news for this date
      this.generateNewsForDate(newDateStr).then(articles => {
        Store.setNewsForDate(newDateStr, articles);
        Views.renderNews(newDateStr, articles);
      });
    } else {
      Views.renderNews(newDateStr, newsArticles);
    }
  },

  toggleNewsCard(idx) {
    const card = document.querySelector(`.news-card[data-news-idx="${idx}"]`);
    if (card) {
      card.classList.toggle('expanded');
    }
  },

  async generateNewsForDate(dateStr) {
    // Generate complete news articles for a specific date
    const allNews = [
      {
        category: 'Politica',
        headline: 'Governo annuncia piano di riforme strutturali',
        url: 'https://www.ansa.it/',
        sentences: [
          { italian: 'Il governo italiano ha presentato oggi un ambizioso piano di riforme strutturali che toccherà diversi settori dell\'economia.', german: 'Die italienische Regierung hat heute einen ehrgeizigen Plan für Strukturreformen vorgestellt, der verschiedene Wirtschaftssektoren betreffen wird.' },
          { italian: 'Le misure principali riguardano la semplificazione burocratica, la digitalizzazione della pubblica amministrazione e incentivi per le piccole e medie imprese.', german: 'Die Hauptmaßnahmen betreffen den Bürokratieabbau, die Digitalisierung der öffentlichen Verwaltung und Anreize für kleine und mittlere Unternehmen.' },
          { italian: 'Il Ministro dell\'Economia ha sottolineato che queste riforme sono essenziali per aumentare la competitività del paese in Europa.', german: 'Der Wirtschaftsminister betonte, dass diese Reformen wesentlich sind, um die Wettbewerbsfähigkeit des Landes in Europa zu steigern.' },
          { italian: 'Le opposizioni hanno accolto il piano con cautela, chiedendo maggiori dettagli sui tempi di attuazione.', german: 'Die Opposition hat den Plan vorsichtig aufgenommen und um mehr Details zu den Umsetzungsfristen gebeten.' },
          { italian: 'Gli analisti economici prevedono che le riforme potrebbero portare a una crescita del PIL del 2% nei prossimi due anni.', german: 'Wirtschaftsanalysten prognostizieren, dass die Reformen in den nächsten zwei Jahren zu einem BIP-Wachstum von 2% führen könnten.' }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Mondo',
        headline: 'Conferenza internazionale sul clima conclude con accordi storici',
        url: 'https://www.ansa.it/',
        sentences: [
          { italian: 'La conferenza internazionale sul cambiamento climatico si è conclusa con la firma di accordi considerati storici da molti esperti.', german: 'Die internationale Klimakonferenz endete mit der Unterzeichnung von Abkommen, die von vielen Experten als historisch angesehen werden.' },
          { italian: 'Oltre 150 paesi hanno concordato di ridurre le emissioni di gas serra del 40% entro il 2035.', german: 'Über 150 Länder haben sich darauf geeinigt, die Treibhausgasemissionen bis 2035 um 40% zu reduzieren.' },
          { italian: 'I rappresentanti italiani hanno sottolineato l\'importanza della cooperazione internazionale per affrontare questa sfida globale.', german: 'Die italienischen Vertreter betonten die Bedeutung der internationalen Zusammenarbeit zur Bewältigung dieser globalen Herausforderung.' },
          { italian: 'Sarà istituito un fondo di 500 miliardi di dollari per aiutare i paesi in via di sviluppo nella transizione verde.', german: 'Es wird ein Fonds von 500 Milliarden Dollar eingerichtet, um Entwicklungsländern beim grünen Übergang zu helfen.' },
          { italian: 'Le organizzazioni ambientaliste hanno definito l\'accordo un passo importante, ma chiedono azioni più rapide e concrete.', german: 'Umweltorganisationen haben das Abkommen als wichtigen Schritt bezeichnet, fordern aber schnellere und konkretere Maßnahmen.' }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Mondo',
        headline: 'Nuova scoperta archeologica svela segreti dell\'antica Roma',
        url: 'https://www.ansa.it/',
        sentences: [
          { italian: 'Archeologi italiani hanno fatto una scoperta straordinaria durante gli scavi nel centro di Roma.', german: 'Italienische Archäologen haben bei Ausgrabungen im Zentrum Roms eine außergewöhnliche Entdeckung gemacht.' },
          { italian: 'Sono stati rinvenuti i resti di un antico tempio romano risalente al II secolo d.C., insieme a numerosi manufatti ben conservati.', german: 'Es wurden die Überreste eines antiken römischen Tempels aus dem 2. Jahrhundert n. Chr. zusammen mit zahlreichen gut erhaltenen Artefakten gefunden.' },
          { italian: 'Tra gli oggetti trovati ci sono statue di marmo, monete d\'oro e iscrizioni che potrebbero riscrivere parte della storia romana.', german: 'Unter den gefundenen Objekten befinden sich Marmorstatuen, Goldmünzen und Inschriften, die Teile der römischen Geschichte umschreiben könnten.' },
          { italian: 'Il Ministro della Cultura ha annunciato che i reperti saranno esposti al pubblico in un museo speciale entro l\'anno prossimo.', german: 'Der Kulturminister kündigte an, dass die Funde bis nächstes Jahr in einem speziellen Museum der Öffentlichkeit zugänglich gemacht werden.' },
          { italian: 'Gli esperti ritengono che questa scoperta sia una delle più importanti degli ultimi decenni per comprendere la vita quotidiana nell\'antica Roma.', german: 'Experten halten diese Entdeckung für eine der wichtigsten der letzten Jahrzehnte zum Verständnis des täglichen Lebens im antiken Rom.' }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Sport',
        headline: 'Tennis: Sinner vince torneo internazionale prestigioso',
        url: 'https://www.ansa.it/',
        sentences: [
          { italian: 'Il tennista italiano Jannik Sinner ha conquistato uno dei tornei più prestigiosi della stagione con una prestazione eccezionale.', german: 'Der italienische Tennisspieler Jannik Sinner hat eines der prestigeträchtigsten Turniere der Saison mit einer außergewöhnlichen Leistung gewonnen.' },
          { italian: 'In finale ha sconfitto il numero uno del ranking mondiale in tre set combattuti, dimostrando grande determinazione e talento.', german: 'Im Finale besiegte er die Nummer eins der Weltrangliste in drei hart umkämpften Sätzen und zeigte große Entschlossenheit und Talent.' },
          { italian: 'Con questa vittoria, Sinner sale al terzo posto della classifica mondiale, il miglior risultato di sempre per un tennista italiano.', german: 'Mit diesem Sieg steigt Sinner auf den dritten Platz der Weltrangliste, das beste Ergebnis aller Zeiten für einen italienischen Tennisspieler.' },
          { italian: 'Il pubblico italiano ha festeggiato con entusiasmo questo trionfo, vedendo in Sinner il futuro del tennis nazionale.', german: 'Das italienische Publikum feierte diesen Triumph begeistert und sieht in Sinner die Zukunft des nationalen Tennis.' },
          { italian: 'L\'allenatore ha dichiarato che Sinner ha ancora margini di miglioramento e può puntare al primo posto mondiale nei prossimi mesi.', german: 'Der Trainer erklärte, dass Sinner noch Verbesserungspotenzial hat und in den kommenden Monaten auf den ersten Platz der Weltrangliste abzielen kann.' }
        ],
        scrapedAt: new Date().toISOString()
      },
      {
        category: 'Economia',
        headline: 'Settore tecnologico italiano registra crescita record',
        url: 'https://www.ansa.it/',
        sentences: [
          { italian: 'Il settore tecnologico italiano ha registrato una crescita record nell\'ultimo trimestre, superando tutte le previsioni degli analisti.', german: 'Der italienische Technologiesektor verzeichnete im letzten Quartal ein Rekordwachstum und übertraf alle Prognosen der Analysten.' },
          { italian: 'Le startup innovative italiane hanno attratto investimenti stranieri per oltre 3 miliardi di euro, un dato mai visto prima.', german: 'Innovative italienische Startups zogen ausländische Investitionen von über 3 Milliarden Euro an, ein noch nie dagewesener Wert.' },
          { italian: 'Milano si conferma come hub tecnologico principale, ma anche città come Torino e Bologna stanno emergendo come centri innovativi.', german: 'Mailand bestätigt sich als wichtigster Technologie-Hub, aber auch Städte wie Turin und Bologna entwickeln sich zu innovativen Zentren.' },
          { italian: 'I settori più promettenti sono l\'intelligenza artificiale, la cybersecurity e le tecnologie green per la sostenibilità ambientale.', german: 'Die vielversprechendsten Sektoren sind künstliche Intelligenz, Cybersicherheit und grüne Technologien für ökologische Nachhaltigkeit.' },
          { italian: 'Gli esperti prevedono che questa tendenza continuerà, creando migliaia di nuovi posti di lavoro qualificati nel settore tech italiano.', german: 'Experten prognostizieren, dass sich dieser Trend fortsetzen wird und Tausende neuer qualifizierter Arbeitsplätze im italienischen Tech-Sektor geschaffen werden.' }
        ],
        scrapedAt: new Date().toISOString()
      }
    ];
    
    // Randomly shuffle and select 5 articles
    const shuffled = allNews.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  },

  // ==========================================
  // TRANSLATOR
  // ==========================================
  setTranslationDir(dir) {
    this.translationDir = dir;
    document.querySelectorAll('.translator-lang').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === dir);
    });
  },

  async doTranslate() {
    const input = document.getElementById('translator-input');
    const text = (input.value || '').trim();
    if (!text) {
      this.showToast(I18n.t('pleaseEnterText'));
      return;
    }

    const btn = document.getElementById('translator-btn');
    const btnText = document.getElementById('translator-btn-text');
    const correctionDiv = document.getElementById('translator-correction');
    btn.disabled = true;
    btnText.textContent = I18n.currentLang === 'en' ? 'Translating…' : 'Übersetze…';
    correctionDiv.style.display = 'none';

    try {
      const [from, to] = this.translationDir === 'de-it' ? ['de', 'it'] : ['it', 'de'];
      
      let correctedItalian = null;
      let correction = null;
      
      // If user entered Italian text, check grammar first
      if (from === 'it') {
        const grammarCheck = await AI.checkItalianGrammar(text);
        if (grammarCheck && grammarCheck.hasErrors) {
          correction = grammarCheck;
          correctedItalian = grammarCheck.corrected;
        }
      }
      
      // Translate the text (use corrected version if available for better translation)
      const textToTranslate = correctedItalian || text;
      const result = await AI.translate(textToTranslate, from, to);

      // Store translation data - always keep track of which is Italian
      this._lastTranslation = {
        original: text,
        translated: result,
        correctedItalian: correctedItalian,
        italian: from === 'it' ? (correctedItalian || text) : result,
        german: from === 'de' ? text : result,
        from,
        to
      };

      // Show correction if found
      if (correction) {
        const corrLabel = I18n.currentLang === 'en' ? 'Correction' : 'Korrektur';
        correctionDiv.innerHTML = `
          <div style="padding: 12px; background: var(--warning-bg, #fff3cd); border-radius: 8px; border-left: 4px solid var(--warning, #ffc107); margin-bottom: var(--space-sm);">
            <div style="font-weight: 600; color: var(--warning-text, #856404); margin-bottom: 4px;">⚠️ ${corrLabel}</div>
            <div style="margin-bottom: 8px;">
              <span style="text-decoration: line-through; color: var(--text-tertiary);">${text}</span>
            </div>
            <div style="font-weight: 600; color: var(--text-primary);">
              ✓ ${correction.corrected}
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">
              ${correction.explanation}
            </div>
            <button onclick="App.useCorrection('${this.esc(correction.corrected)}')" 
              style="margin-top: 8px; padding: 6px 12px; background: var(--accent); color: white; border: none; border-radius: 6px; font-size: 0.85rem; cursor: pointer;">
              ${I18n.currentLang === 'en' ? 'Use corrected version' : 'Korrigierte Version verwenden'}
            </button>
          </div>`;
        correctionDiv.style.display = 'block';
      }

      const resultDiv = document.getElementById('translator-result');
      const resultText = document.getElementById('translator-result-text');
      const flag = to === 'it' ? '🇮🇹' : '🇩🇪';
      const langLabel = to === 'it' 
        ? (I18n.currentLang === 'en' ? 'Italian' : 'Italienisch') 
        : (I18n.currentLang === 'en' ? 'German' : 'Deutsch');
      resultText.innerHTML = `<span style="color: var(--text-tertiary); font-size: 0.8rem;">${flag} ${langLabel}:</span><br><strong>${result}</strong>`;
      resultDiv.style.display = 'block';
    } catch (err) {
      this.showToast(I18n.t('translationFailed') + ': ' + err.message);
    } finally {
      btn.disabled = false;
      btnText.textContent = I18n.t('translate');
    }
  },

  useCorrection(correctedText) {
    const input = document.getElementById('translator-input');
    input.value = correctedText;
    document.getElementById('translator-correction').style.display = 'none';
    // Re-translate with corrected text
    this.doTranslate();
  },

  async saveTranslation() {
    if (!this._lastTranslation) return;
    const { italian, german } = this._lastTranslation;
    
    if (!italian || !german) {
      this.showToast(I18n.t('translationFailed'));
      return;
    }
    
    const added = await Store.saveSentence(italian, german);
    this.showToast(added ? I18n.t('translationSaved') : I18n.t('alreadySaved'));
    
    // Update dictionary count in tab if visible
    if (this.currentTranslatorTab === 'dictionary') {
      Views.renderTranslator('dictionary', this.currentTranslatorSubTab || 'sentences');
    }
  },

  quickTranslate(text) {
    const input = document.getElementById('translator-input');
    input.value = text;
    this.setTranslationDir('de-it');
    this.doTranslate();
  },

  // ==========================================
  // VERBS
  // ==========================================
  changeVerb(verbKey) {
    Store.setSelectedVerb(verbKey);
    Views.renderVerbs(verbKey, this.currentVerbsTab || 'verbs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  changeSentencesTopic(topicKey) {
    Store.setSelectedSentencesTopic(topicKey);
    Views.renderVerbs(Store.getSelectedVerb(), 'sentences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  changePreposition(prepositionKey) {
    Store.setSelectedPreposition(prepositionKey);
    Views.renderVerbs(Store.getSelectedVerb(), 'prepositions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  verbTab(tab) {
    this.currentVerbsTab = tab;
    Views.renderVerbs(Store.getSelectedVerb(), tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // NUMBER CONVERTER
  // ==========================================
  convertNumber() {
    const input = document.getElementById('number-converter-input');
    const resultDiv = document.getElementById('number-converter-result');
    const italianDiv = document.getElementById('number-italian');
    const valueDiv = document.getElementById('number-value');
    
    const num = parseInt(input.value, 10);
    if (isNaN(num) || num < 0 || num > 999999999999) {
      resultDiv.style.display = 'none';
      return;
    }
    
    const italian = this.numberToItalian(num);
    valueDiv.textContent = num.toLocaleString();
    italianDiv.textContent = italian;
    resultDiv.style.display = 'block';
    
    // Update save button state
    const saveBtn = document.getElementById('number-save-btn');
    if (saveBtn) {
      const isSaved = Store.isWordSaved(italian);
      saveBtn.textContent = isSaved ? '✓' : '🔖';
      saveBtn.style.color = isSaved ? 'var(--accent)' : 'var(--text-secondary)';
    }
  },

  async saveConvertedNumber() {
    const italianDiv = document.getElementById('number-italian');
    const valueDiv = document.getElementById('number-value');
    if (!italianDiv || !valueDiv) return;
    
    const italian = italianDiv.textContent;
    const german = valueDiv.textContent;
    
    const isSaved = Store.isWordSaved(italian);
    if (isSaved) {
      await Store.removeWord(italian);
      this.showToast(I18n.t('wordRemoved'));
    } else {
      await Store.saveWord(italian, german);
      this.showToast(I18n.t('wordSaved'));
    }
    
    // Update button state
    const saveBtn = document.getElementById('number-save-btn');
    if (saveBtn) {
      const nowSaved = Store.isWordSaved(italian);
      saveBtn.textContent = nowSaved ? '✓' : '🔖';
      saveBtn.style.color = nowSaved ? 'var(--accent)' : 'var(--text-secondary)';
    }
  },

  numberToItalian(n) {
    if (n === 0) return 'zero';
    
    const units = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove'];
    const teens = ['dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
    const tens = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
    
    const convertUnder1000 = (num) => {
      if (num === 0) return '';
      if (num < 10) return units[num];
      if (num < 20) return teens[num - 10];
      if (num < 100) {
        const t = Math.floor(num / 10);
        const u = num % 10;
        let result = tens[t];
        // Drop last vowel before uno/otto
        if (u === 1 || u === 8) {
          result = result.slice(0, -1);
        }
        result += units[u];
        return result;
      }
      // 100-999
      const h = Math.floor(num / 100);
      const rest = num % 100;
      let result = h === 1 ? 'cento' : units[h] + 'cento';
      if (rest > 0) {
        // Drop 'o' from cento before otto/ottanta
        if (rest >= 80 && rest < 90 || rest === 8) {
          result = result.slice(0, -1);
        }
        result += convertUnder1000(rest);
      }
      return result;
    };
    
    if (n < 1000) return convertUnder1000(n);
    
    if (n < 1000000) {
      const thousands = Math.floor(n / 1000);
      const rest = n % 1000;
      let result = thousands === 1 ? 'mille' : convertUnder1000(thousands) + 'mila';
      if (rest > 0) result += convertUnder1000(rest);
      return result;
    }
    
    if (n < 1000000000) {
      const millions = Math.floor(n / 1000000);
      const rest = n % 1000000;
      let result = millions === 1 ? 'un milione' : convertUnder1000(millions) + ' milioni';
      if (rest > 0) result += ' ' + this.numberToItalian(rest);
      return result;
    }
    
    // Billions
    const billions = Math.floor(n / 1000000000);
    const rest = n % 1000000000;
    let result = billions === 1 ? 'un miliardo' : convertUnder1000(billions) + ' miliardi';
    if (rest > 0) result += ' ' + this.numberToItalian(rest);
    return result;
  },

  // ==========================================
  // WORDREFERENCE
  // ==========================================
  lookupWordReference() {
    const input = document.getElementById('wr-input');
    const word = (input.value || '').trim();
    if (!word) {
      this.showToast(I18n.t('pleaseEnterWord'));
      return;
    }
    const url = AI.getWordReferenceUrl(word);
    window.open(url, '_blank');
  },

  // ==========================================
  // LIBRARY
  // ==========================================
  openLibraryDay(dateStr) {
    Views.renderLibraryDay(dateStr);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showLibrary() {
    Views.renderLibrary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // WORD TAP & POPUP
  // ==========================================
  _popupData: null,

  setupWordTap() {
    document.addEventListener('click', (e) => {
      const word = e.target.closest('.tappable-word');
      if (word) {
        e.preventDefault();
        e.stopPropagation();
        this.showWordPopup(word);
      }
    });

    document.getElementById('popup-close').addEventListener('click', () => this.hideWordPopup());
    document.getElementById('popup-speak').addEventListener('click', () => {
      if (this._popupData) {
        this.speakItalian(this._popupData.word);
      }
    });
    document.getElementById('word-popup-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.hideWordPopup();
    });

    document.getElementById('popup-save-word').addEventListener('click', async () => {
      if (this._popupData) {
        const word = this._popupData.word;
        
        // Save word - API will lookup WordReference and get translation
        const result = await Store.saveWord(word, null);
        this.hideWordPopup();
        this.showToast(result ? I18n.t('wordSaved') : I18n.t('alreadySaved'));
      }
    });
    document.getElementById('popup-save-sentence').addEventListener('click', async () => {
      if (this._popupData) {
        const added = await Store.saveSentence(this._popupData.sentence, this._popupData.translation);
        this.hideWordPopup();
        this.showToast(added ? I18n.t('sentenceSaved') : I18n.t('alreadySaved'));
        this.refreshSaveButtons();
      }
    });
  },

  showWordPopup(el) {
    const word = el.dataset.word;
    const sentence = el.dataset.sentence;
    const translation = el.dataset.translation;

    this._popupData = { word, sentence, translation };

    document.getElementById('popup-word').textContent = word;
    document.getElementById('popup-context').textContent = sentence;
    document.getElementById('popup-translation').textContent = translation ? '🇩🇪 ' + translation : '';

    // WordReference link in popup
    const wrLink = document.getElementById('popup-wr-link');
    if (wrLink) {
      wrLink.href = AI.getWordReferenceUrl(word);
      wrLink.style.display = 'inline-block';
    }

    const wordBtn = document.getElementById('popup-save-word');
    const sentBtn = document.getElementById('popup-save-sentence');
    if (Store.isWordSaved(word)) {
      wordBtn.textContent = '✓ ' + I18n.t('word');
      wordBtn.style.opacity = '0.6';
    } else {
      wordBtn.textContent = '💬 ' + I18n.t('word');
      wordBtn.style.opacity = '1';
    }
    if (Store.isSentenceSaved(sentence)) {
      sentBtn.textContent = '✓ ' + I18n.t('sentence');
      sentBtn.style.opacity = '0.6';
    } else {
      sentBtn.textContent = '🔖 ' + I18n.t('sentence');
      sentBtn.style.opacity = '1';
    }

    document.getElementById('word-popup-overlay').classList.add('visible');
  },

  hideWordPopup() {
    document.getElementById('word-popup-overlay').classList.remove('visible');
    this._popupData = null;
  },

  // ==========================================
  // TEXT-TO-SPEECH
  // ==========================================
  speakItalian(text) {
    if (!text) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1.0;
    
    // Use cached Italian voice, or try to find one
    if (this._italianVoice) {
      utterance.voice = this._italianVoice;
    } else {
      // Try to find Italian voice now
      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find(v => v.lang === 'it-IT') ||
                           voices.find(v => v.lang.startsWith('it')) ||
                           voices.find(v => v.name.toLowerCase().includes('italian'));
      if (italianVoice) {
        utterance.voice = italianVoice;
        this._italianVoice = italianVoice;
      }
    }
    
    // Small delay to ensure voice is applied (helps on some browsers)
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  },

  // ==========================================
  // VOCABULARY ACTIONS
  // ==========================================
  async saveSentence(italian, german) {
    console.log('saveSentence called:', { italian, german });
    const added = await Store.saveSentence(italian, german);
    console.log('saveSentence result:', added);
    this.showToast(added ? I18n.t('sentenceSaved') : I18n.t('alreadySaved'));
    this.refreshSaveButtons();
    
    // Refresh dictionary view if currently showing it
    if (this.currentView === 'translator' && this.currentTranslatorTab === 'dictionary') {
      Views.renderTranslator('dictionary', this.currentTranslatorSubTab || 'sentences');
    } else if (this.currentView === 'vocabulary') {
      Views.renderVocabulary(this.currentVocabTab);
    }
  },

  async saveWord(italian, german) {
    console.log('saveWord called:', { italian, german });
    const result = await Store.saveWord(italian, german);
    console.log('saveWord result:', result);
    this.showToast(result ? I18n.t('wordSaved') : I18n.t('alreadySaved'));
    
    // Refresh dictionary view if currently showing it
    if (this.currentView === 'translator' && this.currentTranslatorTab === 'dictionary') {
      Views.renderTranslator('dictionary', this.currentTranslatorSubTab || 'words');
    } else if (this.currentView === 'vocabulary') {
      Views.renderVocabulary(this.currentVocabTab);
    }
  },

  async removeSentence(italian) {
    await Store.removeSentence(italian);
    // Check which view is currently active
    if (this.currentView === 'translator') {
      Views.renderTranslator('dictionary', 'sentences');
    } else {
      Views.renderVocabulary('sentences');
    }
    this.showToast(I18n.t('sentenceRemoved'));
  },

  async removeWord(italian) {
    await Store.removeWord(italian);
    // Check which view is currently active
    if (this.currentView === 'translator') {
      Views.renderTranslator('dictionary', 'words');
    } else {
      Views.renderVocabulary('words');
    }
    this.showToast(I18n.t('wordRemoved'));
  },

  vocabTab(tab) {
    this.currentVocabTab = tab;
    Views.renderVocabulary(tab);
  },

  translatorTab(tab) {
    this.currentTranslatorTab = tab;
    // Reset sub-tab when switching main tabs
    if (tab === 'dictionary') {
      this.currentTranslatorSubTab = this.currentTranslatorSubTab || 'sentences';
    }
    Views.renderTranslator(tab, this.currentTranslatorSubTab || 'sentences');
  },

  translatorSubTab(subTab) {
    this.currentTranslatorSubTab = subTab;
    Views.renderTranslator(this.currentTranslatorTab || 'dictionary', subTab);
  },

  // ==========================================
  // QUIZ FUNCTIONS
  // ==========================================
  quizSettings: { type: 'both', count: 10 },
  quizState: null,

  showQuizSettings() {
    Views.renderQuizSettings();
  },

  setQuizType(type) {
    this.quizSettings.type = type;
    // Reset count if it exceeds available items
    const vocab = Store.getVocabulary();
    const maxItems = type === 'sentences' ? vocab.sentences.length : 
                     type === 'words' ? vocab.words.length : 
                     vocab.sentences.length + vocab.words.length;
    if (this.quizSettings.count !== 'all' && this.quizSettings.count > maxItems) {
      this.quizSettings.count = maxItems > 0 ? Math.min(10, maxItems) : 5;
    }
    Views.renderQuizSettings();
  },

  setQuizCount(count) {
    this.quizSettings.count = count;
    Views.renderQuizSettings();
  },

  startQuiz() {
    const vocab = Store.getVocabulary();
    let items = [];
    
    if (this.quizSettings.type === 'words' || this.quizSettings.type === 'both') {
      items = items.concat(vocab.words.map(w => ({ ...w, type: 'word' })));
    }
    if (this.quizSettings.type === 'sentences' || this.quizSettings.type === 'both') {
      items = items.concat(vocab.sentences.map(s => ({ ...s, type: 'sentence' })));
    }
    
    if (items.length === 0) {
      this.showToast(I18n.t('noItemsToQuiz'));
      return;
    }
    
    // Shuffle items
    items = this.shuffleArray(items);
    
    // Limit count
    const count = this.quizSettings.count === 'all' ? items.length : Math.min(this.quizSettings.count, items.length);
    items = items.slice(0, count);
    
    this.quizState = {
      items,
      currentIndex: 0,
      currentItem: items[0],
      questionLang: Math.random() < 0.5 ? 'italian' : 'german',
      score: { correct: 0, wrong: 0 },
      answered: false,
      userAnswer: '',
      isCorrect: false,
      typoPositions: [],
      history: []
    };
    
    Views.renderQuiz(this.quizState);
  },

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  submitQuizAnswer() {
    const input = document.getElementById('quiz-answer-input');
    if (!input) return;
    
    const userAnswer = input.value.trim();
    if (!userAnswer) {
      this.showToast(I18n.t('pleaseEnterAnswer'));
      return;
    }
    
    const { currentItem, questionLang } = this.quizState;
    const correctAnswer = questionLang === 'italian' ? currentItem.german : currentItem.italian;
    
    // Check answer with typo tolerance
    const { isCorrect, typoPositions } = this.checkAnswer(userAnswer, correctAnswer);
    
    this.quizState.answered = true;
    this.quizState.userAnswer = userAnswer;
    this.quizState.isCorrect = isCorrect;
    this.quizState.typoPositions = typoPositions;
    
    if (isCorrect) {
      this.quizState.score.correct++;
    } else {
      this.quizState.score.wrong++;
    }
    
    // Save to history
    this.quizState.history.push({
      question: questionLang === 'italian' ? currentItem.italian : currentItem.german,
      questionLang,
      correctAnswer,
      userAnswer,
      isCorrect,
      typoPositions
    });
    
    Views.renderQuiz(this.quizState);
  },

  checkAnswer(userAnswer, correctAnswer) {
    // Normalize for comparison
    const normalizeStr = (str) => str.toLowerCase().trim()
      .replace(/[.,!?;:'"„""''«»]/g, '')
      .replace(/\s+/g, ' ');
    
    const userNorm = normalizeStr(userAnswer);
    const correctNorm = normalizeStr(correctAnswer);
    
    // Exact match
    if (userNorm === correctNorm) {
      return { isCorrect: true, typoPositions: [] };
    }
    
    // Calculate Levenshtein distance for typo tolerance
    const distance = this.levenshteinDistance(userNorm, correctNorm);
    const maxLen = Math.max(userNorm.length, correctNorm.length);
    const similarity = 1 - (distance / maxLen);
    
    // Allow typos: 90% similarity or max 2 character errors for short strings
    const isCorrect = similarity >= 0.9 || (maxLen <= 10 && distance <= 1) || (maxLen <= 20 && distance <= 2);
    
    // Find typo positions
    const typoPositions = this.findTypoPositions(userAnswer, correctAnswer);
    
    return { isCorrect, typoPositions };
  },

  levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
    
    return dp[m][n];
  },

  findTypoPositions(userAnswer, correctAnswer) {
    const positions = [];
    const userLower = userAnswer.toLowerCase();
    const correctLower = correctAnswer.toLowerCase();
    const minLen = Math.min(userLower.length, correctLower.length);
    
    for (let i = 0; i < userLower.length; i++) {
      if (i >= correctLower.length || userLower[i] !== correctLower[i]) {
        positions.push(i);
      }
    }
    
    return positions;
  },

  nextQuizQuestion() {
    this.quizState.currentIndex++;
    
    if (this.quizState.currentIndex >= this.quizState.items.length) {
      // Quiz complete
      Views.renderQuizResults(this.quizState);
      return;
    }
    
    this.quizState.currentItem = this.quizState.items[this.quizState.currentIndex];
    this.quizState.questionLang = Math.random() < 0.5 ? 'italian' : 'german';
    this.quizState.answered = false;
    this.quizState.userAnswer = '';
    this.quizState.isCorrect = false;
    this.quizState.typoPositions = [];
    
    Views.renderQuiz(this.quizState);
  },

  exitQuiz() {
    this.quizState = null;
    this.translatorTab('dictionary');
  },

  refreshSaveButtons() {
    document.querySelectorAll('.save-btn').forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes('saveSentence')) {
        const match = onclickAttr.match(/saveSentence\('(.+?)'/);
        if (match) {
          const italian = match[1].replace(/\\'/g, "'");
          btn.classList.toggle('saved', Store.isSentenceSaved(italian));
        }
      }
    });
  },

  // ==========================================
  // SETTINGS ACTIONS
  // ==========================================
  setLevel(level) {
    const settings = Store.getSettings();
    const oldLevel = settings.level;
    settings.level = level;
    Store.saveSettings(settings);
    Views.renderSettings();
    this.showToast(`${I18n.t('levelSetTo')} ${level}`);
    
    // If level changed, regenerate content for today
    if (oldLevel !== level) {
      this.regenerateContentForToday(level);
    }
  },

  async regenerateContentForToday(level) {
    const today = getTodayDateStr();
    const settings = Store.getSettings();
    
    // Clear caches
    ContentAPI.clearCache();
    
    // Show loading toast
    this.showToast(I18n.t('regeneratingContent') || 'Regenerating content...');
    
    try {
      // Generate new sentences with the new level
      const newSentences = await AI.generateSentences(settings.sentenceCount, level, settings.topics);
      Store.setSentencesForDate(today, newSentences);
      
      // Generate new story with the new level
      const newStory = await AI.generateStory(level, settings.topics);
      Store.setStoryForDate(today, newStory);
      
      // Save to blob storage
      await ContentAPI.saveContent({
        date: today,
        sentences: newSentences,
        story: newStory
      });
      
      // Refresh the current view if it's content-related
      if (this.currentView === 'sentences') {
        Views.renderSentences(today, newSentences);
      } else if (this.currentView === 'story') {
        Views.renderStory(today, newStory);
      }
      
      this.showToast(I18n.t('contentRegenerated') || 'Content regenerated!');
    } catch (error) {
      console.error('Failed to regenerate content:', error);
      this.showToast(I18n.t('regenerationFailed') || 'Failed to regenerate content');
    }
  },

  setSentenceCount(n) {
    const settings = Store.getSettings();
    settings.sentenceCount = n;
    Store.saveSettings(settings);
    Views.renderSettings();
    this.showToast(`${n} ${I18n.t('sentencesPerDaySet')}`);
  },

  toggleTopic(topicId) {
    const settings = Store.getSettings();
    const idx = settings.topics.indexOf(topicId);
    if (idx >= 0) {
      settings.topics.splice(idx, 1);
    } else {
      settings.topics.push(topicId);
    }
    Store.saveSettings(settings);
    Views.renderSettings();
  },

  toggleExplanations() {
    const settings = Store.getSettings();
    settings.showExplanations = !settings.showExplanations;
    Store.saveSettings(settings);
    Views.renderSettings();
    const msg = settings.showExplanations 
      ? I18n.t('explanationsShown')
      : I18n.t('explanationsHidden');
    this.showToast(msg);
  },

  setTheme(theme) {
    Store.setTheme(theme);
    Views.renderSettings();
    const themeLabels = {
      light: I18n.t('themeLight'),
      dark: I18n.t('themeDark'),
      auto: I18n.t('themeAuto')
    };
    this.showToast(`${I18n.t('theme')}: ${themeLabels[theme]}`);
  },

  setLanguage(lang) {
    I18n.setLanguage(lang);
    Views.renderSettings();
    // Refresh current view
    this.switchView(this.currentView, false);
    const msg = lang === 'en' ? 'Language: English' : 'Sprache: Deutsch';
    this.showToast(msg);
  },

  async clearDictionaryCache() {
    Store.clearVocabularyCache();
    // Re-sync from server
    await Store.syncVocabularyFromServer();
    Views.renderSettings();
    this.showToast(I18n.t('dictionaryCacheCleared'));
  },

  // ==========================================
  // TOAST NOTIFICATION
  // ==========================================
  showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  },

  // ==========================================
  // SERVICE WORKER
  // ==========================================
  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
    }
  }
};

// ==========================================
// BOOT
// ==========================================
console.log('=== BOOT: Script loaded ===');
console.log('Current date:', new Date());
console.log('Checking if DAILY_CONTENT exists:', typeof DAILY_CONTENT !== 'undefined');
if (typeof DAILY_CONTENT !== 'undefined') {
  console.log('Available dates in DAILY_CONTENT:', Object.keys(DAILY_CONTENT));
  console.log('Today date string:', getTodayDateStr ? getTodayDateStr() : 'getTodayDateStr not defined');
  if (getTodayDateStr) {
    const today = getTodayDateStr();
    console.log('Content for today (' + today + '):', getContentForDate ? getContentForDate(today) : 'getContentForDate not defined');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('=== DOMContentLoaded fired ===');
  console.log('Calling App.init()...');
  App.init();
  console.log('App.init() completed');
});
