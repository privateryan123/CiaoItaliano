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

  // --- Story Archive ---
  CURRENT_STORY_DATE_KEY: 'current_story_date',
  STORY_ARCHIVE_KEY: 'story_archive',

  getCurrentStoryDate() {
    return localStorage.getItem(this.CURRENT_STORY_DATE_KEY) || getTodayDateStr();
  },

  setCurrentStoryDate(dateStr) {
    localStorage.setItem(this.CURRENT_STORY_DATE_KEY, dateStr);
  },

  getStoryForDate(dateStr) {
    const archive = this.getStoryArchive();
    return archive[dateStr] || null;
  },

  setStoryForDate(dateStr, story) {
    const archive = this.getStoryArchive();
    archive[dateStr] = story;
    localStorage.setItem(this.STORY_ARCHIVE_KEY, JSON.stringify(archive));
  },

  getStoryArchive() {
    try {
      const data = localStorage.getItem(this.STORY_ARCHIVE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  // --- News Archive ---
  CURRENT_NEWS_DATE_KEY: 'current_news_date',
  NEWS_ARCHIVE_KEY: 'news_archive',

  getCurrentNewsDate() {
    return localStorage.getItem(this.CURRENT_NEWS_DATE_KEY) || getTodayDateStr();
  },

  setCurrentNewsDate(dateStr) {
    localStorage.setItem(this.CURRENT_NEWS_DATE_KEY, dateStr);
  },

  getNewsForDate(dateStr) {
    const archive = this.getNewsArchive();
    return archive[dateStr] || null;
  },

  setNewsForDate(dateStr, newsArticles) {
    const archive = this.getNewsArchive();
    archive[dateStr] = newsArticles;
    localStorage.setItem(this.NEWS_ARCHIVE_KEY, JSON.stringify(archive));
  },

  getNewsArchive() {
    try {
      const data = localStorage.getItem(this.NEWS_ARCHIVE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  // --- Sentence Archive ---
  CURRENT_SENTENCE_DATE_KEY: 'current_sentence_date',
  SENTENCE_ARCHIVE_KEY: 'sentence_archive',

  getCurrentSentenceDate() {
    return localStorage.getItem(this.CURRENT_SENTENCE_DATE_KEY) || getTodayDateStr();
  },

  setCurrentSentenceDate(dateStr) {
    localStorage.setItem(this.CURRENT_SENTENCE_DATE_KEY, dateStr);
  },

  getSentencesForDate(dateStr) {
    const archive = this.getSentenceArchive();
    return archive[dateStr] || null;
  },

  setSentencesForDate(dateStr, sentences) {
    const archive = this.getSentenceArchive();
    archive[dateStr] = sentences;
    localStorage.setItem(this.SENTENCE_ARCHIVE_KEY, JSON.stringify(archive));
  },

  getSentenceArchive() {
    try {
      const data = localStorage.getItem(this.SENTENCE_ARCHIVE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
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
