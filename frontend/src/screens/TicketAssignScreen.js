import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Container, Row, Col, Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTicketByID, assignUserTicket, removeUserTicket } from '../actions/ticketActions'

const TicketAssignScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const ticketId = match.params.id

  const [assignedTo, setAssignedTo] = useState({ name: '', email: '', role: '', userId: '' })

  const getAllUser = useSelector(state => state.getAllUser)
  const { loading: loadingUser, error: errorUser, users } = getAllUser

  const ticketById = useSelector(state => state.ticketById)
  const { loading, ticket } = ticketById

  const ticketAssign = useSelector(state => state.ticketAssign)
  const { error, success } = ticketAssign

  const ticketRemoveUser = useSelector(state => state.ticketRemoveUser)
  const { success: successRemove } = ticketRemoveUser

  useEffect(() => {
    dispatch(listTicketByID(ticketId))

    if (success || successRemove) {
      dispatch(listTicketByID(ticketId))
    }
  }, [dispatch, success, successRemove])

  const deleteHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeUserTicket(ticketId, assignedTo.userId))
    }
  }
  const assignHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(assignUserTicket(ticketId, assignedTo.name, assignedTo.email, assignedTo.role, assignedTo.userId))
    }
  }

  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>ASSIGN DEVELOPER TICKET</h2>
            {loading ? (<Loader />) : error ? (<Message variant='danger'> {error} </Message>) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                    <th>ASSIGNED</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <Loader />}
                  <tr>
                    <td>{ticket._id}</td>
                    <td>{ticket.name}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.status}</td>
                    <td>
                      {ticket.assignedTo ? (
                        <ul style={{ paddingLeft: '0' }}>
                          <div >
                            {ticket.assignedTo.map(user => (
                              <li key={user.userId}>{user.name}</li>
                            ))}
                          </div>
                        </ul>
                      ) : ('Pending')}

                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
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

            <Button variant="primary" type="submit" onClick={assignHandler} className='mr-3'>
              Assign
            </Button>

            <Button variant="primary" type="submit" onClick={deleteHandler}>
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </main >
  )
}

export default TicketAssignScreen

