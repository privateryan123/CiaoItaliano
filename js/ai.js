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
      const res = await fetch('/api/sentences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count, level, topics })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Sentences API error:', res.status, err);
        if (res.status === 429) throw new Error('Rate-Limit erreicht. Bitte warte kurz.');
        throw new Error(`API Fehler: ${res.status}`);
      }

      const data = await res.json();
      return data;
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
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, topics })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Story API error:', res.status, err);
        if (res.status === 429) throw new Error('Rate-Limit erreicht. Bitte warte kurz.');
        throw new Error(`API Fehler: ${res.status}`);
      }

      const data = await res.json();
      return data;
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
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('News API error:', res.status, err);
        if (res.status === 429) throw new Error('Rate-Limit erreicht. Bitte warte kurz.');
        throw new Error(`API Fehler: ${res.status}`);
      }

      const data = await res.json();
      return data;
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
