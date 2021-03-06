import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createTicket } from '../actions/ticketActions'
import { listAllProject } from '../actions/projectActions'
import { listAllUser } from '../actions/userActions'
import { TICKET_CREATE_RESET } from '../constants/ticketConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CreateTicketScreen = ({ history }) => {
  const dispatch = useDispatch()

  const getAllUser = useSelector(state => state.getAllUser)
  const { loading: loadingUser, error: errorUser, users } = getAllUser

  const getAllProject = useSelector(state => state.getAllProject)
  const { loading: loadingProject, error: errorProject, projects } = getAllProject

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [status, setStatus] = useState('Pending')
  const [assignedTo, setAssignedTo] = useState({ name: '', email: '', role: '', userId: '' })
  const [project, setProject] = useState({ name: '', projectId: '' })

  const createNewTicket = useSelector(state => state.createNewTicket)
  const { loading, error, success } = createNewTicket

  //Find the way to set initial asysnc
  useEffect(() => {

    if (success) {
      dispatch({ type: TICKET_CREATE_RESET })
      history.push(`/tickets`)
    }
  }, [dispatch, history, success])

  const createTicketHandler = (e) => {
    e.preventDefault()
    dispatch(createTicket(
      name, description, priority, status, assignedTo, project))
  }

  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row className='px-5 py-4'>
          <Col md={6} >
            <h2>Create New Ticket</h2>
            {success && <Message variant='success'>Project is Created</Message>}
            {errorProject && <Message variant='danger'>{errorProject}</Message>}
            {errorUser && <Message variant='danger'>{errorUser}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loadingProject || loadingUser || loading && <Loader />}
            <Form >
              <Form.Group controlId="name">
                <Form.Label>Ticket Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description of the Project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Pending</option>
                  <option>Reviewed</option>
                  <option>Completed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="assignedTo">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  as="select"
                  value={assignedTo.name}
                  onChange={(e) => setAssignedTo({
                    name: users[e.target.options.selectedIndex - 1].name,
                    email: users[e.target.options.selectedIndex - 1].email,
                    role: users[e.target.options.selectedIndex - 1].role,
                    userId: users[e.target.options.selectedIndex - 1]._id,
                  })}
                >
                  <option></option>
                  {loadingUser ? <Loader /> : (users.map((user, index) => {
                    return (
                      <option key={index}>{user.name}</option>
                    )
                  })
                  )}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control
                  as="select"
                  value={project.name}
                  onChange={(e) => setProject({
                    name: projects[e.target.options.selectedIndex - 1].name,
                    projectId: projects[e.target.options.selectedIndex - 1]._id
                  })}
                >
                  <option></option>
                  {loadingProject ? <Loader /> : (projects.map((project, index) => (
                    <option key={index}>{project.name}</option>
                  ))
                  )}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={createTicketHandler}>
                Create
            </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default CreateTicketScreen
