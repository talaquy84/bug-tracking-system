import asyncHandler from 'express-async-handler'
import Ticket from '../models/ticketModel.js'

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
const getTicket = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({})

  if (tickets) {
    res.json(tickets)
  } else {
    //With middleware handler
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getTicket
}