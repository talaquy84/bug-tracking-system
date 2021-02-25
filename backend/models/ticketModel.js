import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  assignedTo: [{
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
})

const Ticket = mongoose.model('Ticket', userSchema)

export default Ticket