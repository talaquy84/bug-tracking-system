import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Ticket from '../models/ticketModel.js'
import User from '../models/userModel.js'
import Project from '../models/projectModel.js'

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

//@desc     Create new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
  const { name, description, priority, status, assignedTo, project } = req.body

  const userExists = await Ticket.findOne({ name: name })

  if (userExists) {
    res.status(400)
    throw new Error('Ticket already exists')
  }

  const ticket = await Ticket.create({
    name, description, priority, status, assignedTo, project
  })

  //Add new ticket only have 1 assign user, you can add more user to ticket later
  const user = await User.findById(assignedTo[0].userId)

  //Create new ticket in USER
  if (assignedTo) {
    if (user) {
      user.ticket.push({
        ticketName: name,
        priority: priority,
        status: status,
        ticketId: ticket._id
      })
    }
  }
  const updatedUser = await user.save()

  //Add new ticket only have 1 assign user, you can add more user to ticket later
  const ticketInProject = await Project.findById(project.projectId)

  //Create new ticket in PRORJECT
  if (assignedTo) {
    if (ticketInProject) {
      ticketInProject.ticket.push({
        ticketName: name,
        priority: priority,
        status: status,
        ticketId: ticket._id
      })
    }
  }
  const updatedProject = await ticketInProject.save()

  if (ticket) {
    res.status(201).json({
      _id: ticket._id,
      name: ticket.name,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      assignedTo: ticket.assignedTo,
      project: ticket.project,
      user: updatedUser,
      updateProject: updatedProject
    })
  } else {
    res.status(400)
    throw new Error('Invalid ticket data')
  }
})

export {
  getAllTicket,
  getMyTickets,
  createTicket
}

