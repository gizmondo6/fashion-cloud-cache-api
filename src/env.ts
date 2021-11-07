import * as dotenv from 'dotenv'

dotenv.config()

interface Env {
  REST_API_PORT?: string
  LOG_LEVEL?: string
  MONGO_DB_URI?: string
  CACHE_TTL_SECONDS?: string
  CACHE_ITEM_COUNT_LIMIT?: string
}

const env: Env = {
  REST_API_PORT: process.env.REST_API_PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  CACHE_TTL_SECONDS: process.env.CACHE_TTL_SECONDS,
  CACHE_ITEM_COUNT_LIMIT: process.env.CACHE_ITEM_COUNT_LIMIT
}

export default env
