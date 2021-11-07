import env from './env'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cacheRouter from './routers/cache.router'
import logger from './logger'
import mongoose from 'mongoose'
;(async function () {
  // Starting Mongoose connection to MongoDB
  if (!env.MONGO_DB_URI) {
    console.error('Please provide MongoDB uri as MONGO_DB_URI environment variable')
    process.exit(1)
  }
  await mongoose.connect(env.MONGO_DB_URI, { autoCreate: true })
  logger.info(`Mongoose has connected to MongoDB`)

  // Starting REST API server
  if (!env.REST_API_PORT) {
    console.error('Please provide REST API port as REST_API_PORT environment variable')
    process.exit(1)
  }
  const REST_API_PORT: number = parseInt(env.REST_API_PORT as string, 10)
  const app = express()
  app.use(morgan('combined', { stream: { write: message => logger.http(message) } }))
  app.use(helmet())
  app.use(cors())
  app.use(express.json())

  app.use('/api/v1/cache', cacheRouter)

  app.listen(REST_API_PORT, () => {
    logger.info(`REST API is listening on port ${REST_API_PORT}`)
  })
})()
