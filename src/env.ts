import * as dotenv from "dotenv";

dotenv.config();

interface Env {
  REST_API_PORT?: string
  LOG_LEVEL?: string
}

const env: Env = {
  REST_API_PORT: process.env.REST_API_PORT,
  LOG_LEVEL: process.env.LOG_LEVEL
}

export default env
