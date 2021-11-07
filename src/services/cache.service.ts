import cacheModel, { CacheItem } from '../models/cache.model'
import logger from '../logger'
import env from '../env'
import { generateString } from '../utils/string'

const CACHE_ITEM_COUNT_LIMIT: number = parseInt(env.CACHE_ITEM_COUNT_LIMIT as string, 10)

export const getValue = async (key: string): Promise<string> => {
  const foundItem = await cacheModel.findOne({ key }).exec()
  if (!foundItem) {
    logger.debug('Cache miss')
    const createsOrOverwrittenItem = await createOrOverwriteItem(key, generateString())
    return createsOrOverwrittenItem.value
  }
  logger.debug('Cache hit')
  foundItem.usedAt = new Date()
  await foundItem.save()
  return foundItem.value
}

export const getKeys = async (): Promise<string[]> => {
  const cacheItems = await cacheModel.find().exec()
  return cacheItems.map(cacheItem => cacheItem.key)
}

export const getItems = async (): Promise<Pick<CacheItem, 'key' | 'value'>[]> => {
  const cacheItems = await cacheModel.find().exec()
  return cacheItems.map(cacheItem => ({
    key: cacheItem.key,
    value: cacheItem.value
  }))
}

export const setValue = async (key: string, value: string): Promise<void> => {
  const foundItem = await cacheModel.findOne({ key }).exec()
  if (!foundItem) {
    await createOrOverwriteItem(key, value)
    return
  }

  foundItem.value = value
  foundItem.usedAt = new Date()
  await foundItem.save()
}

export const deleteItem = async (key: string): Promise<boolean> => {
  const result = await cacheModel.deleteOne({ key }, {}).exec()
  return result.deletedCount > 0
}

export const deleteItems = async (): Promise<void> => {
  await cacheModel.deleteMany({}).exec()
}

// If count of items in the cache is above the limit last recently used item is overwritten
async function createOrOverwriteItem(key: string, value: string): Promise<CacheItem> {
  const itemCount = await cacheModel.count({})
  if (itemCount <= CACHE_ITEM_COUNT_LIMIT) {
    return await cacheModel.create({ key, value })
  }
  const itemToOverwrite = await cacheModel.findOne().sort({ usedAt: 'asc' }).exec()
  if (itemToOverwrite) {
    itemToOverwrite.key = key
    itemToOverwrite.value = value
    itemToOverwrite.usedAt = new Date()
    await itemToOverwrite.save()
    return itemToOverwrite
  }

  return await cacheModel.create({ key, value })
}
