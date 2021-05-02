import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'
import generateToken from '../utils/generateToken.js'

//@desc     Check route
//@route    GET /api/users
//@access   Public
const getAuth = asyncHandler(async (req, res) => {
  //req.user is fetching from protect middleware (private access)
  //Fetch data again based on data from protect
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(500)
    throw new Error('Server Error')
  }
})

//@desc     Auth user & get token(login)
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  //We get email, password from user
  const { email, password } = req.body

  const user = await User.findOne({ email })
  //We use bcrypt in userController
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

//@desc     Create new user
//@route    POST /api/users
//@access   Public
const createUser = asyncHandler(async (req, res) => {
  const { email, name, password, role } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    email, name, password, role
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //Update user in ticket
  const tickets = await Ticket.updateMany(
    {},
    {
      $set: {
        "assignedTo.$[user].name": req.body.name,
        "assignedTo.$[user].email": req.body.email,
        "assignedTo.$[user].role": req.body.role,
      }
    },
    {
      arrayFilters: [{ "user.userId": req.user._id }],
      new: true
    }
  )

  if (user) {
    //if req.body.name exists, or user.name stay the same
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    user.role = req.body.role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
      token: generateToken(user._id), tickets
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     GET all user
//@route    GET /api/users/all
//@access   Private
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')

  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     GET user by ID
//@route    GET /api/users/all
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select('-password')

  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Update user profile by ID
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  //Update user in ticket
  const tickets = await Ticket.updateMany(
    {},
    {
      $set: {
        "assignedTo.$[user].name": req.body.name,
        "assignedTo.$[user].email": req.body.email,
        "assignedTo.$[user].role": req.body.role,
      }
    },
    {
      arrayFilters: [{ "user.userId": req.params.id }],
      new: true
    }
  )

  if (user) {
    //if req.body.name exists, or user.name stay the same
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    user.role = req.body.role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      role: updatedUser.role,
      token: generateToken(user._id), tickets
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Delete single user
//@route    DELETE /api/users/:id
//@access   Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  const tickets = await Ticket.find({})
  tickets.forEach(async ticket => {
    await Ticket.updateMany(
      {},
      { $pull: { assignedTo: { userId: req.params.id } } },
      { safe: true, multi: true }
    )
  })

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  getAuth,
  authUser,
  createUser,
  updateUserProfile,
  getAllUser,
  getUserById,
  updateUserProfileById,
  deleteUser
}