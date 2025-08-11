import dotenv from "dotenv";
import { AppConfig } from "./AppConfig";
import { DatabaseConfig } from "./DatabaseConfig";
import { RedisConfig } from "./RedisConfig";

dotenv.config();

export const ENV = {
  PORT: AppConfig.PORT,
  NODE_ENV: AppConfig.NODE_ENV,
  MONGO_URI: DatabaseConfig.MONGO_URI,
  REDIS_URL: RedisConfig.REDIS_URL,
  CACHE_TTL_SECONDS: RedisConfig.CACHE_TTL_SECONDS,
};
