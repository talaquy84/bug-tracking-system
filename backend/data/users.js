import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    role: 'Manager'
  },
  {
    name: 'Eric',
    email: 'eri@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'Developer'
  },
  {
    name: 'Bo',
    email: 'bo@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'Developer'
  },
]

export default users