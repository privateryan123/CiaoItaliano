/* ============================================
   Italiano Ogni Giorno — Internationalization
   ============================================ */

const I18n = {
  currentLang: 'en',

  translations: {
    en: {
      // Header
      appTitle: 'Italiano Ogni Giorno',
      appSubtitle: 'Your daily companion for Italian',
      
      // Navigation
      navSentences: 'Sentences',
      navStory: 'Story',
      navNews: 'News',
      navVerbs: 'Verbs',
      navTranslate: 'Translate',
      navMore: 'More',
      
      // Sentences View
      dailySentences: 'Daily Sentences',
      noSentencesAvailable: 'No sentences available for this day.',
      previousDay: 'Previous day',
      nextDay: 'Next day',
      saveSentence: 'Save sentence',
      
      // Story View
      dailyStory: 'Daily Story',
      noStoryAvailable: 'No story available for this day.',
      useArrowsToNavigate: 'Use the arrows to navigate to other days.',
      pages: 'Pages',
      page: 'Page',
      back: 'Back',
      next: 'Next',
      
      // News View
      newsFromItaly: 'News from Italy',
      noNewsAvailable: 'No news available for this day.',
      news: 'News',
      
      // Verbs View
      verbs: 'Verbs',
      practiceVerbs: 'Practice Verbs',
      selectVerbToPractice: 'Select a verb and practice with example sentences',
      selectVerb: 'Select a verb:',
      preparedSentences: 'Prepared Sentences',
      learnWithThematic: 'Learn with thematic sentence collections',
      selectTopic: 'Select a topic:',
      sentences: 'sentences',
      
      // Translator View
      translatorDictionary: 'Translator & Dictionary',
      enterSentenceOrWord: 'Enter sentence or word…',
      translate: 'Translate',
      clear: 'Clear',
      saveToVocab: 'Save to vocabulary',
      save: 'Save',
      wordReference: 'WordReference',
      wordRefDescription: 'Detailed word meanings, conjugations and example sentences from WordReference.',
      enterItalianWord: 'Enter Italian word…',
      lookup: 'Look up',
      savedSentences: 'Saved Sentences',
      savedWords: 'Saved Words',
      noSentencesSaved: 'No sentences saved yet.',
      noWordsSaved: 'No words saved yet.',
      tapToSaveSentence: 'Tap 🔖 on a sentence to save it here.',
      tapWordToSave: 'Tap on a word in the text to save it.',
      remove: 'Remove',
      lookupInWordRef: 'Look up in WordReference',
      
      // More View
      more: 'More',
      archive: 'Archive',
      browsePassedLessons: 'Browse past lessons',
      settings: 'Settings',
      settingsDescription: 'Level, topics, API & design',
      madeWithLove: 'Made with ❤️ for everyone who loves Italian.',
      
      // Library View
      backToArchive: 'Back to Archive',
      noPastDaysAvailable: 'No past days available yet.',
      
      // Vocabulary View
      vocabulary: 'Vocabulary',
      words: 'Words',
      
      // Settings View
      backBtn: 'Back',
      learningLevel: 'Learning Level',
      yourLevel: 'Your level',
      sentencesPerDay: 'Sentences per Day',
      numberOfSentences: 'Number of daily sentences',
      topics: 'Topics',
      yourInterests: 'Your interests',
      selected: 'selected',
      display: 'Display',
      showExplanations: 'Show explanations',
      appearance: 'Appearance',
      light: 'Light',
      dark: 'Dark',
      automatic: 'Automatic',
      language: 'Language',
      appLanguage: 'App language',
      english: 'English',
      german: 'German',
      
      // Topic labels
      topicEveryday: '🏠 Everyday',
      topicTravel: '✈️ Travel',
      topicCulture: '🎨 Culture',
      topicWork: '💼 Work',
      topicFood: '🍝 Food & Drink',
      topicSports: '⚽ Sports',
      topicFamily: '👨‍👩‍👧 Family',
      topicChildren: '👶 Children',
      topicHomeGarden: '🏡 Home & Garden',
      topicCar: '🚗 Car',
      topicHobbies: '🎯 Hobbies',
      
      // Toast messages
      pleaseEnterText: 'Please enter text',
      translationFailed: 'Translation failed',
      translationSaved: 'Translation saved! 🔖',
      alreadySaved: 'Already saved',
      pleaseEnterWord: 'Please enter a word',
      wordSaved: 'Word saved! 💬',
      sentenceSaved: 'Sentence saved! 🔖',
      sentenceRemoved: 'Sentence removed',
      wordRemoved: 'Word removed',
      levelSetTo: 'Level set to',
      sentencesPerDaySet: 'sentences per day',
      
      // Misc
      notFound: 'Not found.'
    },
    
    de: {
      // Header
      appTitle: 'Italiano Ogni Giorno',
      appSubtitle: 'Dein täglicher Begleiter für Italienisch',
      
      // Navigation
      navSentences: 'Sätze',
      navStory: 'Story',
      navNews: 'Nachrichten',
      navVerbs: 'Verben',
      navTranslate: 'Übersetz',
      navMore: 'Mehr',
      
      // Sentences View
      dailySentences: 'Tagessätze',
      noSentencesAvailable: 'Keine Sätze für diesen Tag verfügbar.',
      previousDay: 'Vorheriger Tag',
      nextDay: 'Nächster Tag',
      saveSentence: 'Satz speichern',
      
      // Story View
      dailyStory: 'Tagesgeschichte',
      noStoryAvailable: 'Für diesen Tag gibt es noch keine Geschichte.',
      useArrowsToNavigate: 'Nutze die Pfeile, um zu anderen Tagen zu navigieren.',
      pages: 'Seiten',
      page: 'Seite',
      back: 'Zurück',
      next: 'Weiter',
      
      // News View
      newsFromItaly: 'Nachrichten aus Italien',
      noNewsAvailable: 'Für diesen Tag gibt es noch keine Nachrichten.',
      news: 'Nachrichten',
      
      // Verbs View
      verbs: 'Verben',
      practiceVerbs: 'Verben üben',
      selectVerbToPractice: 'Wähle ein Verb und übe mit Beispielsätzen',
      selectVerb: 'Verb auswählen:',
      preparedSentences: 'Vorbereitete Sätze',
      learnWithThematic: 'Lerne mit thematischen Satzsammlungen',
      selectTopic: 'Thema wählen:',
      sentences: 'Sätze',
      
      // Translator View
      translatorDictionary: 'Übersetzer & Wörterbuch',
      enterSentenceOrWord: 'Satz oder Wort eingeben…',
      translate: 'Übersetzen',
      clear: 'Löschen',
      saveToVocab: 'In Vokabeln speichern',
      save: 'Speichern',
      wordReference: 'WordReference',
      wordRefDescription: 'Detaillierte Wortbedeutungen, Konjugationen und Beispielsätze von WordReference.',
      enterItalianWord: 'Italienisches Wort eingeben…',
      lookup: 'Nachschlagen',
      savedSentences: 'Gespeicherte Sätze',
      savedWords: 'Gespeicherte Wörter',
      noSentencesSaved: 'Noch keine Sätze gespeichert.',
      noWordsSaved: 'Noch keine Wörter gespeichert.',
      tapToSaveSentence: 'Tippe auf 🔖 bei einem Satz, um ihn hier zu speichern.',
      tapWordToSave: 'Tippe auf ein Wort im Text, um es zu speichern.',
      remove: 'Entfernen',
      lookupInWordRef: 'In WordReference nachschlagen',
      
      // More View
      more: 'Mehr',
      archive: 'Archiv',
      browsePassedLessons: 'Vergangene Lektionen durchstöbern',
      settings: 'Einstellungen',
      settingsDescription: 'Level, Themen, API & Design',
      madeWithLove: 'Mit ❤️ für alle, die Italienisch lieben.',
      
      // Library View
      backToArchive: 'Zurück zum Archiv',
      noPastDaysAvailable: 'Noch keine vergangenen Tage verfügbar.',
      
      // Vocabulary View
      vocabulary: 'Vokabeln',
      words: 'Wörter',
      
      // Settings View
      backBtn: 'Zurück',
      learningLevel: 'Lernniveau',
      yourLevel: 'Dein Level',
      sentencesPerDay: 'Sätze pro Tag',
      numberOfSentences: 'Anzahl Tagessätze',
      topics: 'Themen',
      yourInterests: 'Deine Interessen',
      selected: 'ausgewählt',
      display: 'Anzeige',
      showExplanations: 'Erklärungen anzeigen',
      appearance: 'Erscheinungsbild',
      light: 'Hell',
      dark: 'Dunkel',
      automatic: 'Automatisch',
      language: 'Sprache',
      appLanguage: 'App-Sprache',
      english: 'Englisch',
      german: 'Deutsch',
      
      // Topic labels
      topicEveryday: '🏠 Alltag',
      topicTravel: '✈️ Reisen',
      topicCulture: '🎨 Kultur',
      topicWork: '💼 Beruf',
      topicFood: '🍝 Essen & Trinken',
      topicSports: '⚽ Sport',
      topicFamily: '👨‍👩‍👧 Familie',
      topicChildren: '👶 Kinder',
      topicHomeGarden: '🏡 Haus & Garten',
      topicCar: '🚗 Auto',
      topicHobbies: '🎯 Hobbies',
      
      // Toast messages
      pleaseEnterText: 'Bitte Text eingeben',
      translationFailed: 'Übersetzung fehlgeschlagen',
      translationSaved: 'Übersetzung gespeichert! 🔖',
      alreadySaved: 'Bereits gespeichert',
      pleaseEnterWord: 'Bitte ein Wort eingeben',
      wordSaved: 'Wort gespeichert! 💬',
      sentenceSaved: 'Satz gespeichert! 🔖',
      sentenceRemoved: 'Satz entfernt',
      wordRemoved: 'Wort entfernt',
      levelSetTo: 'Level auf',
      sentencesPerDaySet: 'Sätze pro Tag',
      
      // Misc
      notFound: 'Nicht gefunden.'
    }
  },

  init() {
    this.currentLang = Store.getLanguage();
    this.updateUI();
  },

  t(key) {
    return this.translations[this.currentLang]?.[key] || this.translations['en'][key] || key;
  },

  setLanguage(lang) {
    this.currentLang = lang;
    Store.setLanguage(lang);
    this.updateUI();
  },

  updateUI() {
    // Update header
    const headerTitle = document.querySelector('.header-title');
    const headerSubtitle = document.getElementById('header-subtitle');
    if (headerTitle) headerTitle.innerHTML = '<img src="flag.png" alt="🇮🇹" class="header-flag"> ' + this.t('appTitle');
    if (headerSubtitle) headerSubtitle.textContent = this.t('appSubtitle');

    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    const navKeys = ['navSentences', 'navStory', 'navNews', 'navVerbs', 'navTranslate', 'navMore'];
    navItems.forEach((item, i) => {
      const span = item.querySelector('span:not(.nav-icon)');
      if (span && navKeys[i]) {
        span.textContent = this.t(navKeys[i]);
      }
    });
  },

  getTopicLabel(topicId) {
    const topicMap = {
      'Alltag': 'topicEveryday',
      'Reisen': 'topicTravel',
      'Kultur': 'topicCulture',
      'Beruf': 'topicWork',
      'Essen': 'topicFood',
      'Sport': 'topicSports',
      'Familie': 'topicFamily',
      'Kinder': 'topicChildren',
      'Haus und Garten': 'topicHomeGarden',
      'Auto': 'topicCar',
      'Hobbies': 'topicHobbies'
    };
    return this.t(topicMap[topicId] || topicId);
  }
};
