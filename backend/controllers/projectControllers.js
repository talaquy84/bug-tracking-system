import asyncHandler from 'express-async-handler'
import Project from '../models/projectModel.js'

//@desc     GET all projects
//@route    GET /api/projects
//@access   Public
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

export {
  getAllProjects,
  getProjectById
}