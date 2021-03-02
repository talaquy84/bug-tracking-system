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
  //Assigned, Pending
  status: {
    type: String,
    required: true,
  },
  //Assigned status is pending if assignedto is empty
  assignedTo: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }],
  project: [{
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project'
    }
  }]
}, {
  timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket