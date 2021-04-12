import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllProject } from '../actions/projectActions'
import { listAllTicket, deleteTicket } from '../actions/ticketActions'
import { listAllUser } from '../actions/userActions'

const TicketScreen = ({ history }) => {
  const dispatch = useDispatch()

  const getAllTicket = useSelector(state => state.getAllTicket)
  const { loading, error, tickets } = getAllTicket

  const ticketDelete = useSelector(state => state.ticketDelete)
  const { success } = ticketDelete

  useEffect(() => {
    dispatch(listAllProject())
    dispatch(listAllTicket())
    dispatch(listAllUser())

    if (success) {
      dispatch(listAllTicket())
    }
  }, [dispatch, success])

  const deleteHandler = (ticketId, assignedTo, projectId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTicket(ticketId, assignedTo, projectId))
    }
  }

  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>TICKETS </h2>
            <LinkContainer to='/tickets/new'>
              <Button className='ml-auto mr-5' >Create New Ticket</Button>
            </LinkContainer>
            {loading ? (<Loader />) : error ? (<Message variant='danger'> {error} </Message>) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                    <th>ASSINGED</th>
                    <th>PROJECT</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={index}>
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
                      <td>{ticket.project.name}</td>
                      <td>{ticket.createdAt.substring(0, 10)}</td>
                      <td>
                        <LinkContainer to={`/tickets/${ ticket._id }/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(ticket._id, ticket.assignedTo, ticket.project.projectId)
                          }>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </main >
  )
}

export default TicketScreen
