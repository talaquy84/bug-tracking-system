import express from 'express'
const router = express.Router()
import { getAllTicket, getMyTickets, createTicket, deleteTicket, getTicketById, updateTicket } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/mytickets').get(protect, getMyTickets)
router.route('/').get(protect, getAllTicket).post(protect, createTicket)
router.route('/:id').delete(protect, deleteTicket).get(protect, getTicketById).put(protect, updateTicket)

export default router