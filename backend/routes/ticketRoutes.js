import express from 'express'
const router = express.Router()
import { getAllTicket, getMyTickets, createTicket, deleteTicket, getTicketById, updateTicket, assignTicket, removeUserTicket } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/mytickets').get(protect, getMyTickets)
router.route('/').get(protect, getAllTicket).post(protect, createTicket)
router.route('/:id')
  .delete(protect, deleteTicket)
  .get(protect, getTicketById)
  .put(protect, updateTicket)
router.route('/:id/assign').put(protect, assignTicket)
router.route('/:id/remove').put(protect, removeUserTicket)

export default router