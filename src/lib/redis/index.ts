import { Redis } from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        console.error("Redis retry limit reached");
        return null;
      }
      const delay = Math.min(times * 100, 3000);
      return delay;
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
    commandTimeout: 5000,
    keepAlive: 30000,
    noDelay: true,
  });

redis.on("error", (error) => {
  console.error("Redis connection error:", error?.message);
  if (error?.message.includes("ECONNRESET")) {
    console.log("Connection reset by peer. Attempting to reconnect...");
  }
});

redis.on("connect", () => {
  console.log("Connected to Upstash Redis");
});

redis.on("ready", () => {
  console.log("Upstash Redis is ready");
});

redis.on("close", () => {
  console.log("Upstash Redis connection closed");
});

redis.on("reconnecting", () => {
  console.log("Reconnecting to Upstash Redis...");
});

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export default redis;
