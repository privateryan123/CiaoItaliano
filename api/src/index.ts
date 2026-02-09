/**
 * Main entry point for Azure Functions
 * Imports all function handlers to register them with the Azure Functions runtime
 */

// Import all HTTP trigger functions
import './functions/sentences/index';
import './functions/story/index';
import './functions/news/index';
import './functions/scrape-news/index';
import './functions/translate/index';
import './functions/vocabulary/index';
import './functions/content/index';
import './functions/generate-daily/index';

export {};
