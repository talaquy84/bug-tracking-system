import asyncHandler from 'express-async-handler'
import Ticket from '../models/ticketModel.js'

//@desc     Get logged in user orders
//@route    GET /api/orders/myorders
//@access   Private
const getMyTickets = asyncHandler(async (req, res) => {
  //req.user is where we fetch user data from auuthorize middleware that checks token
  //Token generate using id
  //All the info of login user is save in req.user (see authMiddleware)
  const tickets = await Ticket.find({ "assignedTo.userId": req.user._id })
  res.json(tickets)
})

export {
  getMyTickets
}