/* ============================================
   Italiano Ogni Giorno — Azure Content API Client
   Fetches daily content from Azure Blob Storage
   Falls back to local content if API unavailable
   ============================================ */

const ContentAPI = {
  // API base URL - update for production
  baseUrl: '/api',
  
  // Cache for fetched content
  _cache: new Map(),
  _availableDates: null,

  /**
   * Get the API base URL
   */
  getBaseUrl() {
    // Check if we're running locally or in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:7071/api';
    }
    return '/api';
  },

  /**
   * Fetch content for a specific date from Azure
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<object|null>} Content object or null
   */
  async fetchContent(date) {
    // Check cache first
    if (this._cache.has(date)) {
      return this._cache.get(date);
    }

    try {
      const response = await fetch(`${this.getBaseUrl()}/content?date=${date}`);
      
      if (response.status === 404) {
        console.log(`No cloud content for ${date}, using local fallback`);
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const content = await response.json();
      this._cache.set(date, content);
      return content;
    } catch (error) {
      console.warn(`Failed to fetch content for ${date}:`, error.message);
      return null;
    }
  },

  /**
   * Get list of available dates from Azure
   * @returns {Promise<string[]>} Array of date strings
   */
  async fetchAvailableDates() {
    if (this._availableDates) {
      return this._availableDates;
    }

    try {
      const response = await fetch(`${this.getBaseUrl()}/content/dates`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      this._availableDates = data.dates || [];
      return this._availableDates;
    } catch (error) {
      console.warn('Failed to fetch available dates:', error.message);
      return [];
    }
  },

  /**
   * Save content to Azure (for admin use)
   * @param {object} content - Content object with date, sentences, story, news
   * @returns {Promise<boolean>} Success status
   */
  async saveContent(content) {
    try {
      const response = await fetch(`${this.getBaseUrl()}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Save failed');
      }

      // Clear cache for this date
      this._cache.delete(content.date);
      this._availableDates = null;

      return true;
    } catch (error) {
      console.error('Failed to save content:', error.message);
      return false;
    }
  },

  /**
   * Trigger cleanup of old content (older than 30 days)
   * @returns {Promise<number>} Number of deleted entries
   */
  async cleanupOldContent() {
    try {
      const response = await fetch(`${this.getBaseUrl()}/content/cleanup`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      this._availableDates = null; // Clear cache
      return data.deletedCount || 0;
    } catch (error) {
      console.error('Failed to cleanup old content:', error.message);
      return 0;
    }
  },

  /**
   * Get content for a date, trying Azure first then local fallback
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<object|null>} Content object
   */
  async getContentWithFallback(date) {
    // Try Azure first
    const cloudContent = await this.fetchContent(date);
    if (cloudContent) {
      return cloudContent;
    }

    // Fallback to local DAILY_CONTENT if available
    if (typeof DAILY_CONTENT !== 'undefined' && DAILY_CONTENT[date]) {
      return DAILY_CONTENT[date];
    }

    return null;
  },

  /**
   * Check if API is available
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const response = await fetch(`${this.getBaseUrl()}/content/dates`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Clear local cache
   */
  clearCache() {
    this._cache.clear();
    this._availableDates = null;
  }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.ContentAPI = ContentAPI;
}
