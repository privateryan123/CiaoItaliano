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
  init() {
    console.log('=== App.init() starting ===');
    
    console.log('1. Initializing I18n...');
    I18n.init();
    
    console.log('2. Applying theme...');
    applyTheme(Store.getTheme());
    
    console.log('3. Setting up navigation...');
    this.setupNav();
    
    console.log('4. Setting up word tap...');
    this.setupWordTap();

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
        Views.renderTranslator(this.currentTranslatorTab || 'sentences');
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
    btn.disabled = true;
    btnText.textContent = I18n.currentLang === 'en' ? 'Translating…' : 'Übersetze…';

    try {
      const [from, to] = this.translationDir === 'de-it' ? ['de', 'it'] : ['it', 'de'];
      const result = await AI.translate(text, from, to);

      this._lastTranslation = {
        original: text,
        translated: result,
        from,
        to
      };

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

  saveTranslation() {
    if (!this._lastTranslation) return;
    const { original, translated, from, to } = this._lastTranslation;
    const italian = from === 'it' ? original : translated;
    const german = from === 'de' ? original : translated;
    const added = Store.saveSentence(italian, german);
    this.showToast(added ? I18n.t('translationSaved') : I18n.t('alreadySaved'));
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

  verbTab(tab) {
    this.currentVerbsTab = tab;
    Views.renderVerbs(Store.getSelectedVerb(), tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.getElementById('word-popup-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.hideWordPopup();
    });

    document.getElementById('popup-save-word').addEventListener('click', async () => {
      if (this._popupData) {
        const word = this._popupData.word;
        
        // Translate only the single word, not the whole sentence
        const wordTranslation = await AI.translate(word, 'it', 'de');
        
        const added = Store.saveWord(word, wordTranslation);
        this.hideWordPopup();
        this.showToast(added ? I18n.t('wordSaved') : I18n.t('alreadySaved'));
      }
    });
    document.getElementById('popup-save-sentence').addEventListener('click', () => {
      if (this._popupData) {
        const added = Store.saveSentence(this._popupData.sentence, this._popupData.translation);
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
  // VOCABULARY ACTIONS
  // ==========================================
  saveSentence(italian, german) {
    const added = Store.saveSentence(italian, german);
    this.showToast(added ? I18n.t('sentenceSaved') : I18n.t('alreadySaved'));
    this.refreshSaveButtons();
  },

  saveWord(italian, german) {
    const added = Store.saveWord(italian, german);
    this.showToast(added ? I18n.t('wordSaved') : I18n.t('alreadySaved'));
  },

  removeSentence(italian) {
    Store.removeSentence(italian);
    // Check which view is currently active
    if (this.currentView === 'translator') {
      Views.renderTranslator('sentences');
    } else {
      Views.renderVocabulary('sentences');
    }
    this.showToast(I18n.t('sentenceRemoved'));
  },

  removeWord(italian) {
    Store.removeWord(italian);
    // Check which view is currently active
    if (this.currentView === 'translator') {
      Views.renderTranslator('words');
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
    Views.renderTranslator(tab);
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
    settings.level = level;
    Store.saveSettings(settings);
    Views.renderSettings();
    this.showToast(`${I18n.t('levelSetTo')} ${level}`);
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
