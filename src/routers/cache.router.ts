import express from 'express'
import { getKeys, getValue, setValue, deleteItem, deleteItems } from '../controllers/cache.controller'

const router = express.Router()

router.get('/value/:key', getValue)
router.get('/keys', getKeys)
router.post('/value/:key', setValue)
router.delete('/item/:key', deleteItem)
router.delete('/items', deleteItems)

export default router
