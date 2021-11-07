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

export const setValue = async (key: string, value: string): Promise<void> => {
  let cacheItem = await CacheModel.findOne({ key }).exec()
  if (cacheItem) {
    cacheItem.value = value
    cacheItem.usedAt = new Date()
    await cacheItem.save()
  } else {
    await CacheModel.create({ key, value })
  }
}

export const deleteItem = async (key: string): Promise<boolean> => {
  const result = await CacheModel.deleteOne({ key }, {}).exec()
  return result.deletedCount > 0
}

export const deleteItems = async (): Promise<void> => {
  await CacheModel.deleteMany({}).exec()
}
