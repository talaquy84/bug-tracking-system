import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { updateUserProfile, loadUser } from '../actions/userActions'
import { listMyTickets } from '../actions/ticketActions'
import { hidden } from 'colors'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [role, setRole] = useState('Developer')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { loading, user } = auth

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const getMyTickets = useSelector(state => state.getMyTickets)
  const { loading: loadingTicket, tickets, error } = getMyTickets

  useEffect(() => {
    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch(loadUser())
      dispatch(listMyTickets())
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole((user.role))
    }
  }, [dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmedPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password, role }))
      setPassword('')
      setConfirmedPassword('')
    }
  }

  return (
    <main>
      <Row className='px-5 py-4'>
        <Col md={3} >
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Update Successful</Message>}
          {loading && <Loader />}
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmedPassword">
              <Form.Label>Confirmed Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmed Password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />

              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Developer</option>
                  <option>Tester</option>
                  <option>Product Manager</option>
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Update
        </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Ticket(s)</h2>
          {loadingTicket ? <Loader /> : error ? <Message variant='danger'>
            {error} </Message> : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
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
                    <td> {ticket.project.name}</td>
                    <td>{ticket.createdAt.substring(0, 10)}</td>
                    <td>
                      <LinkContainer to={`/tickets/${ ticket._id }/edit`}>
                        <Button className='btn-sm' variant='light'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </ Col>
      </Row>
    </main>
  )
}

export default ProfileScreen
