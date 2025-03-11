import redis from "./index";

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

export async function setCachedData(
  key: string,
  data: any,
  ttl: number = 24 * 60 * 60
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error("Redis set error:", error);
  }
}

export async function invalidateCache(patterns: string[]): Promise<void> {
  try {
    for (const pattern of patterns) {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    }
  } catch (error) {
    console.error("Redis delete error:", error);
  }
}
