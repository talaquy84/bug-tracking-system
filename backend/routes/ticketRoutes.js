import express from 'express'
const router = express.Router()
import { getMyTickets } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/mytickets').get(protect, getMyTickets)

export default router