import { model, Schema } from 'mongoose'
import * as crypto from 'crypto'
import env from '../env'

const CACHE_TTL_SECONDS: number = parseInt(env.CACHE_TTL_SECONDS as string, 10)

export interface CacheItem {
  key: string
  value: string
  usedAt: Date
}

const cacheSchema = new Schema<CacheItem>(
  {
    key: {
      type: String,
      trim: true,
      index: true
    },
    value: {
      type: String,
      default: () => crypto.randomBytes(20).toString('hex')
    },
    usedAt: {
      type: Date,
      index: true,
      default: () => new Date(),
      expires: CACHE_TTL_SECONDS
    }
  },
  {
    collection: 'cache'
  }
)

export default model('Cache', cacheSchema)
