import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Ticket from '../models/ticketModel.js'
import Project from '../models/ticketModel.js'

//@desc     GET all ticket
//@route    GET /api/tickets
//@access   Public
const getAllTicket = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({})

  if (tickets) {
    res.json(tickets)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

//@desc     GET my ticket
//@route    GET /api/tickets/mytickets
//@access   Private
const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ "assignedTo.userId": req.user._id })

  if (tickets) {
    res.json(tickets)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

export {
  getAllTicket,
  getMyTickets
}

