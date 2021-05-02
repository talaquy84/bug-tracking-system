import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateTicket } from '../actions/ticketActions'
import { listTicketByID } from '../actions/ticketActions'
import { TICKET_UPDATE_RESET } from '../constants/ticketConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'

const TicketDetailScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const ticketId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [status, setStatus] = useState('')
  const [project, setProject] = useState({ name: '', projectId: '' })

  const getAllProject = useSelector(state => state.getAllProject)
  const { loading: loadingProject, error: errorProject, projects } = getAllProject

  const ticketById = useSelector(state => state.ticketById)
  const { loading, ticket } = ticketById

  const ticketUpdate = useSelector(state => state.ticketUpdate)
  const { error, success } = ticketUpdate

  //Find the way to set initial asysnc
  useEffect(() => {
    if (success) {
      dispatch({ type: TICKET_UPDATE_RESET })
      dispatch(listTicketByID(ticketId))
      history.push(`/tickets`)
    } else {
      if (!ticket || ticket._id !== ticketId) {
        dispatch(listTicketByID(ticketId))
      } else {
        setName(ticket.name)
        setDescription(ticket.description)
        setPriority(ticket.priority)
        setStatus(ticket.status)
        setProject(ticket.project)
      }
    }
  }, [dispatch, success, ticketId, history, ticket])

  const updateTicketHandler = (e) => {
    e.preventDefault()
    dispatch(updateTicket(ticketId, name, description, priority, status, project))
  }
  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row className='px-5 py-4'>
          <Col md={6} >
            <h2>Ticket Detail </h2>
            {success && <Message variant='success'>Project is Created</Message>}
            {errorProject && <Message variant='danger'>{errorProject}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loadingProject || loading && <Loader />}
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

              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control
                  as="select"
                  value={project.name}
                  onChange={(e) => setProject({
                    name: projects[e.target.options.selectedIndex].name,
                    projectId: projects[e.target.options.selectedIndex]._id
                  })}
                >
                  {loadingProject ? <Loader /> : (projects.map((project, index) => (
                    <option key={index}>{project.name}</option>
                  ))
                  )}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={updateTicketHandler}>
                UPDATE
            </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default TicketDetailScreen
