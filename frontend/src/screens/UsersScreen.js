import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllUser } from '../actions/userActions'

const UsersScreen = () => {
  const dispatch = useDispatch()

  const getAllUser = useSelector(state => state.getAllUser)
  const { loading, error, users } = getAllUser

  useEffect(() => {
    dispatch(listAllUser())
  }, [dispatch])
  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>USERS </h2>

            {loading ? (<Loader />) : error ? (<Message variant='danger'> {error} </Message>) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>TICKETS</th>
                    <th>ADMIN</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <ul>
                          {user.ticket.map(ticket => (
                            <LinkContainer to={`/tickets/${ ticket.ticketId }`} >
                              <li key={ticket._id}>{ticket.ticketName}</li>
                            </LinkContainer>
                          ))}
                        </ul>
                      </td>
                      <td>{user.isAdmin && <i className="fas fa-check"></i>}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default UsersScreen
