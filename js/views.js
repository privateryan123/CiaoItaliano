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
    const dateInfo = formatDateDisplay(dateStr);
    console.log('Date info:', dateInfo);

    // Use provided sentences from archive
    const sentenceList = sentences || [];
    console.log('Sentence list:', sentenceList);
    console.log('Sentence list length:', sentenceList ? sentenceList.length : 0);
    
    const sentenceCount = settings.sentenceCount;
    const displayed = sentenceList.slice(0, sentenceCount);
    console.log('Displayed sentences:', displayed);
    console.log('Displayed count:', displayed.length);

    const today = getTodayDateStr();
    const isToday = dateStr === today;
    const canGoForward = dateStr < today;

    let html = `
      <div class="story-nav-header">
        <button class="story-nav-btn" onclick="App.navigateSentences(-1)" title="Vorheriger Tag">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">Tagessätze</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateSentences(1)" title="Nächster Tag" ${!canGoForward ? 'disabled' : ''}>
          <span>→</span>
        </button>
      </div>`;

    if (displayed.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">✏️</div>
          <div class="vocab-empty-text">
            Keine Sätze für diesen Tag verfügbar.
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

    // Add prepared sentences section
    html += `
      <div style="margin-top: var(--space-lg); border-top: 2px solid var(--border-color); padding-top: var(--space-lg);">
        <div style="margin-bottom: var(--space-md);">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-sm);">Vorbereitete Sätze</h2>
          <p style="color: var(--text-tertiary); font-size: 0.85rem;">Lerne mit thematischen Satzsammlungen</p>
        </div>

        <div class="card" style="margin-bottom: var(--space-md);">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">
            Thema wählen:
          </label>
          <select id="sentences-topic-selector" onchange="App.changeSentencesTopic(this.value)" style="width: 100%; padding: 12px; font-size: 1rem; border: 2px solid var(--border-color); border-radius: 12px; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); cursor: pointer;">`;

    // Get selected topic from storage or default to VORSTELLUNG
    const selectedTopic = Store.getSelectedSentencesTopic() || 'VORSTELLUNG';
    const currentSentenceTopic = SentencesData[selectedTopic];

    // Add all topics to dropdown
    Object.keys(SentencesData).forEach(key => {
      const selected = key === selectedTopic ? 'selected' : '';
      html += `<option value="${key}" ${selected}>${SentencesData[key].name}</option>`;
    });

    html += `
          </select>
        </div>`;

    if (!currentSentenceTopic) {
      html += `<div class="vocab-empty" style="padding: var(--space-md);">Thema nicht gefunden.</div>`;
    } else {
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
          <h3 style="font-family: var(--font-serif); font-size: 1.1rem; margin: 0;">${currentSentenceTopic.name}</h3>
          <span class="section-badge">${currentSentenceTopic.sentences.length} Sätze</span>
        </div>`;

      // Render all sentences for this topic
      currentSentenceTopic.sentences.forEach((s, i) => {
        const isSaved = Store.isSentenceSaved(s.italian);
        html += `
          <div class="card sentence-card" style="margin-bottom: var(--space-sm);">
            <span class="sentence-number">${i + 1}</span>
            <div class="sentence-italian">${this.makeInteractive(s.italian, [], s.italian, s.german)}</div>
            <div class="sentence-german">${s.german}</div>
            <div class="card-actions">
              <button class="save-btn ${isSaved ? 'saved' : ''}"
                onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
                title="Satz speichern">🔖</button>
            </div>
          </div>`;
      });
    }
    html += `
      </div>`;

    console.log('Setting container innerHTML. HTML length:', html.length);
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
    
    // Get or create story for this date
    let storyData = story;
    if (!storyData) {
      const cachedStory = Store.getStoryForDate(dateStr);
      if (cachedStory) {
        storyData = cachedStory;
      }
    }
    
    const dateInfo = formatDateDisplay(dateStr);

    let html = `
      <div class="story-nav-header">
        <button class="story-nav-btn" onclick="App.navigateStory(-1)" title="Vorheriger Tag">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">Tagesgeschichte</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateStory(1)" title="Nächster Tag">
          <span>→</span>
        </button>
      </div>`;

    if (!storyData) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">📖</div>
          <div class="vocab-empty-text">
            Für diesen Tag gibt es noch keine Geschichte.<br>
            Nutze die Pfeile, um zu anderen Tagen zu navigieren.
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
    
    // Get or create news for this date
    let newsData = news;
    if (!newsData) {
      const cachedNews = Store.getNewsForDate(dateStr);
      if (cachedNews) {
        newsData = cachedNews;
      }
    }
    
    const dateInfo = formatDateDisplay(dateStr);
    const newsList = newsData || [];
    const today = getTodayDateStr();
    const canGoForward = dateStr < today;

    let html = `
      <div class="story-nav-header">
        <button class="story-nav-btn" onclick="App.navigateNews(-1)" title="Vorheriger Tag">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">Nachrichten aus Italien</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateNews(1)" title="Nächster Tag" ${!canGoForward ? 'disabled' : ''}>
          <span>→</span>
        </button>
      </div>`;

    if (newsList.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">🗞️</div>
          <div class="vocab-empty-text">
            Für diesen Tag gibt es noch keine Nachrichten.<br>
            Nutze die Pfeile, um zu anderen Tagen zu navigieren.
          </div>
        </div>`;
    } else {
      newsList.forEach(n => {
        html += `
          <div class="card news-card">
            <div class="news-category">${n.category}</div>
            <div class="news-headline">${n.headline}</div>`;
        
        // Display sentence by sentence
        if (n.sentences && n.sentences.length > 0) {
          n.sentences.forEach((s, idx) => {
            html += `
              <div class="news-sentence-pair" style="margin: var(--space-sm) 0; padding: var(--space-sm); background: var(--bg-secondary); border-radius: var(--radius-sm);">
                <div class="news-italian" style="font-style: italic; margin-bottom: 4px;">
                  ${this.makeInteractive(s.italian, [], s.italian, s.german)}
                </div>
                <div class="news-german" style="color: var(--text-secondary); font-size: 0.9rem;">
                  ${s.german}
                </div>
              </div>`;
          });
        } else if (n.italianSummary) {
          // Fallback for old format
          html += `
            <div class="news-italian-summary">${this.makeInteractive(n.italianSummary, [], n.italianSummary, n.german)}</div>
            <div class="news-german">${n.german}</div>`;
        }
        
        html += `
            <a class="news-source" href="${n.url || n.source || '#'}" target="_blank" rel="noopener" style="margin-top: var(--space-sm); display: inline-block;">
              ANSA.it →
            </a>
          </div>`;
      });
    }

    container.innerHTML = html;
  },

  // ==========================================
  // VERBS VIEW
  // ==========================================
  renderVerbs(selectedVerb) {
    const container = document.getElementById('verbs-content');
    
    // Default to ESSERE if no verb selected
    const verbKey = selectedVerb || 'ESSERE';
    const currentVerb = VerbData[verbKey];
    
    if (!currentVerb) {
      container.innerHTML = '<div class="vocab-empty">Verb nicht gefunden.</div>';
      return;
    }

    const settings = Store.getSettings();
    const showExplanations = settings.showExplanations;

    let html = `
      <div style="margin-bottom: var(--space-md);">
        <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-sm);">Verben üben</h2>
        <p style="color: var(--text-tertiary); font-size: 0.85rem;">Wähle ein Verb und übe mit Beispielsätzen</p>
      </div>

      <div class="card" style="margin-bottom: var(--space-md);">
        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">
          Verb auswählen:
        </label>
        <select id="verb-selector" onchange="App.changeVerb(this.value)" style="width: 100%; padding: 12px; font-size: 1rem; border: 2px solid var(--border-color); border-radius: 12px; background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); cursor: pointer;">`;
    
    // Add all verbs to dropdown
    Object.keys(VerbData).forEach(key => {
      const selected = key === verbKey ? 'selected' : '';
      html += `<option value="${key}" ${selected}>${VerbData[key].name}</option>`;
    });
    
    html += `
        </select>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
        <h3 style="font-family: var(--font-serif); font-size: 1.1rem; margin: 0;">${currentVerb.name}</h3>
        <span class="section-badge">${currentVerb.sentences.length} Sätze</span>
      </div>`;

    // Render all sentences for this verb
    currentVerb.sentences.forEach((s, i) => {
      const isSaved = Store.isSentenceSaved(s.italian);
      html += `
        <div class="card sentence-card" style="margin-bottom: var(--space-sm);">
          <span class="sentence-number">${i + 1}</span>
          <div class="sentence-italian">${this.makeInteractive(s.italian, [], s.italian, s.german)}</div>
          <div class="sentence-german">${s.german}</div>
          <div class="card-actions">
            <button class="save-btn ${isSaved ? 'saved' : ''}"
              onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
              title="Satz speichern">🔖</button>
          </div>
        </div>`;
    });

    container.innerHTML = html;
  },

  // ==========================================
  // TRANSLATOR VIEW
  // ==========================================
  renderTranslator(tab = 'sentences') {
    const container = document.getElementById('translator-content');
    const vocab = Store.getVocabulary();

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
          <button class="translator-btn wr-btn" onclick="App.lookupWordReference()">
            🇮🇹→🇩🇪 Nachschlagen
          </button>
        </div>
      </div>

      <!-- Vocabulary Tabs -->
      <div class="vocab-tabs" style="margin-top: var(--space-md);">
        <button class="vocab-tab ${tab === 'sentences' ? 'active' : ''}" onclick="App.translatorTab('sentences')">Sätze (${vocab.sentences.length})</button>
        <button class="vocab-tab ${tab === 'words' ? 'active' : ''}" onclick="App.translatorTab('words')">Wörter (${vocab.words.length})</button>
      </div>`;

    if (tab === 'sentences') {
      html += `
      <!-- Saved Sentences -->
      <div class="card">
        <div class="section-header" style="margin-bottom: var(--space-md);">
          <span class="section-icon">🔖</span>
          <span class="section-title">Gespeicherte Sätze</span>
        </div>`;

      if (vocab.sentences.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">🔖</div>
            <div class="vocab-empty-text">
              Noch keine Sätze gespeichert.
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

      html += `</div>`;
    } else {
      html += `
      <!-- Saved Words -->
      <div class="card">
        <div class="section-header" style="margin-bottom: var(--space-md);">
          <span class="section-icon">💬</span>
          <span class="section-title">Gespeicherte Wörter</span>
        </div>`;

      if (vocab.words.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">💬</div>
            <div class="vocab-empty-text">
              Noch keine Wörter gespeichert.
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

      html += `</div>`;
    }

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
        App.lookupWordReference();
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
      { id: 'Sport', label: '⚽ Sport' },
      { id: 'Familie', label: '👨‍👩‍👧 Familie' },
      { id: 'Kinder', label: '👶 Kinder' },
      { id: 'Haus und Garten', label: '🏡 Haus & Garten' },
      { id: 'Auto', label: '🚗 Auto' },
      { id: 'Hobbies', label: '🎯 Hobbies' }
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
