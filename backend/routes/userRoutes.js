import express from 'express'
const router = express.Router();
import { authUser, createUser } from '../controllers/userController.js'

router.post('/login', authUser)
router.post('/', createUser)

export default router