import express from 'express'
const router = express.Router()
import { getAllProjects, getProjectById, createProject } from '../controllers/projectControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/myproject').get(getProjectById)
router.route('/').get(getAllProjects).post(protect, createProject)

export default router