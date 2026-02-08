/**
 * Simple in-memory caching for Azure Functions
 * 
 * NOTE: For production with multiple instances, use Azure Cache for Redis or Azure Cosmos DB
 * This implementation is suitable for single-instance deployments or development
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();

  constructor() {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), 300000);
  }

  /**
   * Get value from cache
   */
  get(key: string): T | null {
    const entry = this.store.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set value in cache with TTL (in seconds)
   */
  set(key: string, value: T, ttlSeconds: number = 3600): void {
    const expiresAt = Date.now() + (ttlSeconds * 1000);
    this.store.set(key, { value, expiresAt });
  }

  /**
   * Delete entry from cache
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.store.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.store.delete(key));
  }
}

// Global cache instance
const cache = new Cache<string>();

/**
 * Generate cache key from parameters
 */
export function getCacheKey(
  type: string,
  params: Record<string, any>
): string {
  const sorted = Object.keys(params)
    .sort()
    .map(k => `${k}:${params[k]}`)
    .join('|');
  
  return `${type}:${sorted}`;
}

/**
 * Get value from cache
 */
export async function getFromCache(key: string): Promise<string | null> {
  return cache.get(key);
}

/**
 * Set value in cache
 */
export async function setInCache(
  key: string,
  value: string,
  ttlSeconds: number = 3600
): Promise<void> {
  cache.set(key, value, ttlSeconds);
}

/**
 * Delete entry from cache
 */
export async function deleteFromCache(key: string): Promise<void> {
  cache.delete(key);
}

/**
 * Clear entire cache
 */
export async function clearCache(): Promise<void> {
  cache.clear();
}

/**
 * PRODUCTION RECOMMENDATION:
 * 
 * Replace this in-memory cache with Azure Cache for Redis for:
 * - Persistence
 * - Distributed caching across multiple instances
 * - Automatic expiration
 * - High performance
 * 
 * Example with Redis:
 * 
 * import { createClient } from 'redis';
 * 
 * const redisClient = createClient({
 *   socket: {
 *     host: process.env.REDIS_HOST,
 *     port: parseInt(process.env.REDIS_PORT || '6379'),
 *     tls: true
 *   },
 *   password: process.env.REDIS_PASSWORD
 * });
 * 
 * export async function getFromCache(key: string): Promise<string | null> {
 *   return await redisClient.get(key);
 * }
 * 
 * export async function setInCache(
 *   key: string,
 *   value: string,
 *   ttlSeconds: number = 3600
 * ): Promise<void> {
 *   await redisClient.setEx(key, ttlSeconds, value);
 * }
 */
