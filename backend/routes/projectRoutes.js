import express from 'express'
const router = express.Router()
import { getAllProjects, getProjectById, createProject } from '../controllers/projectControllers.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/myproject').get(protect, getProjectById)
router.route('/').get(protect, getAllProjects).post(protect, createProject)

export default router