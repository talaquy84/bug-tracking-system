import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Ticket from '../models/ticketModel.js'
import User from '../models/userModel.js'
import Project from '../models/projectModel.js'

//@desc     GET all ticket
//@route    GET /api/tickets
//@access   Private
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

  const ticketExists = await Ticket.findOne({ name: name })

  if (ticketExists) {
    res.status(400)
    throw new Error('Ticket already exists')
  }

  const ticket = await Ticket.create({
    name, description, priority, status, assignedTo, project
  })

  //Add new ticket only have 1 assign user, you can add more user to ticket later
  const user = await User.findById(assignedTo.userId)

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

//@desc     Delete single ticket
//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  //For array
  req.body.users.forEach(async user => {
    await User.updateMany(
      { _id: user.userId },
      { $pull: { ticket: { ticketId: req.params.id } } },
      { safe: true, multi: true }
    )
  })

  await Project.updateMany(
    { _id: req.body.projectId },
    { $pull: { ticket: { ticketId: req.params.id } } },
    { safe: true, multi: true }
  )

  if (ticket) {
    await ticket.remove()
    res.json({ message: 'Ticket removed' })
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

//@desc     GET ticket by ID
//@route    GET /api/tickets/:id
//@access   Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (ticket) {
    res.json(ticket)
  } else {
    res.status(404)
    throw new Error('Ticket not found')
  }
})

//@desc     Update ticket by ID
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
  const { name, description, priority, status, project } = req.body

  const ticket = await Ticket.findById(req.params.id)
  //Edit project if project is modified
  if (ticket.project.projectId !== project.projectId) {
    //Delete the ticket in old project
    await Project.updateMany(
      { _id: ticket.project.projectId },
      { $pull: { ticket: { ticketId: req.params.id } } },
      { safe: true, multi: true }
    )

    //Create the ticket in new project
    const ticketInNewProject = await Project.findById(project.projectId)
    if (ticketInNewProject) {
      ticketInNewProject.ticket.push({
        ticketName: name || ticket.name,
        priority: priority || ticket.priority,
        status: status || ticket.status,
        ticketId: req.params.id
      })
    }
    const updatedProject = await ticketInNewProject.save()
  }

  //Update ticket
  if (ticket) {
    ticket.name = name || ticket.name
    ticket.description = description || ticket.description
    ticket.priority = priority || ticket.priority
    ticket.status = status || ticket.status
    ticket.project = project || ticket.project
  }
  const updatedTicket = await ticket.save()

  if (ticket) {
    res.status(201).json({

      ticket: updatedTicket
    })
  } else {
    res.status(400)
    throw new Error('Invalid ticket data')
  }
})

//@desc     Assign new user to current ticket
//@route    PUT /api/tickets/:id/assign
//@access   Private
const assignTicket = asyncHandler(async (req, res) => {
  const { name, email, role, userId } = req.body
  const ticketId = req.params.id
  let ticketExist = false

  const ticket = await Ticket.findById(ticketId)

  if (ticket) {
    ticket.assignedTo.map(async user => {
      if (user.userId == userId) {
        ticketExist = true
      }
    })
    console.log(ticketExist)
    if (!ticketExist) {
      ticket.assignedTo.push({
        name: name,
        email: email,
        role: role,
        userId: userId
      })
    }
  } else {
    res.status(400)
    throw new Error('Ticket not exists')
  }
  const updatedTicket = await ticket.save()

  if (updatedTicket) {
    res.status(201).json({
      updatedTicket
    })
  } else {
    res.status(400)
    throw new Error('Cannot Assign New User')
  }
})

//@desc     Assign new user to current ticket
//@route    PUT /api/tickets/:id/remove
//@access   Private
const removeUserTicket = asyncHandler(async (req, res) => {
  const { name, email, role, userId } = req.body
  const ticketId = req.params.id
  let userExist = false

  const ticket = await Ticket.findById(ticketId)

  if (ticket) {
    ticket.assignedTo.map(async user => {
      if (user.userId == userId) {
        userExist = true
      }
    })
    if (userExist) {
      //Remove
      await Ticket.updateMany(
        { _id: ticketId },
        { $pull: { assignedTo: { userId: userId } } },
        { safe: true, multi: true }
      )
    } else {
      res.status(400)
      throw new Error('User not exists')
    }
  } else {
    res.status(400)
    throw new Error('Ticket not exists')
  }
  const updatedTicket = await ticket.save()

  if (updatedTicket) {
    res.status(201).json({
      _id: updatedTicket._id,
      name: updatedTicket.name,
      email: updatedTicket.email,
      role: updatedTicket.role,
    })
  } else {
    res.status(400)
    throw new Error('Cannot Assign New User')
  }
})

export {
  getAllTicket,
  getMyTickets,
  createTicket,
  deleteTicket,
  getTicketById,
  updateTicket,
  assignTicket,
  removeUserTicket
}

