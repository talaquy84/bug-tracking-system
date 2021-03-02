import mongoose from 'mongoose'

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  ticket: [{
    ticketName: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket'
    }
  }]
}, {
  timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

export default Project