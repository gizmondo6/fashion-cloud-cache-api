import { Request, Response } from 'express'
import * as cacheService from '../services/cache.service'

export const getValue = async (req: Request, res: Response) => {
  const key: string = req.params.key
  const data = await cacheService.getValue(key)
  res.status(200).send(data)
}
