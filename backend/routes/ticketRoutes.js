import express from 'express'
const router = express.Router()
import { getTicket } from '../controllers/ticketController.js'

router.get('/', getTicket)

export default router