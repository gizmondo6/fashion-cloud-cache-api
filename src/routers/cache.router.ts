import express from 'express'
import { getValue } from '../controllers/cache.controller'

const router = express.Router()

router.get('/value/:key', getValue)

export default router
