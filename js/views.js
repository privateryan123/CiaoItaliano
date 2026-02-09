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
        <button class="story-nav-btn" onclick="App.navigateSentences(-1)" title="${I18n.t('previousDay')}">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">${I18n.t('dailySentences')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;${isToday ? ' text-decoration: underline;' : ''}">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateSentences(1)" title="${I18n.t('nextDay')}" ${!canGoForward ? 'disabled' : ''}>
          <span>→</span>
        </button>
      </div>`;

    if (displayed.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">✏️</div>
          <div class="vocab-empty-text">
            ${I18n.t('noSentencesAvailable')}
          </div>
        </div>`;
    } else {
      displayed.forEach((s, i) => {
        const isSaved = Store.isSentenceSaved(s.italian);
        html += `
          <div class="card sentence-card">
            <div class="sentence-header">
              <button class="save-btn ${isSaved ? 'saved' : ''}"
                onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
                title="${I18n.t('saveSentence')}">🔖</button>
              <span class="sentence-number">${i + 1}</span>
            </div>
            <div class="sentence-italian">${this.makeInteractive(s.italian, s.keywords, s.italian, s.german)}</div>
            <div class="sentence-german">${s.german}</div>
            ${showExplanations && s.explanation ? `<div class="sentence-explanation">${s.explanation}</div>` : ''}
          </div>`;
      });
    }



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
    const today = getTodayDateStr();
    const isToday = dateStr === today;

    let html = `
      <div class="story-nav-header">
        <button class="story-nav-btn" onclick="App.navigateStory(-1)" title="${I18n.t('previousDay')}">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">${I18n.t('dailyStory')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;${isToday ? ' text-decoration: underline;' : ''}">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateStory(1)" title="${I18n.t('nextDay')}">
          <span>→</span>
        </button>
      </div>`;

    if (!storyData) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">📖</div>
          <div class="vocab-empty-text">
            ${I18n.t('noStoryAvailable')}<br>
            ${I18n.t('useArrowsToNavigate')}
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
    page.forEach((sentence, i) => {
      const isSaved = Store.isSentenceSaved(sentence.italian);
      html += `
        <div class="story-sentence">
          <div class="sentence-header">
            <button class="save-btn ${isSaved ? 'saved' : ''}"
              onclick="App.saveSentence('${this.esc(sentence.italian)}', '${this.esc(sentence.german)}')"
              title="${I18n.t('saveSentence')}">🔖</button>
            <span class="sentence-number">${i + 1}</span>
          </div>
          <div class="sentence-italian">${this.makeInteractive(sentence.italian, [], sentence.italian, sentence.german)}</div>
          <div class="sentence-german">${sentence.german}</div>
          ${showExplanations && sentence.note ? `<div class="sentence-explanation">${sentence.note}</div>` : ''}
        </div>`;
    });

    const progress = ((pageIndex + 1) / totalPages) * 100;
    html += `
      <div class="story-progress">
        <div class="story-progress-bar">
          <div class="story-progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="story-progress-text">${I18n.t('page')} ${pageIndex + 1} / ${totalPages}</span>
      </div>
      <div class="story-nav">
        <button class="story-nav-btn" ${pageIndex === 0 ? 'disabled' : ''}
          onclick="App.storyPage(${pageIndex - 1})">← ${I18n.t('back')}</button>
        <span class="story-page-indicator"></span>
        <button class="story-nav-btn" ${pageIndex >= totalPages - 1 ? 'disabled' : ''}
          onclick="App.storyPage(${pageIndex + 1})">${I18n.t('next')} →</button>
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
    const isToday = dateStr === today;
    const canGoForward = dateStr < today;

    let html = `
      <div class="story-nav-header">
        <button class="story-nav-btn" onclick="App.navigateNews(-1)" title="${I18n.t('previousDay')}">
          <span>←</span>
        </button>
        <div style="text-align: center; flex: 1;">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: 0;">${I18n.t('newsFromItaly')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-top: 4px;${isToday ? ' text-decoration: underline;' : ''}">${dateInfo.full}</p>
        </div>
        <button class="story-nav-btn" onclick="App.navigateNews(1)" title="${I18n.t('nextDay')}" ${!canGoForward ? 'disabled' : ''}>
          <span>→</span>
        </button>
      </div>`;

    if (newsList.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">🗞️</div>
          <div class="vocab-empty-text">
            ${I18n.t('noNewsAvailable')}<br>
            ${I18n.t('useArrowsToNavigate')}
          </div>
        </div>`;
    } else {
      newsList.forEach((n, idx) => {
        html += `
          <div class="card news-card" onclick="App.toggleNewsCard(${idx})" data-news-idx="${idx}">
            <div class="news-header">
              <div>
                <div class="news-category">${n.category}</div>
                <div class="news-headline">${n.headline}</div>
              </div>
              <span class="news-toggle-icon">▼</span>
            </div>
            <div class="news-content">`;
        
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
              <a class="news-source" href="${n.url || n.source || '#'}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
                ${n.sourceName || 'ANSA.it'} →
              </a>
            </div>
          </div>`;
      });
    }

    container.innerHTML = html;
  },

  // ==========================================
  // VERBS VIEW
  // ==========================================
  renderVerbs(selectedVerb, tab = 'verbs') {
    const container = document.getElementById('verbs-content');
    
    // Tab selector using vocab-tabs styling
    let html = `
      <div class="vocab-tabs" style="margin-bottom: var(--space-lg);">
        <button class="vocab-tab ${tab === 'verbs' ? 'active' : ''}" onclick="App.verbTab('verbs')">
          ${I18n.t('verbs')}
        </button>
        <button class="vocab-tab ${tab === 'sentences' ? 'active' : ''}" onclick="App.verbTab('sentences')">
          ${I18n.t('preparedSentences')}
        </button>
        <button class="vocab-tab ${tab === 'essentials' ? 'active' : ''}" onclick="App.verbTab('essentials')">
          ${I18n.t('essentials')}
        </button>
      </div>`;

    if (tab === 'verbs') {
      // VERBS TAB
      const verbKey = selectedVerb || 'ESSERE';
      const currentVerb = VerbData[verbKey];
      
      if (!currentVerb) {
        container.innerHTML = html + `<div class="vocab-empty">${I18n.t('notFound')}</div>`;
        return;
      }

      const settings = Store.getSettings();
      const showExplanations = settings.showExplanations;

      html += `
        <div style="margin-bottom: var(--space-md);">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-sm);">${I18n.t('practiceVerbs')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.85rem;">${I18n.t('selectVerbToPractice')}</p>
        </div>

        <div class="card" style="margin-bottom: var(--space-md);">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">
            ${I18n.t('selectVerb')}
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
          <span class="section-badge">${currentVerb.sentences.length} ${I18n.t('sentences')}</span>
        </div>`;

      // Render all sentences for this verb
      currentVerb.sentences.forEach((s, i) => {
        const isSaved = Store.isSentenceSaved(s.italian);
        html += `
          <div class="card sentence-card" style="margin-bottom: var(--space-sm);">
            <div class="sentence-header">
              <button class="save-btn ${isSaved ? 'saved' : ''}"
                onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
                title="${I18n.t('saveSentence')}">🔖</button>
              <span class="sentence-number">${i + 1}</span>
            </div>
            <div class="sentence-italian">${this.makeInteractive(s.italian, [], s.italian, s.german)}</div>
            <div class="sentence-german">${s.german}</div>
          </div>`;
      });
    } else if (tab === 'sentences') {
      // PREPARED SENTENCES TAB
      html += `
        <div style="margin-bottom: var(--space-md);">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-sm);">${I18n.t('preparedSentences')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.85rem;">${I18n.t('learnWithThematic')}</p>
        </div>

        <div class="card" style="margin-bottom: var(--space-md);">
          <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">
            ${I18n.t('selectTopic')}
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
        html += `<div class="vocab-empty" style="padding: var(--space-md);">${I18n.t('notFound')}</div>`;
      } else {
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
            <h3 style="font-family: var(--font-serif); font-size: 1.1rem; margin: 0;">${currentSentenceTopic.name}</h3>
            <span class="section-badge">${currentSentenceTopic.sentences.length} ${I18n.t('sentences')}</span>
          </div>`;

        // Render all sentences for this topic
        currentSentenceTopic.sentences.forEach((s, i) => {
          const isSaved = Store.isSentenceSaved(s.italian);
          html += `
            <div class="card sentence-card" style="margin-bottom: var(--space-sm);">
              <div class="sentence-header">
                <button class="save-btn ${isSaved ? 'saved' : ''}"
                  onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
                  title="${I18n.t('saveSentence')}">🔖</button>
                <span class="sentence-number">${i + 1}</span>
              </div>
              <div class="sentence-italian">${this.makeInteractive(s.italian, [], s.italian, s.german)}</div>
              <div class="sentence-german">${s.german}</div>
            </div>`;
        });
      }
    } else if (tab === 'essentials') {
      // ESSENTIALS TAB - Numbers, Months, Weekdays
      html += `
        <div style="margin-bottom: var(--space-md);">
          <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-sm);">${I18n.t('essentials')}</h2>
          <p style="color: var(--text-tertiary); font-size: 0.85rem;">${I18n.t('essentialsDescription')}</p>
        </div>`;

      // Numbers
      const numbers = [
        { it: 'zero', de: 'null', num: '0' },
        { it: 'uno', de: 'eins', num: '1' },
        { it: 'due', de: 'zwei', num: '2' },
        { it: 'tre', de: 'drei', num: '3' },
        { it: 'quattro', de: 'vier', num: '4' },
        { it: 'cinque', de: 'fünf', num: '5' },
        { it: 'sei', de: 'sechs', num: '6' },
        { it: 'sette', de: 'sieben', num: '7' },
        { it: 'otto', de: 'acht', num: '8' },
        { it: 'nove', de: 'neun', num: '9' },
        { it: 'dieci', de: 'zehn', num: '10' },
        { it: 'undici', de: 'elf', num: '11' },
        { it: 'dodici', de: 'zwölf', num: '12' },
        { it: 'tredici', de: 'dreizehn', num: '13' },
        { it: 'quattordici', de: 'vierzehn', num: '14' },
        { it: 'quindici', de: 'fünfzehn', num: '15' },
        { it: 'sedici', de: 'sechzehn', num: '16' },
        { it: 'diciassette', de: 'siebzehn', num: '17' },
        { it: 'diciotto', de: 'achtzehn', num: '18' },
        { it: 'diciannove', de: 'neunzehn', num: '19' },
        { it: 'venti', de: 'zwanzig', num: '20' },
        { it: 'ventuno', de: 'einundzwanzig', num: '21' },
        { it: 'trenta', de: 'dreißig', num: '30' },
        { it: 'quaranta', de: 'vierzig', num: '40' },
        { it: 'cinquanta', de: 'fünfzig', num: '50' },
        { it: 'sessanta', de: 'sechzig', num: '60' },
        { it: 'settanta', de: 'siebzig', num: '70' },
        { it: 'ottanta', de: 'achtzig', num: '80' },
        { it: 'novanta', de: 'neunzig', num: '90' },
        { it: 'cento', de: 'hundert', num: '100' },
        { it: 'mille', de: 'tausend', num: '1000' },
        { it: 'un milione', de: 'eine Million', num: '1.000.000' }
      ];

      html += `
        <div class="card" style="margin-bottom: var(--space-md);">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">🔢</span>
            <span class="section-title">${I18n.t('numbers')}</span>
          </div>
          <div class="essentials-grid">`;
      
      numbers.forEach(n => {
        html += `
          <div class="essential-item">
            <span class="essential-num">${n.num}</span>
            <span class="essential-it">${n.it}</span>
            <span class="essential-de">${n.de}</span>
          </div>`;
      });
      
      html += `
          </div>
        </div>`;

      // Months
      const months = [
        { it: 'gennaio', de: 'Januar' },
        { it: 'febbraio', de: 'Februar' },
        { it: 'marzo', de: 'März' },
        { it: 'aprile', de: 'April' },
        { it: 'maggio', de: 'Mai' },
        { it: 'giugno', de: 'Juni' },
        { it: 'luglio', de: 'Juli' },
        { it: 'agosto', de: 'August' },
        { it: 'settembre', de: 'September' },
        { it: 'ottobre', de: 'Oktober' },
        { it: 'novembre', de: 'November' },
        { it: 'dicembre', de: 'Dezember' }
      ];

      html += `
        <div class="card" style="margin-bottom: var(--space-md);">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">📅</span>
            <span class="section-title">${I18n.t('months')}</span>
          </div>
          <div class="essentials-list">`;
      
      months.forEach((m, i) => {
        html += `
          <div class="essential-row">
            <span class="essential-month-num">${i + 1}</span>
            <span class="essential-it">${m.it}</span>
            <span class="essential-de">${m.de}</span>
          </div>`;
      });
      
      html += `
          </div>
        </div>`;

      // Weekdays
      const weekdays = [
        { it: 'lunedì', de: 'Montag' },
        { it: 'martedì', de: 'Dienstag' },
        { it: 'mercoledì', de: 'Mittwoch' },
        { it: 'giovedì', de: 'Donnerstag' },
        { it: 'venerdì', de: 'Freitag' },
        { it: 'sabato', de: 'Samstag' },
        { it: 'domenica', de: 'Sonntag' }
      ];

      html += `
        <div class="card" style="margin-bottom: var(--space-md);">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">📆</span>
            <span class="section-title">${I18n.t('weekdays')}</span>
          </div>
          <div class="essentials-list">`;
      
      weekdays.forEach(w => {
        html += `
          <div class="essential-row">
            <span class="essential-it">${w.it}</span>
            <span class="essential-de">${w.de}</span>
          </div>`;
      });
      
      html += `
          </div>
        </div>`;
    }

    container.innerHTML = html;
  },

  // ==========================================
  // TRANSLATOR VIEW
  // ==========================================
  renderTranslator(tab = 'translator', subTab = 'sentences') {
    const container = document.getElementById('translator-content');
    const vocab = Store.getVocabulary();

    let html = `
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">${I18n.t('translatorDictionary')}</h2>

      <!-- Main Tabs -->
      <div class="vocab-tabs" style="margin-bottom: var(--space-md);">
        <button class="vocab-tab ${tab === 'translator' ? 'active' : ''}" onclick="App.translatorTab('translator')">${I18n.t('translator')}</button>
        <button class="vocab-tab ${tab === 'dictionary' ? 'active' : ''}" onclick="App.translatorTab('dictionary')">${I18n.t('myDictionary')} (${vocab.sentences.length + vocab.words.length})</button>
      </div>`;

    if (tab === 'translator') {
      html += `
      <!-- Translation Box -->
      <div class="card">
        <div class="translator-direction" id="translator-direction">
          <button class="translator-lang active" data-lang="de-it" onclick="App.setTranslationDir('de-it')">🇩🇪 → 🇮🇹</button>
          <button class="translator-lang" data-lang="it-de" onclick="App.setTranslationDir('it-de')">🇮🇹 → 🇩🇪</button>
        </div>
        <div class="translator-input-wrap">
          <textarea class="translator-input" id="translator-input" placeholder="${I18n.t('enterSentenceOrWord')}" rows="3"></textarea>
          <button class="translator-clear" id="translator-clear" title="${I18n.t('clear')}">✕</button>
        </div>
        <button class="translator-btn" id="translator-btn" onclick="App.doTranslate()">
          <span id="translator-btn-text">${I18n.t('translate')}</span>
        </button>
        <div class="translator-result" id="translator-result" style="display: none;">
          <div class="translator-result-text" id="translator-result-text"></div>
          <div class="translator-result-actions">
            <button class="save-btn" onclick="App.saveTranslation()" title="${I18n.t('saveToVocab')}">🔖 ${I18n.t('save')}</button>
          </div>
        </div>
      </div>

      <!-- WordReference -->
      <div class="card" style="margin-top: var(--space-md);">
        <div class="section-header" style="margin-bottom: var(--space-sm);">
          <span class="section-icon">📘</span>
          <span class="section-title">${I18n.t('wordReference')}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-md); line-height: 1.5;">
          ${I18n.t('wordRefDescription')}
        </p>
        <div class="translator-input-wrap">
          <input type="text" class="translator-input" id="wr-input" placeholder="${I18n.t('enterItalianWord')}" style="height: auto; padding: 12px 40px 12px 16px;">
        </div>
        <div class="wr-buttons">
          <button class="translator-btn wr-btn" onclick="App.lookupWordReference()">
            🇮🇹→🇩🇪 ${I18n.t('lookup')}
          </button>
        </div>
      </div>`;
    } else {
      // Dictionary tab - show saved sentences and words
      const totalItems = vocab.sentences.length + vocab.words.length;
      
      html += `
      <!-- Quiz Start Button -->
      <div class="card quiz-start-card" style="margin-bottom: var(--space-md); text-align: center;">
        <button class="quiz-start-btn" onclick="App.showQuizSettings()" ${totalItems === 0 ? 'disabled' : ''}>
          🎯 ${I18n.t('startQuiz')}
        </button>
        ${totalItems === 0 ? `<p style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: var(--space-sm);">${I18n.t('addItemsFirst')}</p>` : ''}
      </div>
      
      <!-- Sub-tabs for sentences/words -->
      <div class="vocab-tabs vocab-tabs-secondary" style="margin-bottom: var(--space-md);">
        <button class="vocab-tab ${subTab === 'sentences' ? 'active' : ''}" onclick="App.translatorSubTab('sentences')">${I18n.t('sentences')} (${vocab.sentences.length})</button>
        <button class="vocab-tab ${subTab === 'words' ? 'active' : ''}" onclick="App.translatorSubTab('words')">${I18n.t('words')} (${vocab.words.length})</button>
      </div>`;

      if (subTab === 'sentences') {
        html += `
        <!-- Saved Sentences -->
        <div class="card">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">🔖</span>
            <span class="section-title">${I18n.t('savedSentences')}</span>
          </div>`;

        if (vocab.sentences.length === 0) {
          html += `
            <div class="vocab-empty">
              <div class="vocab-empty-icon">🔖</div>
              <div class="vocab-empty-text">
                ${I18n.t('noSentencesSaved')}
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
                <button class="vocab-delete" onclick="App.removeSentence('${this.esc(s.italian)}')" title="${I18n.t('remove')}">✕</button>
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
            <span class="section-title">${I18n.t('savedWords')}</span>
          </div>`;

        if (vocab.words.length === 0) {
          html += `
            <div class="vocab-empty">
              <div class="vocab-empty-icon">💬</div>
              <div class="vocab-empty-text">
                ${I18n.t('noWordsSaved')}
              </div>
            </div>`;
        } else {
          vocab.words.forEach(w => {
            const wrUrl = w.wordRefUrl || AI.getWordReferenceUrl(w.italian);
            const defsHtml = w.definitions && w.definitions.length > 0 
              ? `<div class="vocab-definitions">${w.definitions.slice(0, 3).join(', ')}</div>` 
              : '';
            html += `
              <div class="vocab-item">
                <div>
                  <div class="vocab-italian">${w.italian}</div>
                  <div class="vocab-german">${w.german}</div>
                  ${defsHtml}
                </div>
                <div style="display:flex; gap: 4px; align-items: center;">
                  <button class="vocab-wr-btn" onclick="window.open('${wrUrl}', '_blank')" title="${I18n.t('lookupInWordRef')}">📘</button>
                  <button class="vocab-delete" onclick="App.removeWord('${this.esc(w.italian)}')" title="${I18n.t('remove')}">✕</button>
                </div>
              </div>`;
          });
        }

        html += `</div>`;
      }
    }

    container.innerHTML = html;

    // Setup clear button & enter key (only if translator tab is active)
    if (tab === 'translator') {
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
    }
  },

  // ==========================================
  // MORE HUB VIEW
  // ==========================================
  renderMore() {
    const container = document.getElementById('more-content');
    const settings = Store.getSettings();
    const vocab = Store.getVocabulary();

    let html = `
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">${I18n.t('more')}</h2>

      <div class="more-menu">
        <div class="library-item" onclick="App.switchSubView('library')">
          <div class="more-menu-icon">📅</div>
          <div class="library-item-content">
            <div class="library-item-title">${I18n.t('archive')}</div>
            <div class="library-item-preview">${I18n.t('browsePassedLessons')}</div>
          </div>
          <div class="library-item-arrow">›</div>
        </div>
        <div class="library-item" onclick="App.switchSubView('settings')">
          <div class="more-menu-icon">⚙️</div>
          <div class="library-item-content">
            <div class="library-item-title">${I18n.t('settings')}</div>
            <div class="library-item-preview">${I18n.t('settingsDescription')}</div>
          </div>
          <div class="library-item-arrow">›</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: var(--space-2xl); color: var(--text-tertiary); font-size: 0.8rem;">
        <p style="font-family: var(--font-serif); font-size: 1rem; margin-bottom: 4px;">Italiano Ogni Giorno</p>
        <p>v2.0 · ${I18n.t('madeWithLove')}</p>
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
      <button class="back-btn" onclick="App.switchView('more', true)">← ${I18n.t('backBtn')}</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">${I18n.t('archive')}</h2>`;

    if (dates.length === 0) {
      html += `
        <div class="vocab-empty">
          <div class="vocab-empty-icon">📚</div>
          <div class="vocab-empty-text">${I18n.t('noPastDaysAvailable')}</div>
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
              <div class="library-item-preview">${content.sentences.length} ${I18n.t('sentences')} · ${content.news.length} ${I18n.t('news')} · ${content.story.level}</div>
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
      container.innerHTML = `<p>${I18n.t('notFound')}</p>`;
      return;
    }

    const dateInfo = formatDateDisplay(dateStr);
    const settings = Store.getSettings();
    const showExplanations = settings.showExplanations;

    let html = `
      <button class="back-btn" onclick="App.showLibrary()">← ${I18n.t('backToArchive')}</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 4px;">${dateInfo.full}</h2>
      <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-bottom: var(--space-lg);">${content.greeting}</p>`;

    // Sentences
    html += `
      <section class="section">
        <div class="section-header">
          <span class="section-icon">✏️</span>
          <span class="section-title">${I18n.t('dailySentences')}</span>
        </div>`;
    content.sentences.forEach((s, i) => {
      const isSaved = Store.isSentenceSaved(s.italian);
      html += `
        <div class="card sentence-card card-compact">
          <div class="sentence-header">
            <button class="save-btn ${isSaved ? 'saved' : ''}"
              onclick="App.saveSentence('${this.esc(s.italian)}', '${this.esc(s.german)}')"
              title="${I18n.t('saveSentence')}">🔖</button>
            <span class="sentence-number">${i + 1}</span>
          </div>
          <div class="sentence-italian">${this.makeInteractive(s.italian, s.keywords, s.italian, s.german)}</div>
          <div class="sentence-german">${s.german}</div>
          ${showExplanations ? `<div class="sentence-explanation">${s.explanation}</div>` : ''}
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
          <span class="section-title">${I18n.t('news')}</span>
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
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">${I18n.t('vocabulary')}</h2>
      <div class="vocab-tabs">
        <button class="vocab-tab ${tab === 'sentences' ? 'active' : ''}" onclick="App.vocabTab('sentences')">${I18n.t('sentences')} (${vocab.sentences.length})</button>
        <button class="vocab-tab ${tab === 'words' ? 'active' : ''}" onclick="App.vocabTab('words')">${I18n.t('words')} (${vocab.words.length})</button>
      </div>`;

    if (tab === 'sentences') {
      if (vocab.sentences.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">🔖</div>
            <div class="vocab-empty-text">
              ${I18n.t('noSentencesSaved')}<br>
              ${I18n.t('tapToSaveSentence')}
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
              <button class="vocab-delete" onclick="App.removeSentence('${this.esc(s.italian)}')" title="${I18n.t('remove')}">✕</button>
            </div>`;
        });
      }
    } else {
      if (vocab.words.length === 0) {
        html += `
          <div class="vocab-empty">
            <div class="vocab-empty-icon">💬</div>
            <div class="vocab-empty-text">
              ${I18n.t('noWordsSaved')}<br>
              ${I18n.t('tapWordToSave')}
            </div>
          </div>`;
      } else {
        vocab.words.forEach(w => {
          const wrUrl = w.wordRefUrl || AI.getWordReferenceUrl(w.italian);
          const defsHtml = w.definitions && w.definitions.length > 0 
            ? `<div class="vocab-definitions">${w.definitions.slice(0, 3).join(', ')}</div>` 
            : '';
          html += `
            <div class="vocab-item">
              <div>
                <div class="vocab-italian">${w.italian}</div>
                <div class="vocab-german">${w.german}</div>
                ${defsHtml}
              </div>
              <div style="display:flex; gap: 4px; align-items: center;">
                <button class="vocab-wr-btn" onclick="window.open('${wrUrl}', '_blank')" title="${I18n.t('lookupInWordRef')}">📘</button>
                <button class="vocab-delete" onclick="App.removeWord('${this.esc(w.italian)}')" title="${I18n.t('remove')}">✕</button>
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
      { id: 'Alltag', key: 'topicEveryday' },
      { id: 'Reisen', key: 'topicTravel' },
      { id: 'Kultur', key: 'topicCulture' },
      { id: 'Beruf', key: 'topicWork' },
      { id: 'Essen', key: 'topicFood' },
      { id: 'Sport', key: 'topicSports' },
      { id: 'Familie', key: 'topicFamily' },
      { id: 'Kinder', key: 'topicChildren' },
      { id: 'Haus und Garten', key: 'topicHomeGarden' },
      { id: 'Auto', key: 'topicCar' },
      { id: 'Hobbies', key: 'topicHobbies' }
    ];

    let html = `
      <button class="back-btn" onclick="App.switchView('more', true)">← ${I18n.t('backBtn')}</button>
      <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: var(--space-lg);">${I18n.t('settings')}</h2>

      <!-- Language -->
      <div class="settings-group">
        <div class="settings-group-title">${I18n.t('language')}</div>
        <div class="settings-item" onclick="App.setLanguage('en')" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">🇬🇧 ${I18n.t('english')}</span>
          <span class="settings-item-value">${Store.getLanguage() === 'en' ? '✓' : ''}</span>
        </div>
        <div class="settings-item" onclick="App.setLanguage('de')" style="border-radius: 0 0 var(--radius-md) var(--radius-md);">
          <span class="settings-item-label">🇩🇪 ${I18n.t('german')}</span>
          <span class="settings-item-value">${Store.getLanguage() === 'de' ? '✓' : ''}</span>
        </div>
      </div>

      <!-- Level -->
      <div class="settings-group">
        <div class="settings-group-title">${I18n.t('learningLevel')}</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">${I18n.t('yourLevel')}</span>
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
        <div class="settings-group-title">${I18n.t('sentencesPerDay')}</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">${I18n.t('numberOfSentences')}</span>
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
        <div class="settings-group-title">${I18n.t('topics')}</div>
        <div class="settings-item" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">${I18n.t('yourInterests')}</span>
          <span class="settings-item-value">${settings.topics.length} ${I18n.t('selected')}</span>
        </div>
        <div class="topic-pills">
          ${topics.map(t => `
            <button class="topic-pill ${settings.topics.includes(t.id) ? 'active' : ''}"
              onclick="App.toggleTopic('${t.id}')">${I18n.t(t.key)}</button>
          `).join('')}
        </div>
      </div>

      <!-- Explanations -->
      <div class="settings-group">
        <div class="settings-group-title">${I18n.t('display')}</div>
        <div class="settings-item" style="border-radius: var(--radius-md);" onclick="App.toggleExplanations()">
          <span class="settings-item-label">${I18n.t('showExplanations')}</span>
          <button class="toggle ${settings.showExplanations ? 'active' : ''}" id="toggle-explanations"></button>
        </div>
      </div>

      <!-- Theme -->
      <div class="settings-group">
        <div class="settings-group-title">${I18n.t('appearance')}</div>
        <div class="settings-item" onclick="App.setTheme('light')" style="border-radius: var(--radius-md) var(--radius-md) 0 0;">
          <span class="settings-item-label">☀️ ${I18n.t('light')}</span>
          <span class="settings-item-value">${theme === 'light' ? '✓' : ''}</span>
        </div>
        <div class="settings-item" onclick="App.setTheme('dark')">
          <span class="settings-item-label">🌙 ${I18n.t('dark')}</span>
          <span class="settings-item-value">${theme === 'dark' ? '✓' : ''}</span>
        </div>
        <div class="settings-item" onclick="App.setTheme('auto')" style="border-radius: 0 0 var(--radius-md) var(--radius-md);">
          <span class="settings-item-label">🔄 ${I18n.t('automatic')}</span>
          <span class="settings-item-value">${theme === 'auto' ? '✓' : ''}</span>
        </div>
      </div>

      <p style="text-align: center; color: var(--text-tertiary); font-size: 0.8rem; margin-top: var(--space-lg); padding-bottom: var(--space-lg);">
        v2.0 · ${I18n.t('madeWithLove')}
      </p>`;

    container.innerHTML = html;
  },

  // ==========================================
  // QUIZ VIEWS
  // ==========================================
  renderQuizSettings() {
    const container = document.getElementById('translator-content');
    const vocab = Store.getVocabulary();
    const quizSettings = App.quizSettings || { type: 'both', count: 10 };
    
    const totalSentences = vocab.sentences.length;
    const totalWords = vocab.words.length;
    const maxItems = quizSettings.type === 'sentences' ? totalSentences : 
                     quizSettings.type === 'words' ? totalWords : 
                     totalSentences + totalWords;

    let html = `
      <div class="quiz-settings-container">
        <button class="back-btn" onclick="App.translatorTab('dictionary')">← ${I18n.t('backBtn')}</button>
        
        <h2 style="font-family: var(--font-serif); font-size: 1.3rem; margin: var(--space-md) 0;">${I18n.t('quizSettings')}</h2>
        
        <div class="card">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">📝</span>
            <span class="section-title">${I18n.t('quizType')}</span>
          </div>
          
          <div class="quiz-type-options">
            <label class="quiz-option ${quizSettings.type === 'words' ? 'selected' : ''}">
              <input type="radio" name="quizType" value="words" ${quizSettings.type === 'words' ? 'checked' : ''} onchange="App.setQuizType('words')">
              <span class="quiz-option-label">💬 ${I18n.t('words')} (${totalWords})</span>
            </label>
            <label class="quiz-option ${quizSettings.type === 'sentences' ? 'selected' : ''}">
              <input type="radio" name="quizType" value="sentences" ${quizSettings.type === 'sentences' ? 'checked' : ''} onchange="App.setQuizType('sentences')">
              <span class="quiz-option-label">🔖 ${I18n.t('sentences')} (${totalSentences})</span>
            </label>
            <label class="quiz-option ${quizSettings.type === 'both' ? 'selected' : ''}">
              <input type="radio" name="quizType" value="both" ${quizSettings.type === 'both' ? 'checked' : ''} onchange="App.setQuizType('both')">
              <span class="quiz-option-label">📚 ${I18n.t('both')} (${totalSentences + totalWords})</span>
            </label>
          </div>
        </div>
        
        <div class="card" style="margin-top: var(--space-md);">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">🔢</span>
            <span class="section-title">${I18n.t('numberOfQuestions')}</span>
          </div>
          
          <div class="quiz-count-options">
            ${[5, 10, 20, 'all'].map(n => {
              const val = n === 'all' ? maxItems : n;
              const disabled = val > maxItems;
              const isSelected = quizSettings.count === (n === 'all' ? 'all' : n);
              return `
                <button class="quiz-count-btn ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}" 
                        onclick="App.setQuizCount(${n === 'all' ? "'all'" : n})" 
                        ${disabled ? 'disabled' : ''}>
                  ${n === 'all' ? I18n.t('all') + ' (' + maxItems + ')' : n}
                </button>
              `;
            }).join('')}
          </div>
        </div>
        
        <button class="quiz-start-btn quiz-start-btn-large" onclick="App.startQuiz()" style="margin-top: var(--space-lg);">
          🎯 ${I18n.t('startQuiz')}
        </button>
      </div>`;

    container.innerHTML = html;
  },

  renderQuiz(quizState) {
    const container = document.getElementById('translator-content');
    const { currentIndex, items, score, currentItem, answered, userAnswer, isCorrect, typoPositions } = quizState;
    
    const progress = ((currentIndex) / items.length) * 100;
    const isItalianQuestion = quizState.questionLang === 'italian';
    const questionText = isItalianQuestion ? currentItem.italian : currentItem.german;
    const correctAnswer = isItalianQuestion ? currentItem.german : currentItem.italian;
    
    let html = `
      <div class="quiz-container">
        <div class="quiz-header">
          <button class="quiz-exit-btn" onclick="App.exitQuiz()">✕</button>
          <div class="quiz-progress-info">
            <span>${currentIndex + 1} / ${items.length}</span>
          </div>
          <div class="quiz-score">
            <span class="quiz-score-correct">✓ ${score.correct}</span>
            <span class="quiz-score-wrong">✗ ${score.wrong}</span>
          </div>
        </div>
        
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        
        <div class="card quiz-question-card">
          <div class="quiz-lang-indicator">${isItalianQuestion ? '🇮🇹' : '🇩🇪'}</div>
          <div class="quiz-question">${this.escAttr(questionText)}</div>
          <div class="quiz-arrow">↓</div>
          <div class="quiz-lang-indicator">${isItalianQuestion ? '🇩🇪' : '🇮🇹'}</div>
        </div>
        
        <div class="card quiz-answer-card">
          ${!answered ? `
            <input type="text" class="quiz-input" id="quiz-answer-input" 
                   placeholder="${I18n.t('enterYourAnswer')}" 
                   autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            <button class="quiz-submit-btn" onclick="App.submitQuizAnswer()">
              ${I18n.t('check')}
            </button>
          ` : `
            <div class="quiz-result ${isCorrect ? 'correct' : 'wrong'}">
              <div class="quiz-result-icon">${isCorrect ? '✓' : '✗'}</div>
              <div class="quiz-result-text">
                ${isCorrect ? I18n.t('correct') : I18n.t('wrong')}
              </div>
            </div>
            
            <div class="quiz-answer-comparison">
              <div class="quiz-your-answer">
                <span class="quiz-answer-label">${I18n.t('yourAnswer')}:</span>
                <span class="quiz-answer-text ${isCorrect ? 'correct-text' : 'wrong-text'}">${this.highlightTypos(userAnswer, correctAnswer, typoPositions)}</span>
              </div>
              ${!isCorrect ? `
                <div class="quiz-correct-answer">
                  <span class="quiz-answer-label">${I18n.t('correctAnswer')}:</span>
                  <span class="quiz-answer-text correct-text">${this.escAttr(correctAnswer)}</span>
                </div>
              ` : ''}
            </div>
            
            <button class="quiz-next-btn" onclick="App.nextQuizQuestion()">
              ${currentIndex + 1 < items.length ? I18n.t('nextQuestion') : I18n.t('showResults')}
            </button>
          `}
        </div>
      </div>`;

    container.innerHTML = html;

    // Focus input and setup enter key
    if (!answered) {
      const input = document.getElementById('quiz-answer-input');
      if (input) {
        input.focus();
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            App.submitQuizAnswer();
          }
        });
      }
    }
  },

  renderQuizResults(quizState) {
    const container = document.getElementById('translator-content');
    const { items, score } = quizState;
    const total = items.length;
    const percentage = Math.round((score.correct / total) * 100);
    
    let emoji, message;
    if (percentage === 100) {
      emoji = '🏆';
      message = I18n.t('resultPerfect');
    } else if (percentage >= 80) {
      emoji = '🎉';
      message = I18n.t('resultGreat');
    } else if (percentage >= 60) {
      emoji = '👍';
      message = I18n.t('resultGood');
    } else if (percentage >= 40) {
      emoji = '📚';
      message = I18n.t('resultKeepPracticing');
    } else {
      emoji = '💪';
      message = I18n.t('resultTryAgain');
    }

    let html = `
      <div class="quiz-results-container">
        <div class="quiz-results-card card">
          <div class="quiz-results-emoji">${emoji}</div>
          <h2 class="quiz-results-title">${I18n.t('quizComplete')}</h2>
          <p class="quiz-results-message">${message}</p>
          
          <div class="quiz-results-stats">
            <div class="quiz-stat">
              <div class="quiz-stat-value quiz-stat-correct">${score.correct}</div>
              <div class="quiz-stat-label">${I18n.t('correctAnswers')}</div>
            </div>
            <div class="quiz-stat">
              <div class="quiz-stat-value quiz-stat-wrong">${score.wrong}</div>
              <div class="quiz-stat-label">${I18n.t('wrongAnswers')}</div>
            </div>
            <div class="quiz-stat">
              <div class="quiz-stat-value quiz-stat-percent">${percentage}%</div>
              <div class="quiz-stat-label">${I18n.t('accuracy')}</div>
            </div>
          </div>
          
          <div class="quiz-results-actions">
            <button class="quiz-action-btn quiz-retry-btn" onclick="App.startQuiz()">
              🔄 ${I18n.t('tryAgain')}
            </button>
            <button class="quiz-action-btn quiz-back-btn" onclick="App.translatorTab('dictionary')">
              ← ${I18n.t('backToDictionary')}
            </button>
          </div>
        </div>
        
        <div class="card" style="margin-top: var(--space-md);">
          <div class="section-header" style="margin-bottom: var(--space-md);">
            <span class="section-icon">📋</span>
            <span class="section-title">${I18n.t('reviewAnswers')}</span>
          </div>
          
          <div class="quiz-review-list">
            ${quizState.history.map((h, i) => `
              <div class="quiz-review-item ${h.isCorrect ? 'review-correct' : 'review-wrong'}">
                <div class="quiz-review-num">${i + 1}</div>
                <div class="quiz-review-content">
                  <div class="quiz-review-question">${h.questionLang === 'italian' ? '🇮🇹' : '🇩🇪'} ${this.escAttr(h.question)}</div>
                  <div class="quiz-review-answer">
                    ${h.isCorrect 
                      ? `<span class="review-correct-mark">✓</span> ${this.escAttr(h.userAnswer)}`
                      : `<span class="review-wrong-mark">✗</span> ${this.escAttr(h.userAnswer)} → <span class="review-correct-text">${this.escAttr(h.correctAnswer)}</span>`
                    }
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;

    container.innerHTML = html;
  },

  highlightTypos(userAnswer, correctAnswer, typoPositions) {
    if (!typoPositions || typoPositions.length === 0) {
      return this.escAttr(userAnswer);
    }
    
    let result = '';
    for (let i = 0; i < userAnswer.length; i++) {
      const char = userAnswer[i];
      if (typoPositions.includes(i)) {
        result += `<span class="typo-char">${this.escAttr(char)}</span>`;
      } else {
        result += this.escAttr(char);
      }
    }
    return result;
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
