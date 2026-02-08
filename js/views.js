/* ============================================
   Italiano Ogni Giorno — View Renderers
   ============================================ */

const Views = {

  // ==========================================
  // SENTENCES VIEW
  // ==========================================
  renderSentences(dateStr, sentences) {
    console.log('=== Views.renderSentences called ===');
    console.log('dateStr:', dateStr);
    console.log('sentences argument:', sentences);
    
    const container = document.getElementById('sentences-content');
    console.log('Container element:', container);
    
    const settings = Store.getSettings();
    console.log('Settings:', settings);
    
    const showExplanations = settings.showExplanations;
    const content = getContentForDate(dateStr);
    console.log('Content from getContentForDate:', content);
    
    const dateInfo = formatDateDisplay(dateStr);
    console.log('Date info:', dateInfo);

    // Use AI-generated sentences if provided, else fall back to static
    const sentenceList = sentences || (content ? content.sentences : []);
    console.log('Sentence list:', sentenceList);
    console.log('Sentence list length:', sentenceList ? sentenceList.length : 0);
    
    const sentenceCount = settings.sentenceCount;
    const displayed = sentenceList.slice(0, sentenceCount);
    console.log('Displayed sentences:', displayed);
    console.log('Displayed count:', displayed.length);

    const hasApiKey = !!settings.openaiKey;

    let html = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem;">Tagessätze</h2>
          <p style="color: var(--text-tertiary); font-size: 0.82rem; margin-top: 2px;">${dateInfo.full}</p>
        </div>
        <span class="section-badge">${displayed.length} / ${sentenceCount}</span>
      </div>`;

    if (hasApiKey) {
      html += `
        <button class="ai-generate-btn" onclick="App.aiGenerateSentences()" id="btn-ai-sentences">
          <span class="ai-btn-icon">✨</span> Neue Sätze mit AI generieren
        </button>`;
    }

    if (displayed.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">✏️</div>
          <div class="vocab-empty-text">
            ${hasApiKey ? 'Tippe auf den Button oben, um neue Sätze zu generieren.' : 'Kein Inhalt für heute. Füge einen OpenAI API-Schlüssel unter Mehr → Einstellungen hinzu, um täglich neue Sätze zu generieren.'}
          </div>
        </div>`;
    } else {
      displayed.forEach((s, i) => {
        const isSaved = Store.isSentenceSaved(s.italian);
        html += `
          <div class="card sentence-card">
            <span class="sentence-number">${i + 1}</span>
            <div class="sentence-italian">${this.makeInteractive(s.italian, s.keywords, s.italian, s.german)}</div>
            <div class="sentence-german">${s.german}</div>
            ${showExplanations && s.explanation ? `<div class="sentence-explanation">${s.explanation}</div>` : ''}
            <div class="card-actions">
              <button class="save-btn ${isSaved ? 'saved' : ''}"
                onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
                title="Satz speichern">🔖</button>
            </div>
          </div>`;
      });
    }

    // Past days quick links
    const allDates = getAvailableDates();
    const pastDates = allDates.filter(d => d !== dateStr).slice(0, 3);
    if (pastDates.length > 0) {
      html += `
        <div class="section-divider"></div>
        <div class="section-header" style="margin-top: var(--space-lg);">
          <span class="section-icon">📅</span>
          <span class="section-title">Ältere Sätze</span>
        </div>
        <div class="library-grid">`;
      pastDates.forEach(d => {
        const c = getContentForDate(d);
        const di = formatDateDisplay(d);
        html += `
          <div class="library-item" onclick="App.loadDateSentences('${d}')">
            <div class="library-item-date">
              <div class="library-item-day">${di.day}</div>
              <div class="library-item-month">${di.monthShort}</div>
            </div>
            <div class="library-item-content">
              <div class="library-item-title">${c ? c.sentences.length + ' Sätze' : '—'}</div>
              <div class="library-item-preview">${di.weekday}</div>
            </div>
            <div class="library-item-arrow">›</div>
          </div>`;
      });
      html += '</div>';
    }

    console.log('Setting container innerHTML. HTML length:', html.length);
    console.log('First 200 chars of HTML:', html.substring(0, 200));
    container.innerHTML = html;
    console.log('=== Views.renderSentences complete ===');
  },

  // ==========================================
  // STORY VIEW
  // ==========================================
  renderStory(dateStr, story) {
    const container = document.getElementById('story-content');
    const settings = Store.getSettings();
    const showExplanations = settings.showExplanations;
    const content = getContentForDate(dateStr);
    const dateInfo = formatDateDisplay(dateStr);

    const storyData = story || (content ? content.story : null);
    const hasApiKey = !!settings.openaiKey;

    let html = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem;">Tagesgeschichte</h2>
          <p style="color: var(--text-tertiary); font-size: 0.82rem; margin-top: 2px;">${dateInfo.full}</p>
        </div>
      </div>`;

    if (hasApiKey) {
      html += `
        <button class="ai-generate-btn" onclick="App.aiGenerateStory()" id="btn-ai-story">
          <span class="ai-btn-icon">✨</span> Neue Geschichte mit AI generieren
        </button>`;
    }

    if (!storyData) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">📖</div>
          <div class="vocab-empty-text">
            ${hasApiKey ? 'Tippe auf den Button oben, um eine neue Geschichte zu generieren.' : 'Kein Inhalt für heute. Füge einen OpenAI API-Schlüssel unter Mehr → Einstellungen hinzu.'}
          </div>
        </div>`;
    } else {
      html += `
        <div class="card" id="story-card">
          <div class="story-header">
            <div class="story-title">${storyData.title}</div>
            <div class="story-meta">
              <span>📚 ${storyData.topic}</span>
              <span>⏱ ${storyData.readingTime}</span>
              <span>${storyData.pages.length} Seiten</span>
              <span class="section-badge">${storyData.level}</span>
            </div>
          </div>
          <div id="story-pages">
            ${this.renderStoryPage(storyData, 0, showExplanations)}
          </div>
        </div>`;
    }

    // Past days
    const allDates = getAvailableDates();
    const pastDates = allDates.filter(d => d !== dateStr).slice(0, 3);
    if (pastDates.length > 0) {
      html += `
        <div class="section-divider"></div>
        <div class="section-header" style="margin-top: var(--space-lg);">
          <span class="section-icon">📅</span>
          <span class="section-title">Ältere Geschichten</span>
        </div>
        <div class="library-grid">`;
      pastDates.forEach(d => {
        const c = getContentForDate(d);
        const di = formatDateDisplay(d);
        html += `
          <div class="library-item" onclick="App.loadDateStory('${d}')">
            <div class="library-item-date">
              <div class="library-item-day">${di.day}</div>
              <div class="library-item-month">${di.monthShort}</div>
            </div>
            <div class="library-item-content">
              <div class="library-item-title">${c ? c.story.title : '—'}</div>
              <div class="library-item-preview">${c ? c.story.topic + ' · ' + c.story.level : ''}</div>
            </div>
            <div class="library-item-arrow">›</div>
          </div>`;
      });
      html += '</div>';
    }

    container.innerHTML = html;
    this._currentStoryPage = 0;
    this._currentStoryDate = dateStr;
    this._currentStoryData = storyData;
  },

  renderStoryPage(story, pageIndex, showExplanations) {
    const page = story.pages[pageIndex];
    const totalPages = story.pages.length;

    let html = '';
    page.forEach(sentence => {
      const isSaved = Store.isSentenceSaved(sentence.italian);
      html += `
        <div class="story-sentence">
          <div class="sentence-italian">${this.makeInteractive(sentence.italian, [], sentence.italian, sentence.german)}</div>
          <div class="sentence-german">${sentence.german}</div>
          ${showExplanations && sentence.note ? `<div class="sentence-explanation">${sentence.note}</div>` : ''}
          <div class="card-actions">
            <button class="save-btn ${isSaved ? 'saved' : ''}"
              onclick="App.saveSentence('${this.esc(sentence.italian)}', '${this.esc(sentence.german)}')"
              title="Satz speichern">🔖</button>
          </div>
        </div>`;
    });

    const progress = ((pageIndex + 1) / totalPages) * 100;
    html += `
      <div class="story-progress">
        <div class="story-progress-bar">
          <div class="story-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="story-progress-text">Seite ${pageIndex + 1} / ${totalPages}</span>
      </div>
      <div class="story-nav">
        <button class="story-nav-btn" ${pageIndex === 0 ? 'disabled' : ''}
          onclick="App.storyPage(${pageIndex - 1})">← Zurück</button>
        <span class="story-page-indicator"></span>
        <button class="story-nav-btn" ${pageIndex >= totalPages - 1 ? 'disabled' : ''}
          onclick="App.storyPage(${pageIndex + 1})">Weiter →</button>
      </div>`;

    return html;
  },

  // ==========================================
  // NEWS VIEW
  // ==========================================
  renderNews(dateStr, news) {
    const container = document.getElementById('news-content');
    const content = getContentForDate(dateStr);
    const dateInfo = formatDateDisplay(dateStr);
    const settings = Store.getSettings();

    const newsList = news || (content ? content.news : []);
    const hasApiKey = !!settings.openaiKey;

    let html = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
        <div>
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem;">Tagesnachrichten</h2>
          <p style="color: var(--text-tertiary); font-size: 0.82rem; margin-top: 2px;">${dateInfo.full}</p>
        </div>
        <span class="section-badge">${newsList.length} Artikel</span>
      </div>`;

    if (hasApiKey) {
      html += `
        <button class="ai-generate-btn" onclick="App.aiGenerateNews()" id="btn-ai-news">
          <span class="ai-btn-icon">✨</span> Neue Nachrichten mit AI generieren
        </button>`;
    }

    if (newsList.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">🗞️</div>
          <div class="vocab-empty-text">
            ${hasApiKey ? 'Tippe oben, um aktuelle Nachrichten zu generieren.' : 'Kein Inhalt für heute verfügbar.'}
          </div>
        </div>`;
    } else {
      newsList.forEach(n => {
        html += `
          <div class="card news-card">
            <div class="news-category">${n.category}</div>
            <div class="news-headline">${n.headline}</div>
            <div class="news-italian-summary">${this.makeInteractive(n.italianSummary, [], n.italianSummary, n.german)}</div>
            <div class="news-german">${n.german}</div>
            <a class="news-source" href="${n.source}" target="_blank" rel="noopener">
              ${n.sourceName} →
            </a>
          </div>`;
      });
    }

    // Past days
    const allDates = getAvailableDates();
    const pastDates = allDates.filter(d => d !== dateStr).slice(0, 3);
    if (pastDates.length > 0) {
      html += `
        <div class="section-divider"></div>
        <div class="section-header" style="margin-top: var(--space-lg);">
          <span class="section-icon">📅</span>
          <span class="section-title">Ältere Nachrichten</span>
        </div>
        <div class="library-grid">`;
      pastDates.forEach(d => {
        const c = getContentForDate(d);
        const di = formatDateDisplay(d);
        html += `
          <div class="library-item" onclick="App.loadDateNews('${d}')">
            <div class="library-item-date">
              <div class="library-item-day">${di.day}</div>
              <div class="library-item-month">${di.monthShort}</div>
            </div>
            <div class="library-item-content">
              <div class="library-item-title">${c ? c.news.length + ' Nachrichten' : '—'}</div>
              <div class="library-item-preview">${di.weekday}</div>
            </div>
            <div class="library-item-arrow">›</div>
          </div>`;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  },

  // ==========================================
  // TRANSLATOR VIEW
  // ==========================================
  renderTranslator() {
    const container = document.getElementById('translator-content');

    let html = `
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">Übersetzer & Wörterbuch</h2>

      <!-- Translation Box -->
      <div class="card">
        <div class="translator-direction" id="translator-direction">
          <button class="translator-lang active" data-lang="de-it" onclick="App.setTranslationDir('de-it')">🇩🇪 → 🇮🇹</button>
          <button class="translator-lang" data-lang="it-de" onclick="App.setTranslationDir('it-de')">🇮🇹 → 🇩🇪</button>
        </div>
        <div class="translator-input-wrap">
          <textarea class="translator-input" id="translator-input" placeholder="Satz oder Wort eingeben…" rows="3"></textarea>
          <button class="translator-clear" id="translator-clear" title="Löschen">✕</button>
        </div>
        <button class="translator-btn" id="translator-btn" onclick="App.doTranslate()">
          <span id="translator-btn-text">Übersetzen</span>
        </button>
        <div class="translator-result" id="translator-result" style="display: none;">
          <div class="translator-result-text" id="translator-result-text"></div>
          <div class="translator-result-actions">
            <button class="save-btn" onclick="App.saveTranslation()" title="In Vokabeln speichern">🔖 Speichern</button>
          </div>
        </div>
      </div>

      <!-- WordReference -->
      <div class="card" style="margin-top: var(--space-md);">
        <div class="section-header" style="margin-bottom: var(--space-sm);">
          <span class="section-icon">📘</span>
          <span class="section-title">WordReference</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-md); line-height: 1.5;">
          Detaillierte Wortbedeutungen, Konjugationen und Beispielsätze von WordReference.
        </p>
        <div class="translator-input-wrap">
          <input type="text" class="translator-input" id="wr-input" placeholder="Italienisches Wort eingeben…" style="height: auto; padding: 12px 40px 12px 16px;">
        </div>
        <div class="wr-buttons">
          <button class="translator-btn wr-btn" onclick="App.lookupWordReference('iten')">
            🇮🇹→🇬🇧 Nachschlagen
          </button>
          <button class="translator-btn wr-btn secondary" onclick="App.lookupWordReference('itde')">
            🇮🇹→🇩🇪 Deutsch
          </button>
        </div>
      </div>

      <!-- Quick phrases -->
      <div class="card" style="margin-top: var(--space-md);">
        <div class="section-header" style="margin-bottom: var(--space-sm);">
          <span class="section-icon">⚡</span>
          <span class="section-title">Schnell übersetzen</span>
        </div>
        <div class="quick-phrases">
          <button class="quick-phrase" onclick="App.quickTranslate('Wo ist die nächste Apotheke?')">Wo ist die nächste Apotheke?</button>
          <button class="quick-phrase" onclick="App.quickTranslate('Ich hätte gerne die Rechnung.')">Ich hätte gerne die Rechnung.</button>
          <button class="quick-phrase" onclick="App.quickTranslate('Können Sie das wiederholen?')">Können Sie das wiederholen?</button>
          <button class="quick-phrase" onclick="App.quickTranslate('Wie komme ich zum Bahnhof?')">Wie komme ich zum Bahnhof?</button>
          <button class="quick-phrase" onclick="App.quickTranslate('Das schmeckt sehr gut!')">Das schmeckt sehr gut!</button>
        </div>
      </div>`;

    container.innerHTML = html;

    // Setup clear button & enter key
    const input = document.getElementById('translator-input');
    const clearBtn = document.getElementById('translator-clear');
    clearBtn.addEventListener('click', () => {
      input.value = '';
      document.getElementById('translator-result').style.display = 'none';
      input.focus();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        App.doTranslate();
      }
    });

    // WR enter key
    const wrInput = document.getElementById('wr-input');
    wrInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        App.lookupWordReference('iten');
      }
    });
  },

  // ==========================================
  // MORE HUB VIEW
  // ==========================================
  renderMore() {
    const container = document.getElementById('more-content');
    const settings = Store.getSettings();
    const vocab = Store.getVocabulary();

    let html = `
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">Mehr</h2>

      <div class="more-menu">
        <div class="library-item" onclick="App.switchSubView('vocabulary')">
          <div class="more-menu-icon">💬</div>
          <div class="library-item-content">
            <div class="library-item-title">Vokabeln</div>
            <div class="library-item-preview">${vocab.words.length} Wörter · ${vocab.sentences.length} Sätze</div>
          </div>
          <div class="library-item-arrow">›</div>
        </div>
        <div class="library-item" onclick="App.switchSubView('library')">
          <div class="more-menu-icon">📅</div>
          <div class="library-item-content">
            <div class="library-item-title">Archiv</div>
            <div class="library-item-preview">Vergangene Lektionen durchstöbern</div>
          </div>
          <div class="library-item-arrow">›</div>
        </div>
        <div class="library-item" onclick="App.switchSubView('settings')">
          <div class="more-menu-icon">⚙️</div>
          <div class="library-item-content">
            <div class="library-item-title">Einstellungen</div>
            <div class="library-item-preview">Level, Themen, API & Design</div>
          </div>
          <div class="library-item-arrow">›</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: var(--space-2xl); color: var(--text-tertiary); font-size: 0.8rem;">
        <p style="font-family: var(--font-serif); font-size: 1rem; margin-bottom: 4px;">Italiano Ogni Giorno</p>
        <p>v2.0 · Mit ❤️ für alle, die Italienisch lieben.</p>
      </div>`;

    container.innerHTML = html;
  },

  // ==========================================
  // LIBRARY VIEW
  // ==========================================
  renderLibrary() {
    const container = document.getElementById('library-content');
    const dates = getAvailableDates();

    let html = `
      <button class="back-btn" onclick="App.switchView('more', true)">← Zurück</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">Archiv</h2>`;

    if (dates.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">📚</div>
          <div class="vocab-empty-text">Noch keine vergangenen Tage verfügbar.</div>
        </div>`;
    } else {
      html += '<div class="library-grid">';
      dates.forEach(dateStr => {
        const content = getContentForDate(dateStr);
        const dateInfo = formatDateDisplay(dateStr);
        html += `
          <div class="library-item" onclick="App.openLibraryDay('${dateStr}')">
            <div class="library-item-date">
              <div class="library-item-day">${dateInfo.day}</div>
              <div class="library-item-month">${dateInfo.monthShort}</div>
            </div>
            <div class="library-item-content">
              <div class="library-item-title">${content.story.title}</div>
              <div class="library-item-preview">${content.sentences.length} Sätze · ${content.news.length} Nachrichten · ${content.story.level}</div>
            </div>
            <div class="library-item-arrow">›</div>
          </div>`;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  },

  renderLibraryDay(dateStr) {
    const container = document.getElementById('library-content');
    const content = getContentForDate(dateStr);

    if (!content) {
      container.innerHTML = '<p>Inhalt nicht gefunden.</p>';
      return;
    }

    const dateInfo = formatDateDisplay(dateStr);
    const settings = Store.getSettings();
    const showExplanations = settings.showExplanations;

    let html = `
      <button class="back-btn" onclick="App.showLibrary()">← Zurück zum Archiv</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 4px;">${dateInfo.full}</h2>
      <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-bottom: var(--space-lg);">${content.greeting}</p>`;

    // Sentences
    html += `
      <section class="section">
        <div class="section-header">
          <span class="section-icon">✏️</span>
          <span class="section-title">Tagessätze</span>
        </div>`;
    content.sentences.forEach((s, i) => {
      const isSaved = Store.isSentenceSaved(s.italian);
      html += `
        <div class="card sentence-card card-compact">
          <span class="sentence-number">${i + 1}</span>
          <div class="sentence-italian">${this.makeInteractive(s.italian, s.keywords, s.italian, s.german)}</div>
          <div class="sentence-german">${s.german}</div>
          ${showExplanations ? `<div class="sentence-explanation">${s.explanation}</div>` : ''}
          <div class="card-actions">
            <button class="save-btn ${isSaved ? 'saved' : ''}"
              onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
              title="Satz speichern">🔖</button>
          </div>
        </div>`;
    });
    html += '</section>';

    // Story
    html += `
      <section class="section">
        <div class="section-header">
          <span class="section-icon">📖</span>
          <span class="section-title">${content.story.title}</span>
        </div>
        <div class="card">`;
    content.story.pages.forEach((page, pi) => {
      html += `<div style="margin-bottom: var(--space-md); ${pi > 0 ? 'padding-top: var(--space-md); border-top: 2px solid var(--border-light);' : ''}">`;
      page.forEach(sentence => {
        html += `
          <div class="story-sentence">
            <div class="sentence-italian">${this.makeInteractive(sentence.italian, [], sentence.italian, sentence.german)}</div>
            <div class="sentence-german">${sentence.german}</div>
            ${showExplanations && sentence.note ? `<div class="sentence-explanation">${sentence.note}</div>` : ''}
          </div>`;
      });
      html += '</div>';
    });
    html += '</div></section>';

    // News
    html += `
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🗞️</span>
          <span class="section-title">Nachrichten</span>
        </div>`;
    content.news.forEach(n => {
      html += `
        <div class="card news-card card-compact">
          <div class="news-category">${n.category}</div>
          <div class="news-headline">${n.headline}</div>
          <div class="news-italian-summary">${this.makeInteractive(n.italianSummary, [], n.italianSummary, n.german)}</div>
          <div class="news-german">${n.german}</div>
          <a class="news-source" href="${n.source}" target="_blank" rel="noopener">${n.sourceName} →</a>
        </div>`;
    });
    html += '</section>';

    container.innerHTML = html;
  },

  // ==========================================
  // VOCABULARY VIEW
  // ==========================================
  renderVocabulary(tab = 'sentences') {
    const container = document.getElementById('vocabulary-content');
    const vocab = Store.getVocabulary();

    let html = `
      <button class="back-btn" onclick="App.switchView('more', true)">← Zurück</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">Vokabeln</h2>
      <div class="vocab-tabs">
        <button class="vocab-tab ${tab === 'sentences' ? 'active' : ''}" onclick="App.vocabTab('sentences')">Sätze (${vocab.sentences.length})</button>
        <button class="vocab-tab ${tab === 'words' ? 'active' : ''}" onclick="App.vocabTab('words')">Wörter (${vocab.words.length})</button>
      </div>`;

    if (tab === 'sentences') {
      if (vocab.sentences.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">🔖</div>
            <div class="vocab-empty-text">
              Noch keine Sätze gespeichert.<br>
              Tippe auf 🔖 bei einem Satz, um ihn hier zu speichern.
            </div>
          </div>`;
      } else {
        vocab.sentences.forEach(s => {
          html += `
            <div class="vocab-item">
              <div>
                <div class="vocab-italian">${s.italian}</div>
                <div class="vocab-german">${s.german}</div>
              </div>
              <button class="vocab-delete" onclick="App.removeSentence('${this.esc(s.italian)}')" title="Entfernen">✕</button>
            </div>`;
        });
      }
    } else {
      if (vocab.words.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">💬</div>
            <div class="vocab-empty-text">
              Noch keine Wörter gespeichert.<br>
              Tippe auf ein Wort im Text, um es zu speichern.
            </div>
          </div>`;
      } else {
        vocab.words.forEach(w => {
          html += `
            <div class="vocab-item">
              <div>
                <div class="vocab-italian">${w.italian}</div>
                <div class="vocab-german">${w.german}</div>
              </div>
              <div style="display:flex; gap: 4px; align-items: center;">
                <button class="vocab-wr-btn" onclick="window.open('${AI.getWordReferenceUrl(w.italian)}', '_blank')" title="In WordReference nachschlagen">📘</button>
                <button class="vocab-delete" onclick="App.removeWord('${this.esc(w.italian)}')" title="Entfernen">✕</button>
              </div>
            </div>`;
        });
      }
    }

    container.innerHTML = html;
  },

  // ==========================================
  // SETTINGS VIEW
  // ==========================================
  renderSettings() {
    const container = document.getElementById('settings-content');
    const settings = Store.getSettings();
    const theme = Store.getTheme();

    const levels = ['A1', 'A2', 'B1', 'B2'];
    const topics = [
      { id: 'Alltag', label: '🏠 Alltag' },
      { id: 'Reisen', label: '✈️ Reisen' },
      { id: 'Kultur', label: '🎨 Kultur' },
      { id: 'Beruf', label: '💼 Beruf' },
      { id: 'Essen', label: '🍝 Essen & Trinken' },
      { id: 'Sport', label: '⚽ Sport' }
    ];

    let html = `
      <button class="back-btn" onclick="App.switchView('more', true)">← Zurück</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">Einstellungen</h2>

      <!-- Level -->
      <div class="settings-group">
        <div class="settings-group-title">Lernniveau</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">Dein Level</span>
          <span class="settings-item-value">${settings.level}</span>
        </div>
        <div class="level-options">
          ${levels.map(l => `
            <button class="level-option ${settings.level === l ? 'active' : ''}"
              onclick="App.setLevel('${l}')">${l}</button>
          `).join('')}
        </div>
      </div>

      <!-- Sentence Count -->
      <div class="settings-group">
        <div class="settings-group-title">Sätze pro Tag</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">Anzahl Tagessätze</span>
          <span class="settings-item-value">${settings.sentenceCount}</span>
        </div>
        <div class="level-options">
          ${[3, 5, 7, 10].map(n => `
            <button class="level-option ${settings.sentenceCount === n ? 'active' : ''}"
              onclick="App.setSentenceCount(${n})">${n}</button>
          `).join('')}
        </div>
      </div>

      <!-- Topics -->
      <div class="settings-group">
        <div class="settings-group-title">Themen</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">Deine Interessen</span>
          <span class="settings-item-value">${settings.topics.length} ausgewählt</span>
        </div>
        <div class="topic-pills">
          ${topics.map(t => `
            <button class="topic-pill ${settings.topics.includes(t.id) ? 'active' : ''}"
              onclick="App.toggleTopic('${t.id}')">${t.label}</button>
          `).join('')}
        </div>
      </div>

      <!-- Explanations -->
      <div class="settings-group">
        <div class="settings-group-title">Anzeige</div>
        <div class="settings-item" style="border-radius: var(--radius-md);" onclick="App.toggleExplanations()">
          <span class="settings-item-label">Erklärungen anzeigen</span>
          <button class="toggle ${settings.showExplanations ? 'active' : ''}" id="toggle-explanations"></button>
        </div>
      </div>

      <!-- OpenAI API Key -->
      <div class="settings-group">
        <div class="settings-group-title">AI-Inhalte (OpenAI)</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0; flex-direction: column; align-items: stretch; gap: var(--space-sm);">
          <span class="settings-item-label">OpenAI API-Schlüssel</span>
          <p style="font-size: 0.78rem; color: var(--text-tertiary); line-height: 1.4;">
            Für AI-generierte Sätze, Geschichten & Nachrichten. Dein Schlüssel bleibt lokal auf deinem Gerät.
          </p>
          <div class="translator-input-wrap">
            <input type="password" class="translator-input" id="openai-key-input"
              placeholder="sk-..." value="${settings.openaiKey || ''}"
              style="height: auto; padding: 12px 16px; font-size: 0.85rem;">
          </div>
          <button class="translator-btn" onclick="App.saveApiKey()" style="margin-top: 4px;">
            Schlüssel speichern
          </button>
        </div>
        <div class="settings-item" style="border-radius: 0 0 var(--radius-md) var(--radius-md);">
          <span class="settings-item-label">Status</span>
          <span class="settings-item-value">${settings.openaiKey ? '✅ Konfiguriert' : '⚠️ Nicht gesetzt'}</span>
        </div>
      </div>

      <!-- Theme -->
      <div class="settings-group">
        <div class="settings-group-title">Erscheinungsbild</div>
        <div class="settings-item" onclick="App.setTheme('light')" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">☀️ Hell</span>
          <span class="settings-item-value">${theme === 'light' ? '✓' : ''}</span>
        </div>
        <div class="settings-item" onclick="App.setTheme('dark')">
          <span class="settings-item-label">🌙 Dunkel</span>
          <span class="settings-item-value">${theme === 'dark' ? '✓' : ''}</span>
        </div>
        <div class="settings-item" onclick="App.setTheme('auto')" style="border-radius: 0 0 var(--radius-md) var(--radius-md);">
          <span class="settings-item-label">🔄 Automatisch</span>
          <span class="settings-item-value">${theme === 'auto' ? '✓' : ''}</span>
        </div>
      </div>

      <p style="text-align: center; color: var(--text-tertiary); font-size: 0.8rem; margin-top: var(--space-lg); padding-bottom: var(--space-lg);">
        v2.0 · Mit ❤️ gemacht für alle, die Italienisch lieben.
      </p>`;

    container.innerHTML = html;
  },

  // ==========================================
  // HELPERS
  // ==========================================
  makeInteractive(text, keywords, sentenceIt, sentenceDe) {
    const sit = this.escAttr(sentenceIt || text);
    const sde = this.escAttr(sentenceDe || '');
    return text.replace(/([A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF][A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF'\u2019]*)/g, (match) => {
      const isKw = keywords && keywords.some(kw => match.toLowerCase().includes(kw.toLowerCase()));
      const cls = isKw ? 'tappable-word highlight-word' : 'tappable-word';
      return `<span class="${cls}" data-word="${this.escAttr(match)}" data-sentence="${sit}" data-translation="${sde}">${match}</span>`;
    });
  },

  esc(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  },

  escAttr(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  _currentStoryPage: 0,
  _currentStoryDate: null,
  _currentStoryData: null
};
