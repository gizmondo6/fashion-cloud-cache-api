import env from './env'
import winston from 'winston'

const transports = [new winston.transports.Console()]

const logger = winston.createLogger({
  level: env.LOG_LEVEL ?? 'info',
  transports
})

export default logger
