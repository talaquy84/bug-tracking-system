import mongoose from 'mongoose'
import dotenv from 'dotenv';
import colors from 'colors'
import users from './data/users.js'
import tickets from './data/tickets.js'
import projects from './data/projects.js'
import User from './models/userModel.js'
import Ticket from './models/ticketModel.js'
import Project from './models/projectModel.js'
import connectDB from './config/db.js';

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Project.deleteMany()
    await Ticket.deleteMany()

    const createdUser = await User.insertMany(users)
    const createdProject = await Project.insertMany(projects)
    const createdTicket = await Ticket.insertMany(tickets)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`failed to import data ${ error }`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${ error }`.grredeen.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}