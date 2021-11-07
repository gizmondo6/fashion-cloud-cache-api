import express from 'express'
import { getKeys, getValue } from '../controllers/cache.controller'

const router = express.Router()

router.get('/value/:key', getValue)
router.get('/keys', getKeys)

export default router
