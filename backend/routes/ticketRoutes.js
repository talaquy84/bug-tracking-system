import express from 'express'
const router = express.Router()
import { getAllTicket, getMyTickets } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/mytickets').get(protect, getMyTickets)
router.route('/').get(getAllTicket)

export default router