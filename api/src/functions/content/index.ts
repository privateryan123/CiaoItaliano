import { HttpRequest, HttpResponseInit, app } from '@azure/functions';
import { getContent, saveContent, getAvailableDates, cleanupOldContent } from '../../shared/blobStorage';

/**
 * GET /api/content?date=YYYY-MM-DD - Get content for a specific date
 * GET /api/content/dates - Get list of available dates
 * POST /api/content - Save content for a date
 * DELETE /api/content/cleanup - Clean up content older than 30 days
 */
export async function content(request: HttpRequest): Promise<HttpResponseInit> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders };
  }

  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const action = pathParts[pathParts.length - 1]; // 'content', 'dates', or 'cleanup'

    // GET /api/content/dates - List available dates
    if (request.method === 'GET' && action === 'dates') {
      const dates = await getAvailableDates();
      return {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ dates })
      };
    }

    // DELETE /api/content/cleanup - Clean up old content
    if (request.method === 'DELETE' && action === 'cleanup') {
      const deletedCount = await cleanupOldContent();
      return {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Cleaned up ${deletedCount} old entries` })
      };
    }

    // GET /api/content?date=YYYY-MM-DD - Get content for a date
    if (request.method === 'GET') {
      const date = url.searchParams.get('date');
      if (!date) {
        return {
          status: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Missing date parameter' })
        };
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return {
          status: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' })
        };
      }

      const contentData = await getContent(date);
      if (!contentData) {
        return {
          status: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'No content found for this date' })
        };
      }

      return {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData)
      };
    }

    // POST /api/content - Save content
    if (request.method === 'POST') {
      const body = await request.json() as any;
      const { date, sentences, story, news } = body;

      if (!date) {
        return {
          status: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Missing date field' })
        };
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return {
          status: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' })
        };
      }

      // Check if date is within 30 days
      const contentDate = new Date(date);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      
      if (contentDate < cutoffDate) {
        return {
          status: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Cannot save content older than 30 days' })
        };
      }

      const contentData = {
        date,
        sentences: sentences || [],
        story: story || null,
        news: news || [],
        updatedAt: new Date().toISOString()
      };

      const success = await saveContent(date, contentData);
      if (!success) {
        return {
          status: 500,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Failed to save content' })
        };
      }

      return {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Content saved successfully', date })
      };
    }

    return {
      status: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Content API error:', error);
    return {
      status: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

// Register the function
app.http('content', {
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'content/{action?}',
  handler: content
});
