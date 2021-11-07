import CacheModel from '../models/cache.model'
import logger from '../logger'

export const getValue = async (key: string): Promise<string> => {
  let cacheItem = await CacheModel.findOne({ key }).exec()
  if (cacheItem) {
    logger.debug('Cache hit')
    cacheItem.usedAt = new Date()
    await cacheItem.save()
  } else {
    logger.debug('Cache miss')
    cacheItem = await CacheModel.create({ key })
  }
  return cacheItem.value
}

export const getKeys = async (): Promise<string[]> => {
  let cacheItems = await CacheModel.find().exec()
  return cacheItems.map(cacheItem => cacheItem.key)
}
