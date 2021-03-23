import express from 'express'
const router = express.Router()
import { getAllProjects, getProjectById } from '../controllers/projectControllers.js'

router.route('/myproject').get(getProjectById)
router.route('/').get(getAllProjects)

export default router