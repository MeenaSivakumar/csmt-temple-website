import { Router } from 'express'
import { getPublicContent } from '../controllers/contentController.js'

const router = Router()

router.get('/', getPublicContent)

export default router
