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
  // OPENAI - Generate Sentences
  // ==========================================
  async generateSentences(count, level, topics) {
    const apiKey = Store.getSettings().openaiKey;
    if (!apiKey) return null;

    const topicStr = topics.length > 0 ? topics.join(', ') : 'Alltag, Reisen, Kultur';
    const prompt = `Generiere genau ${count} praktische, alltagstaugliche italienische Sätze für einen deutschen Muttersprachler auf dem Niveau ${level}.

Themen: ${topicStr}

Für jeden Satz liefere:
- "italian": den italienischen Satz
- "german": die deutsche Übersetzung
- "explanation": eine kurze Erklärung (Grammatik, Nuance oder Verwendung) auf Deutsch
- "keywords": Array mit 1-3 Schlüsselwörtern aus dem italienischen Satz

Antworte NUR mit einem JSON-Array, kein zusätzlicher Text. Beispiel:
[{"italian":"...","german":"...","explanation":"...","keywords":["..."]}]

Die Sätze sollen natürlich, warm und nützlich klingen — nicht wie ein Lehrbuch.`;

    return this._callOpenAI(apiKey, prompt);
  },

  // ==========================================
  // OPENAI - Generate Story
  // ==========================================
  async generateStory(level, topics) {
    const apiKey = Store.getSettings().openaiKey;
    if (!apiKey) return null;

    const topicStr = topics.length > 0 ? topics[Math.floor(Math.random() * topics.length)] : 'Alltag';
    const prompt = `Schreibe eine ausführliche, immersive italienische Geschichte zum Thema "${topicStr}" für Lernende auf dem Niveau ${level}.

Die Geschichte soll 16-20 Sätze haben, aufgeteilt in 4-5 Seiten (je 4 Sätze pro Seite). Die Geschichte soll einen echten Handlungsbogen haben — mit Einleitung, Höhepunkt und einem befriedigenden Ende. Beschreibe Szenen lebendig mit Details, Dialogen und Gefühlen.

Liefere das Ergebnis als JSON-Objekt:
{
  "title": "Titel der Geschichte auf Italienisch",
  "topic": "${topicStr}",
  "level": "${level}",
  "readingTime": "5 min",
  "pages": [
    [
      {"italian":"...","german":"...","note":"kurze Erklärung oder Grammatikhinweis auf Deutsch"},
      ...
    ],
    ...
  ]
}

Antworte NUR mit dem JSON-Objekt. Die Geschichte soll menschlich, warm und realistisch sein — wie ein Kapitel aus einem kleinen Roman.`;

    return this._callOpenAI(apiKey, prompt);
  },

  // ==========================================
  // OPENAI - Generate News
  // ==========================================
  async generateNews(level) {
    const apiKey = Store.getSettings().openaiKey;
    if (!apiKey) return null;

    const prompt = `Erstelle 3 ausführliche, lernfreundliche Nachrichtenartikel-Zusammenfassungen auf Italienisch, geeignet für Lernende auf dem Niveau ${level}.
Die Nachrichten sollen aktuelle, realistische Themen behandeln (Kultur, Reisen, Gesellschaft, Technologie, etc.).

Jede Zusammenfassung soll 5-7 Sätze lang sein — genug um den Artikel wirklich zu verstehen und verschiedene Vokabeln und Strukturen zu lernen. Verwende abwechslungsreiche Satzstrukturen.

Liefere als JSON-Array:
[{
  "category": "Thema auf Deutsch",
  "headline": "Überschrift auf Deutsch",
  "italianSummary": "Ausführliche Zusammenfassung auf Italienisch (5-7 Sätze)",
  "german": "Deutsche Übersetzung der Zusammenfassung",
  "source": "https://www.ansa.it",
  "sourceName": "ANSA"
}]

Antworte NUR mit dem JSON-Array.`;

    return this._callOpenAI(apiKey, prompt);
  },

  // ==========================================
  // OPENAI — Low-level call
  // ==========================================
  async _callOpenAI(apiKey, prompt) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Du bist ein Italienisch-Lernassistent für deutsche Muttersprachler. Antworte immer nur mit validem JSON — kein Markdown, kein ```.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8,
          max_tokens: 4000
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('OpenAI error:', res.status, err);
        if (res.status === 401) throw new Error('API-Schlüssel ungültig');
        if (res.status === 429) throw new Error('Rate-Limit erreicht. Bitte warte kurz.');
        throw new Error(`OpenAI Fehler: ${res.status}`);
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content?.trim();
      if (!raw) throw new Error('Leere Antwort von OpenAI');

      // Parse JSON — strip potential markdown fences
      const cleaned = raw.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error('AI generation error:', err);
      throw err;
    }
  },

  // ==========================================
  // WORDREFERENCE URL
  // ==========================================
  getWordReferenceUrl(word, direction = 'iten') {
    // Supported: iten (IT→EN, most complete), enit, itde, deit
    const validDirs = ['iten', 'enit', 'itde', 'deit'];
    const dir = validDirs.includes(direction) ? direction : 'iten';
    // Don't use encodeURIComponent — WordReference handles raw UTF-8 paths.
    // The browser will percent-encode as needed when navigating.
    return `https://www.wordreference.com/${dir}/${word}`;
  }
};
