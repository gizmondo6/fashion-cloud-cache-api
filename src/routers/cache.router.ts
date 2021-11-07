import express from 'express'
import { getKeys, getValue, setValue } from '../controllers/cache.controller'

const router = express.Router()

router.get('/value/:key', getValue)
router.get('/keys', getKeys)
router.post('/value/:key', setValue)

export default router
