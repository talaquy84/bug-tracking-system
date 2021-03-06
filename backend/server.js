import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

dotenv.config()

connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//Body parser
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

//404 page not found
app.use(notFound)
//Error handler custom
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`.yellow.bold
  ))