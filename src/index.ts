import env from './env'
import express from "express";
import morgan from 'morgan'
import cors from "cors";
import helmet from "helmet";
import cacheRouter from './routers/cache.router'
import logger from './logger'

if (!env.REST_API_PORT) {
  console.error("Please provide REST API port as REST_API_PORT environment variable")
  process.exit(1);
}

const REST_API_PORT: number = parseInt(env.REST_API_PORT as string, 10);

const app = express();
app.use(morgan("combined", {stream: {write: (message) => logger.http(message)}}));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/cache', cacheRouter)

app.listen(REST_API_PORT, () => {
  console.log(`REST API is listening on port ${REST_API_PORT}`);
});
