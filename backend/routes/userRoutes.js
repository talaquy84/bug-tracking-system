import express from 'express'
const router = express.Router()
import {
  getAuth,
  authUser,
  createUser,
  updateUserProfile,
  getAllUser,
  getUserById,
  updateUserProfileById,
  deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.post('/', createUser)
router.route('/').get(protect, getAuth)
router.route('/profile').put(protect, updateUserProfile)
router.route('/all').get(protect, getAllUser)
router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserProfileById)
  .delete(protect, admin, deleteUser)

export default router