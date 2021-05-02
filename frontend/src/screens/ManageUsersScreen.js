import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllUser, deleteUser } from '../actions/userActions'

const ManageUsersScreen = () => {
  const dispatch = useDispatch()

  const getAllUser = useSelector(state => state.getAllUser)
  const { loading, error, users } = getAllUser

  const userDelete = useSelector(state => state.userDelete)
  const { success } = userDelete

  useEffect(() => {
    dispatch(listAllUser())

    if (success) {
      dispatch(listAllUser())
    }
  }, [dispatch, success])

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId))
    }
  }

  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>MANAGE USERS </h2>
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
                    <th></th>

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
                      <td>{user.isAdmin && <i class="fas fa-check"></i>}</td>
                      <td>
                        <LinkContainer to={`/users/${ user._id }/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)
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
    </main>
  )
}

export default ManageUsersScreen
