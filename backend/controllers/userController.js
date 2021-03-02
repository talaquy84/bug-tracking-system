import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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
      token: ''
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
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      role: user.role,
      token: ''
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export {
  authUser,
  createUser
}