/* ============================================
   Italiano Ogni Giorno — Local Storage Store
   ============================================ */

const Store = {
  // Keys
  VOCAB_KEY: 'italiano_vocabulary',
  SETTINGS_KEY: 'italiano_settings',
  THEME_KEY: 'italiano_theme',
  AI_CACHE_KEY: 'italiano_ai_cache',
  LANGUAGE_KEY: 'italiano_language',
  USER_ID_KEY: 'italiano_user_id',

  // --- User ID (unique per device/browser) ---
  getUserId() {
    let userId = localStorage.getItem(this.USER_ID_KEY);
    if (!userId) {
      // Generate a random UUID-like ID
      userId = 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(this.USER_ID_KEY, userId);
    }
    return userId;
  },

  // --- Language ---
  getLanguage() {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
  },

  setLanguage(lang) {
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  },

  // --- Vocabulary (synced with Blob Storage API) ---
  _vocabCache: null,
  _vocabLoading: false,
  _vocabSyncPromise: null,

  // Get vocabulary (uses cache, syncs from API in background)
  getVocabulary() {
    // Return cache if available, otherwise local storage
    if (this._vocabCache) {
      return this._vocabCache;
    }
    try {
      const local = JSON.parse(localStorage.getItem(this.VOCAB_KEY)) || { words: [], sentences: [] };
      this._vocabCache = local;
      // Trigger background sync
      this.syncVocabularyFromServer();
      return local;
    } catch {
      return { words: [], sentences: [] };
    }
  },

  // Sync vocabulary from server
  async syncVocabularyFromServer() {
    if (this._vocabLoading) return this._vocabSyncPromise;
    this._vocabLoading = true;
    
    this._vocabSyncPromise = (async () => {
      try {
        const response = await fetch('/api/vocabulary', {
          headers: { 'x-user-id': this.getUserId() }
        });
        if (response.ok) {
          const vocab = await response.json();
          this._vocabCache = vocab;
          localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
          return vocab;
        }
      } catch (error) {
        console.error('Failed to sync vocabulary from server:', error);
      } finally {
        this._vocabLoading = false;
      }
      return this._vocabCache || { words: [], sentences: [] };
    })();
    
    return this._vocabSyncPromise;
  },

  // Clear local vocabulary cache (useful when syncing issues occur)
  clearVocabularyCache() {
    this._vocabCache = null;
    localStorage.removeItem(this.VOCAB_KEY);
  },

  // Save word to API and local storage
  async saveWord(italian, german) {
    // Don't check local cache - let server be the source of truth
    try {
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': this.getUserId()
        },
        body: JSON.stringify({ type: 'word', italian, german })
      });
      
      if (response.ok) {
        const result = await response.json();
        const item = result.item || { italian, german, added: new Date().toISOString() };
        // Update local cache
        const vocab = this.getVocabulary();
        // Only add if not already in local cache
        if (!vocab.words.some(w => w.italian === italian)) {
          vocab.words.unshift(item);
        }
        this._vocabCache = vocab;
        localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
        return item;
      } else if (response.status === 409) {
        // Already exists on server - sync to update local cache
        await this.syncVocabularyFromServer();
        return false;
      }
    } catch (error) {
      console.error('Failed to save word to server:', error);
      // Fallback to local storage only
      const vocab = this.getVocabulary();
      if (vocab.words.some(w => w.italian === italian)) return false;
      vocab.words.unshift({ italian, german, added: new Date().toISOString() });
      this._vocabCache = vocab;
      localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
      return true;
    }
    return false;
  },

  // Save sentence to API and local storage
  async saveSentence(italian, german) {
    // Don't check local cache - let server be the source of truth
    try {
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': this.getUserId()
        },
        body: JSON.stringify({ type: 'sentence', italian, german })
      });
      
      if (response.ok) {
        const result = await response.json();
        const item = result.item || { italian, german, added: new Date().toISOString() };
        // Update local cache
        const vocab = this.getVocabulary();
        if (!vocab.sentences.some(s => s.italian === italian)) {
          vocab.sentences.unshift(item);
        }
        this._vocabCache = vocab;
        localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
        return true;
      } else if (response.status === 409) {
        // Already exists on server - sync to update local cache
        await this.syncVocabularyFromServer();
        return false;
      }
    } catch (error) {
      console.error('Failed to save sentence to server:', error);
      const vocab = this.getVocabulary();
      if (vocab.sentences.some(s => s.italian === italian)) return false;
      vocab.sentences.unshift({ italian, german, added: new Date().toISOString() });
      this._vocabCache = vocab;
      localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
      return true;
    }
    return false;
  },

  async removeWord(italian) {
    const vocab = this.getVocabulary();
    vocab.words = vocab.words.filter(w => w.italian !== italian);
    this._vocabCache = vocab;
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
    
    try {
      await fetch('/api/vocabulary', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': this.getUserId()
        },
        body: JSON.stringify({ type: 'word', italian })
      });
    } catch (error) {
      console.error('Failed to delete word from server:', error);
    }
  },

  async removeSentence(italian) {
    const vocab = this.getVocabulary();
    vocab.sentences = vocab.sentences.filter(s => s.italian !== italian);
    this._vocabCache = vocab;
    localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocab));
    
    try {
      await fetch('/api/vocabulary', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': this.getUserId()
        },
        body: JSON.stringify({ type: 'sentence', italian })
      });
    } catch (error) {
      console.error('Failed to delete sentence from server:', error);
    }
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
    const stored = localStorage.getItem(this.CURRENT_STORY_DATE_KEY);
    const today = getTodayDateStr();
    // Validate stored date has content, otherwise use today or latest
    if (stored && this.getStoryForDate(stored)) {
      return stored;
    }
    // Try today first
    if (this.getStoryForDate(today)) {
      return today;
    }
    // Fallback to latest available date
    const available = getAvailableDates();
    return available.length > 0 ? available[0] : today;
  },

  setCurrentStoryDate(dateStr) {
    localStorage.setItem(this.CURRENT_STORY_DATE_KEY, dateStr);
  },

  getStoryForDate(dateStr) {
    // Check localStorage first (user-generated/modified)
    const archive = this.getStoryArchive();
    if (archive[dateStr]) return archive[dateStr];
    
    // Fallback to DAILY_CONTENT
    if (typeof DAILY_CONTENT !== 'undefined' && DAILY_CONTENT[dateStr]?.story) {
      return DAILY_CONTENT[dateStr].story;
    }
    return null;
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
    const stored = localStorage.getItem(this.CURRENT_NEWS_DATE_KEY);
    const today = getTodayDateStr();
    // Validate stored date has content, otherwise use today or latest
    if (stored && this.getNewsForDate(stored)) {
      return stored;
    }
    // Try today first
    if (this.getNewsForDate(today)) {
      return today;
    }
    // Fallback to latest available date
    const available = getAvailableDates();
    return available.length > 0 ? available[0] : today;
  },

  setCurrentNewsDate(dateStr) {
    localStorage.setItem(this.CURRENT_NEWS_DATE_KEY, dateStr);
  },

  getNewsForDate(dateStr) {
    // Check localStorage first (user-generated/modified)
    const archive = this.getNewsArchive();
    if (archive[dateStr]) return archive[dateStr];
    
    // Fallback to DAILY_CONTENT
    if (typeof DAILY_CONTENT !== 'undefined' && DAILY_CONTENT[dateStr]?.news) {
      return DAILY_CONTENT[dateStr].news;
    }
    return null;
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
    const stored = localStorage.getItem(this.CURRENT_SENTENCE_DATE_KEY);
    const today = getTodayDateStr();
    // Validate stored date has content, otherwise use today or latest
    if (stored && this.getSentencesForDate(stored)) {
      return stored;
    }
    // Try today first
    if (this.getSentencesForDate(today)) {
      return today;
    }
    // Fallback to latest available date
    const available = getAvailableDates();
    return available.length > 0 ? available[0] : today;
  },

  setCurrentSentenceDate(dateStr) {
    localStorage.setItem(this.CURRENT_SENTENCE_DATE_KEY, dateStr);
  },

  getSentencesForDate(dateStr) {
    // Check localStorage first (user-generated/modified)
    const archive = this.getSentenceArchive();
    if (archive[dateStr]) return archive[dateStr];
    
    // Fallback to DAILY_CONTENT
    if (typeof DAILY_CONTENT !== 'undefined' && DAILY_CONTENT[dateStr]?.sentences) {
      return DAILY_CONTENT[dateStr].sentences;
    }
    return null;
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

  // --- Async Content API Methods ---
  // These methods check ContentAPI (Azure Blob) as a fallback
  async getSentencesForDateAsync(dateStr) {
    // Check localStorage first
    const local = this.getSentencesForDate(dateStr);
    if (local) return local;
    
    // Try ContentAPI (Azure Blob Storage)
    if (typeof ContentAPI !== 'undefined') {
      const content = await ContentAPI.getContentWithFallback(dateStr);
      if (content?.sentences) return content.sentences;
    }
    return null;
  },

  async getStoryForDateAsync(dateStr) {
    // Check localStorage first
    const local = this.getStoryForDate(dateStr);
    if (local) return local;
    
    // Try ContentAPI (Azure Blob Storage)
    if (typeof ContentAPI !== 'undefined') {
      const content = await ContentAPI.getContentWithFallback(dateStr);
      if (content?.story) return content.story;
    }
    return null;
  },

  async getNewsForDateAsync(dateStr) {
    // Check localStorage first
    const local = this.getNewsForDate(dateStr);
    if (local) return local;
    
    // Try ContentAPI (Azure Blob Storage)
    if (typeof ContentAPI !== 'undefined') {
      const content = await ContentAPI.getContentWithFallback(dateStr);
      if (content?.news) return content.news;
    }
    return null;
  },

  // Save content to both localStorage and Azure
  async saveContentToCloud(dateStr, content) {
    if (typeof ContentAPI !== 'undefined') {
      return ContentAPI.saveContent(dateStr, content);
    }
    return false;
  },

  // --- Selected Verb ---
  SELECTED_VERB_KEY: 'selected_verb',

  getSelectedVerb() {
    return localStorage.getItem(this.SELECTED_VERB_KEY) || 'ESSERE';
  },

  setSelectedVerb(verbKey) {
    localStorage.setItem(this.SELECTED_VERB_KEY, verbKey);
  },

  // --- Selected Sentences Topic ---
  SELECTED_SENTENCES_TOPIC_KEY: 'selected_sentences_topic',

  getSelectedSentencesTopic() {
    return localStorage.getItem(this.SELECTED_SENTENCES_TOPIC_KEY) || 'VORSTELLUNG';
  },

  setSelectedSentencesTopic(topicKey) {
    localStorage.setItem(this.SELECTED_SENTENCES_TOPIC_KEY, topicKey);
  },

  // --- Selected Preposition ---
  SELECTED_PREPOSITION_KEY: 'selected_preposition',

  getSelectedPreposition() {
    return localStorage.getItem(this.SELECTED_PREPOSITION_KEY) || 'DI';
  },

  setSelectedPreposition(prepositionKey) {
    localStorage.setItem(this.SELECTED_PREPOSITION_KEY, prepositionKey);
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
