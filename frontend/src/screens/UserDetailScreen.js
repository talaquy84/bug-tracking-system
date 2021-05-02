import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfileById, loadUserById } from '../actions/userActions'
import { USER_UPDATE_BYID_RESET } from '../constants/userConstants'
import { hidden } from 'colors'

const UserDetailScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState(null)

  const getUserById = useSelector(state => state.getUserById)
  const { loading, user } = getUserById

  const userUpdateProfileById = useSelector(state => state.userUpdateProfileById)
  const { success } = userUpdateProfileById

  useEffect(() => {
    if (!user || user._id !== userId || success) {
      dispatch({ type: USER_UPDATE_BYID_RESET })
      dispatch(loadUserById(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole((user.role))
    }
  }, [dispatch, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmedPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfileById({ id: userId, name, email, password, role }))
      setPassword('')
      setConfirmedPassword('')
    }
  }
  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
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
        </Row>
      </Container>
    </main>
  )
}

export default UserDetailScreen
