import express from 'express'
import { deleteItem, deleteItems, getItems, getKeys, getValue, setValue } from '../controllers/cache.controller'

const router = express.Router()

router.get('/value/:key', getValue)
router.get('/keys', getKeys)
router.get('/items', getItems)
router.post('/value/:key', setValue)
router.delete('/item/:key', deleteItem)
router.delete('/items', deleteItems)

export default router
