import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer, Link } from 'react-router-bootstrap'
import { listAllTicket } from '../actions/ticketActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const TicketScreen = () => {
  const dispatch = useDispatch()

  const getAllTicket = useSelector(state => state.getAllTicket)
  const { loading, error, tickets } = getAllTicket

  useEffect(() => {
    dispatch(listAllTicket())
  }, [dispatch])

  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>TICKETS </h2>
            <Button className='ml-auto mr-5' >Create New Ticket</Button>
            {loading ? <Loader /> : error ? <Message variant='danger'>
              {error} </Message> : (
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
                  {tickets.map(ticket => (
                    <tr key={ticket._id}>
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
                                <li>{user.name}</li>
                              ))}
                            </div>
                          </ul>
                        ) : ('Pending')}

                      </td>
                      <td>{ticket.project.name}</td>
                      <td>{ticket.createdAt.substring(0, 10)}</td>
                      <td>
                        <LinkContainer to={`/tickets/${ ticket._id }`}>
                          <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
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
