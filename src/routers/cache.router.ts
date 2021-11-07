import express from 'express'
import {getKey} from '../controllers/cache.controller'

const router = express.Router()

router.get('/:key', getKey)

export default router
