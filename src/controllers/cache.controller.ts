import { Request, Response } from 'express'
import * as cacheService from '../services/cache.service'

export const getValue = async (req: Request, res: Response) => {
  const key: string = req.params.key
  const data = await cacheService.getValue(key)
  res.status(200).send(data)
}

export const getItems = async (req: Request, res: Response) => {
  const data = await cacheService.getItems()
  res.status(200).send(data)
}

export const getKeys = async (req: Request, res: Response) => {
  const data = await cacheService.getKeys()
  res.status(200).send(data)
}

export const setValue = async (req: Request, res: Response) => {
  const key: string = req.params.key
  const value: string = req.body.value
  await cacheService.setValue(key, value)
  res.status(200).send()
}

export const deleteItem = async (req: Request, res: Response) => {
  const key: string = req.params.key
  const hasDeleted = await cacheService.deleteItem(key)
  if (hasDeleted) {
    res.status(200).send()
  } else {
    res.status(404).send()
  }
}

export const deleteItems = async (req: Request, res: Response) => {
  await cacheService.deleteItems()
  res.status(200).send()
}
