import express from 'express'
const router = express.Router()
import { getAuth, authUser, createUser, updateUserProfile, getAllUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/', createUser)
router.route('/').get(protect, getAuth)
router.route('/profile').put(protect, updateUserProfile)
router.route('/all').get(protect, getAllUser)

export default router