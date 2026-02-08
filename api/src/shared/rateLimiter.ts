/**
 * In-memory Rate Limiter for Azure Functions
 * 
 * NOTE: For production with multiple instances, use Azure Cache for Redis
 * This implementation is suitable for small-to-medium traffic on a single instance
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

type TimeWindowType = 'hour' | 'day';

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, timeWindowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = timeWindowMs;

    // Cleanup old entries every hour
    setInterval(() => this.cleanup(), 3600000);
  }

  /**
   * Check if a request is allowed for the given IP
   */
  async isAllowed(clientIp: string, timeWindow: TimeWindowType = 'hour'): Promise<boolean> {
    const now = Date.now();
    const timeWindowMs = timeWindow === 'hour' ? 3600000 : 86400000;
    const key = `${clientIp}:${timeWindow}`;

    let entry = this.store.get(key);

    // Create new entry or reset if window expired
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + timeWindowMs
      };
      this.store.set(key, entry);
    }

    // Check if limit exceeded
    if (entry.count >= this.maxRequests) {
      return false;
    }

    // Increment counter
    entry.count++;
    return true;
  }

  /**
   * Get current count for a client
   */
  getCount(clientIp: string, timeWindow: TimeWindowType = 'hour'): number {
    const key = `${clientIp}:${timeWindow}`;
    return this.store.get(key)?.count || 0;
  }

  /**
   * Reset limit for a client (admin operation)
   */
  reset(clientIp: string): void {
    const keys = Array.from(this.store.keys()).filter(k => k.startsWith(clientIp));
    keys.forEach(k => this.store.delete(k));
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const entriesToDelete: string[] = [];

    this.store.forEach((entry, key) => {
      if (now > entry.resetTime) {
        entriesToDelete.push(key);
      }
    });

    entriesToDelete.forEach(key => this.store.delete(key));
  }
}

// Global instances (one per limit type)
const limiters: Map<string, RateLimiter> = new Map();

/**
 * Get or create a rate limiter instance
 */
export function getRateLimiter(key: string): RateLimiter {
  if (!limiters.has(key)) {
    let limiter: RateLimiter;

    if (key === 'translations') {
      const maxPerHour = parseInt(process.env.APP_MAX_TRANSLATIONS_PER_IP_PER_HOUR || '100');
      limiter = new RateLimiter(maxPerHour, 3600000);
    } else if (key === 'stories_per_day') {
      const maxPerDay = parseInt(process.env.APP_MAX_STORIES_PER_IP_PER_DAY || '5');
      limiter = new RateLimiter(maxPerDay, 86400000);
    } else {
      // Default: 60 requests per hour
      limiter = new RateLimiter(60, 3600000);
    }

    limiters.set(key, limiter);
  }

  return limiters.get(key)!;
}

/**
 * IMPORTANT: For production workloads with multiple Azure Function instances,
 * replace this in-memory implementation with Azure Cache for Redis:
 * 
 * import redis from 'redis';
 * 
 * const redisClient = redis.createClient({
 *   host: process.env.REDIS_HOST,
 *   port: parseInt(process.env.REDIS_PORT || '6379'),
 *   password: process.env.REDIS_PASSWORD
 * });
 * 
 * Then implement rate limiting using Redis keys with expiration times.
 * This ensures rate limits are consistent across all function instances.
 */
