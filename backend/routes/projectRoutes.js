import express from 'express'
const router = express.Router()
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllProjects).post(protect, createProject)
router.route('/:id').delete(protect, deleteProject).put(protect, updateProject).get(protect, getProjectById)

export default router