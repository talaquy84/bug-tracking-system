import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc     Auth user & get token
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

export {
  authUser
}