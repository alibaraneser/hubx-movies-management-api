import Redis from "ioredis";
import { ICache } from "../../../application/ports/cache/ICache";
import { ENV } from "../../../config/env";

type RedisOptions = string | { host: string; port: number };

export class RedisCacheService implements ICache {
  private client: Redis;

  constructor(options: RedisOptions = ENV.REDIS_URL) {
    this.client =
      typeof options === "string"
        ? new Redis(options, { lazyConnect: true })
        : new Redis({ ...options, lazyConnect: true });
    this.client.on("error", (e) => console.error("Redis error:", e.message));
    this.client
      .connect()
      .catch((e) => console.error("Redis connect err:", e.message));
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set<T = unknown>(
    key: string,
    value: T,
    ttlSeconds: number = ENV.CACHE_TTL_SECONDS,
  ): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds > 0) await this.client.set(key, payload, "EX", ttlSeconds);
    else await this.client.set(key, payload);
  }

  async del(key: string | string[]): Promise<void> {
    if (Array.isArray(key)) {
      if (key.length) await this.client.del(...key);
    } else {
      await this.client.del(key);
    }
  }
}
