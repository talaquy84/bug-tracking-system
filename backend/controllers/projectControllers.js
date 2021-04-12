import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'
import Ticket from '../models/ticketModel.js'

//@desc     GET all projects
//@route    GET /api/projects
//@access   Private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})

  if (projects) {
    res.json(projects)
  } else {
    //With middleware handler
    res.status(404)
    throw new Error('Project not found')
  }
})

//@desc     GET project by id
//@route    GET /api/projects/:id
//@access   Public
const getProjectById = asyncHandler(async (req, res) => {
  const projects = await Project.findById(req.params.id)

  if (projects) {
    res.json(projects)
  } else {
    //With middleware handler
    res.status(404)
    throw new Error('Project not found')
  }
})

//@desc     POST Create a new project
//@route    POST /api/projects
//@access   Private
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body

  const projectExists = await Project.findOne({ name: name })

  if (projectExists) {
    res.status(400)
    throw new Error('Project already exists')
  }

  const project = await Project.create({
    name, description
  })

  if (project) {
    res.status(201).json({
      _id: project._id,
      name: project.name,
      description: project.description,
    })
  } else {
    res.status(400)
    throw new Error('Invalid project data')
  }
})

//@desc     Update user profile
//@route    PUT /api/project/:id
//@access   Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
  //Update user in ticket

  const tickets = await Ticket.updateMany(
    { "project.projectId": req.params.id },
    {
      $set: {
        "project.name": req.body.name,
      }
    },
    {
      new: true
    }
  )

  if (project) {
    //if req.body.name exists, or user.name stay the same
    project.name = req.body.name || project.name
    project.description = req.body.description || project.description

    const updatedProject = await project.save()

    res.json({
      _id: updatedProject._id,
      name: updatedProject.name,
      description: updatedProject.description,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject
}