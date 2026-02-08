/* ============================================
   Italiano Ogni Giorno — Local Storage Store
   ============================================ */

const Store = {
  // Keys
  VOCAB_KEY: 'italiano_vocabulary',
  SETTINGS_KEY: 'italiano_settings',
  THEME_KEY: 'italiano_theme',
  AI_CACHE_KEY: 'italiano_ai_cache',

  // --- Vocabulary ---
  getVocabulary() {
    try {
      return JSON.parse(localStorage.getItem(this.VOCAB_KEY)) || { words: [], sentences: [] };
    } catch {
      return { words: [], sentences: [] };
    }
  },

  saveWord(italian, german) {
    const vocab = this.getVocabulary();
    // Don't add duplicates
    if (vocab.words.some(w => w.italian === italian)) return false;
    vocab.words.unshift({ italian, german, added: new Date().toISOString() });
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
    return true;
  },

  saveSentence(italian, german) {
    const vocab = this.getVocabulary();
    if (vocab.sentences.some(s => s.italian === italian)) return false;
    vocab.sentences.unshift({ italian, german, added: new Date().toISOString() });
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
    return true;
  },

  removeWord(italian) {
    const vocab = this.getVocabulary();
    vocab.words = vocab.words.filter(w => w.italian !== italian);
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
  },

  removeSentence(italian) {
    const vocab = this.getVocabulary();
    vocab.sentences = vocab.sentences.filter(s => s.italian !== italian);
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
  },

  isWordSaved(italian) {
    return this.getVocabulary().words.some(w => w.italian === italian);
  },

  isSentenceSaved(italian) {
    return this.getVocabulary().sentences.some(s => s.italian === italian);
  },

  // --- Settings ---
  getSettings() {
    try {
      const defaults = {
        level: 'A2',
        topics: ['Alltag', 'Reisen', 'Kultur'],
        showExplanations: true,
        sentenceCount: 5,
        openaiKey: ''
      };
      const saved = JSON.parse(localStorage.getItem(this.SETTINGS_KEY)) || {};
      return { ...defaults, ...saved };
    } catch {
      return { level: 'A2', topics: ['Alltag', 'Reisen', 'Kultur'], showExplanations: true, sentenceCount: 5, openaiKey: '' };
    }
  },

  saveSettings(settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  },

  // --- AI Cache (store generated content per date) ---
  getAICache() {
    try {
      return JSON.parse(localStorage.getItem(this.AI_CACHE_KEY)) || {};
    } catch {
      return {};
    }
  },

  setAICacheEntry(dateStr, type, data) {
    const cache = this.getAICache();
    if (!cache[dateStr]) cache[dateStr] = {};
    cache[dateStr][type] = data;
    localStorage.setItem(this.AI_CACHE_KEY, JSON.stringify(cache));
  },

  getAICacheEntry(dateStr, type) {
    const cache = this.getAICache();
    return cache[dateStr]?.[type] || null;
  },

  getScrapedNews(dateStr) {
    const key = `scraped_news_${dateStr}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  setScrapedNews(dateStr, articles) {
    const key = `scraped_news_${dateStr}`;
    localStorage.setItem(key, JSON.stringify(articles));
  },

  // --- Theme ---
  getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'auto';
  },

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    applyTheme(theme);
  }
};

// Apply theme to document
function applyTheme(theme) {
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  // Update meta theme-color
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isDark ? '#121212' : '#2d5a3d');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (Store.getTheme() === 'auto') applyTheme('auto');
});
