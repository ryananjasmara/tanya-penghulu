
import redis from "./";

const CACHE_TTL = 60 * 60 * 24;

export async function getCachedData<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCachedData(key: string, data: any): Promise<void> {
  await redis.setex(key, CACHE_TTL, JSON.stringify(data));
}

export async function invalidateCache(keys: string[]): Promise<void> {
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
