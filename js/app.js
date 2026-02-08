/* ============================================
   Italiano Ogni Giorno — Main App Controller
   ============================================ */

const App = {
  currentView: 'sentences',
  currentVocabTab: 'sentences',
  translationDir: 'de-it',
  _lastTranslation: null,

  // Sub-views that belong under the "more" tab
  SUB_VIEWS: ['library', 'vocabulary', 'settings'],
  // Main tab views matching bottom nav
  MAIN_VIEWS: ['sentences', 'story', 'news', 'translator', 'more'],

  // ==========================================
  // INITIALIZATION
  // ==========================================
  init() {
    console.log('=== App.init() starting ===');
    
    console.log('1. Applying theme...');
    applyTheme(Store.getTheme());
    
    console.log('2. Setting up navigation...');
    this.setupNav();
    
    console.log('3. Setting up word tap...');
    this.setupWordTap();

    // Determine initial view from hash
    const hash = (location.hash || '#sentences').replace('#', '');
    const validViews = [...this.MAIN_VIEWS, ...this.SUB_VIEWS];
    const initialView = validViews.includes(hash) ? hash : 'sentences';
    
    console.log('4. Initial view determined:', initialView);
    console.log('5. Switching to initial view...');
    this.switchView(initialView, false);
    console.log('6. View switched, updating history...');
    
    history.replaceState({ view: initialView }, '', `#${initialView}`);

    console.log('7. Registering service worker...');
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
        const cached = Store.getAICacheEntry(today, 'sentences');
        console.log('Cached sentences data:', cached);
        Views.renderSentences(today, cached);
        subtitle.textContent = 'Tagessätze auf Italienisch';
        break;
      }
      case 'story': {
        console.log('Rendering story view...');
        const cached = Store.getAICacheEntry(today, 'story');
        console.log('Cached story data:', cached);
        Views.renderStory(today, cached);
        subtitle.textContent = 'Tagesgeschichte lesen';
        break;
      }
      case 'news': {
        console.log('Rendering news view...');
        const cached = Store.getAICacheEntry(today, 'news');
        console.log('Cached news data:', cached);
        Views.renderNews(today, cached);
        subtitle.textContent = 'Nachrichten auf Italienisch';
        break;
      }
      case 'translator':
        console.log('Rendering translator view...');
        Views.renderTranslator();
        subtitle.textContent = 'Übersetzer & Wörterbuch';
        break;
      case 'more':
        console.log('Rendering more view...');
        Views.renderMore();
        subtitle.textContent = 'Weitere Funktionen';
        break;
      case 'library':
        console.log('Rendering library view...');
        Views.renderLibrary();
        subtitle.textContent = 'Vergangene Lektionen';
        break;
      case 'vocabulary':
        console.log('Rendering vocabulary view...');
        Views.renderVocabulary(this.currentVocabTab);
        subtitle.textContent = 'Deine gespeicherten Vokabeln';
        break;
      case 'settings':
        console.log('Rendering settings view...');
        Views.renderSettings();
        subtitle.textContent = 'App personalisieren';
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

  // ==========================================
  // DATE-BASED CONTENT LOADING
  // ==========================================
  loadDateSentences(dateStr) {
    const cached = Store.getAICacheEntry(dateStr, 'sentences');
    Views.renderSentences(dateStr, cached);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  loadDateStory(dateStr) {
    const cached = Store.getAICacheEntry(dateStr, 'story');
    Views.renderStory(dateStr, cached);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  loadDateNews(dateStr) {
    const cached = Store.getAICacheEntry(dateStr, 'news');
    Views.renderNews(dateStr, cached);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // AI GENERATION
  // ==========================================
  async aiGenerateSentences() {
    const btn = document.getElementById('btn-ai-sentences');
    if (!btn) return;
    
    const settings = Store.getSettings();
    
    btn.disabled = true;
    btn.innerHTML = '<span class="ai-spinner"></span> Sätze werden generiert…';

    try {
      const sentences = await AI.generateSentences(settings.sentenceCount, settings.level, settings.topics);
      if (!sentences) {
        this.showToast('⚠️ Fehler: Überprüfe deinen API-Schlüssel und Netzwerkverbindung.');
        btn.disabled = false;
        btn.innerHTML = '<span class="ai-btn-icon">✨</span> Neue Sätze mit AI generieren';
        return;
      }
      const today = getTodayDateStr();
      Store.setAICacheEntry(today, 'sentences', sentences);
      Views.renderSentences(today, sentences);
      this.showToast(`${sentences.length} neue Sätze generiert! ✨`);
    } catch (err) {
      console.error('AI sentence generation failed:', err);
      const msg = err.message || 'AI Fehler';
      if (msg.includes('Rate-Limit')) {
        this.showToast('⏱️ Rate-Limit erreicht. Bitte warte einige Minuten.');
      } else if (msg.includes('ungültig') || msg.includes('401')) {
        this.showToast('🔑 API-Schlüssel ungültig. Überprüfe deine Einstellungen.');
      } else {
        this.showToast('⚠️ Fehler: ' + msg);
      }
      btn.disabled = false;
      btn.innerHTML = '<span class="ai-btn-icon">✨</span> Neue Sätze mit AI generieren';
    }
  },

  async aiGenerateStory() {
    const btn = document.getElementById('btn-ai-story');
    if (!btn) return;
    
    const settings = Store.getSettings();
    
    btn.disabled = true;
    btn.innerHTML = '<span class="ai-spinner"></span> Geschichte wird generiert…';

    try {
      const story = await AI.generateStory(settings.level, settings.topics);
      if (!story) {
        this.showToast('⚠️ Fehler: Überprüfe deinen API-Schlüssel und Netzwerkverbindung.');
        btn.disabled = false;
        btn.innerHTML = '<span class="ai-btn-icon">✨</span> Neue Geschichte mit AI generieren';
        return;
      }
      const today = getTodayDateStr();
      Store.setAICacheEntry(today, 'story', story);
      Views.renderStory(today, story);
      this.showToast('Neue Geschichte generiert! 📖');
    } catch (err) {
      console.error('AI story generation failed:', err);
      const msg = err.message || 'AI Fehler';
      if (msg.includes('Rate-Limit')) {
        this.showToast('⏱️ Rate-Limit erreicht. Bitte warte einige Minuten.');
      } else if (msg.includes('ungültig') || msg.includes('401')) {
        this.showToast('🔑 API-Schlüssel ungültig. Überprüfe deine Einstellungen.');
      } else {
        this.showToast('⚠️ Fehler: ' + msg);
      }
      btn.disabled = false;
      btn.innerHTML = '<span class="ai-btn-icon">✨</span> Neue Geschichte mit AI generieren';
    }
  },

  async loadTodayNews() {
    const btn = document.getElementById('btn-load-news');
    if (!btn) return;
    
    btn.disabled = true;
    btn.innerHTML = '<span class="ai-spinner"></span> Nachrichten werden geladen…';

    try {
      const response = await fetch('/api/scrape-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to load news');
      }

      const data = await response.json();
      const today = getTodayDateStr();
      
      if (data.articles && data.articles.length > 0) {
        Store.setScrapedNews(today, data.articles);
        Views.renderNews(today, null);
        this.showToast(`${data.articles.length} Artikel von ANSA.it geladen! 📰`);
      } else {
        this.showToast('⚠️ Keine Artikel gefunden. Versuche es später noch einmal.');
      }
      
    } catch (err) {
      console.error('News loading failed:', err);
      this.showToast('⚠️ Fehler beim Laden der Nachrichten.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span class="ai-btn-icon">📰</span> Aktuelle Nachrichten laden';
    }
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
      this.showToast('Bitte Text eingeben');
      return;
    }

    const btn = document.getElementById('translator-btn');
    const btnText = document.getElementById('translator-btn-text');
    btn.disabled = true;
    btnText.textContent = 'Übersetze…';

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
      resultText.innerHTML = `<span style="color: var(--text-tertiary); font-size: 0.8rem;">${flag} ${to === 'it' ? 'Italienisch' : 'Deutsch'}:</span><br><strong>${result}</strong>`;
      resultDiv.style.display = 'block';
    } catch (err) {
      this.showToast('Übersetzung fehlgeschlagen: ' + err.message);
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Übersetzen';
    }
  },

  saveTranslation() {
    if (!this._lastTranslation) return;
    const { original, translated, from, to } = this._lastTranslation;
    const italian = from === 'it' ? original : translated;
    const german = from === 'de' ? original : translated;
    const added = Store.saveSentence(italian, german);
    this.showToast(added ? 'Übersetzung gespeichert! 🔖' : 'Bereits gespeichert');
  },

  quickTranslate(text) {
    const input = document.getElementById('translator-input');
    input.value = text;
    this.setTranslationDir('de-it');
    this.doTranslate();
  },

  // ==========================================
  // WORDREFERENCE
  // ==========================================
  lookupWordReference() {
    const input = document.getElementById('wr-input');
    const word = (input.value || '').trim();
    if (!word) {
      this.showToast('Bitte ein Wort eingeben');
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

    document.getElementById('popup-save-word').addEventListener('click', () => {
      if (this._popupData) {
        const added = Store.saveWord(this._popupData.word, this._popupData.translation);
        this.hideWordPopup();
        this.showToast(added ? 'Wort gespeichert! 💬' : 'Bereits gespeichert');
      }
    });
    document.getElementById('popup-save-sentence').addEventListener('click', () => {
      if (this._popupData) {
        const added = Store.saveSentence(this._popupData.sentence, this._popupData.translation);
        this.hideWordPopup();
        this.showToast(added ? 'Satz gespeichert! 🔖' : 'Bereits gespeichert');
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
      wordBtn.textContent = '✓ Wort bereits gespeichert';
      wordBtn.style.opacity = '0.6';
    } else {
      wordBtn.textContent = '💬 Wort speichern';
      wordBtn.style.opacity = '1';
    }
    if (Store.isSentenceSaved(sentence)) {
      sentBtn.textContent = '✓ Satz bereits gespeichert';
      sentBtn.style.opacity = '0.6';
    } else {
      sentBtn.textContent = '🔖 Ganzen Satz speichern';
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
    this.showToast(added ? 'Satz gespeichert! 🔖' : 'Bereits gespeichert');
    this.refreshSaveButtons();
  },

  saveWord(italian, german) {
    const added = Store.saveWord(italian, german);
    this.showToast(added ? 'Wort gespeichert! 💬' : 'Bereits gespeichert');
  },

  removeSentence(italian) {
    Store.removeSentence(italian);
    Views.renderVocabulary('sentences');
    this.showToast('Satz entfernt');
  },

  removeWord(italian) {
    Store.removeWord(italian);
    Views.renderVocabulary('words');
    this.showToast('Wort entfernt');
  },

  vocabTab(tab) {
    this.currentVocabTab = tab;
    Views.renderVocabulary(tab);
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
    this.showToast(`Level auf ${level} gesetzt`);
  },

  setSentenceCount(n) {
    const settings = Store.getSettings();
    settings.sentenceCount = n;
    Store.saveSettings(settings);
    Views.renderSettings();
    this.showToast(`${n} Sätze pro Tag`);
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
    this.showToast(settings.showExplanations ? 'Erklärungen eingeblendet' : 'Erklärungen ausgeblendet');
  },

  setTheme(theme) {
    Store.setTheme(theme);
    Views.renderSettings();
    const labels = { light: 'Hell', dark: 'Dunkel', auto: 'Automatisch' };
    this.showToast(`Design: ${labels[theme]}`);
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
