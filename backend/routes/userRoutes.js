import express from 'express'
const router = express.Router()
import { getAuth, authUser, createUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/', createUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/').get(protect, getAuth)

export default router