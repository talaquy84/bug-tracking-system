import express from 'express'
const router = express.Router()
import { getAllTicket, getMyTickets, createTicket } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/mytickets').get(protect, getMyTickets)
router.route('/').get(getAllTicket).post(protect, createTicket)

export default router