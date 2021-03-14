import express from 'express'
const router = express.Router()
import { getAuth, authUser, createUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/', createUser)
router.route('/').get(protect, getAuth)
router.route('/profile').put(protect, updateUserProfile)

export default router