import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

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
  const projects = await Project.findById(req.body._id)

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


export {
  getAllProjects,
  getProjectById,
  createProject
}