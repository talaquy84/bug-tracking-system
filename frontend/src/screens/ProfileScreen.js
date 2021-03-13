import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [role, setRole] = useState('Developer')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, user, error } = userDetails

  //To check if login or not
  const auth = useSelector(state => state.auth)
  const { user: userInfo } = auth

  // const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  useEffect(() => {
    //If not login, go to login page
    if (!userInfo) {
      history.push('/')
    } else {
      //If user detail is not here, then get user detail
      if (!user) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmedPassword) {
      setMessage('Password do not match')
    } else {
      // dispatch(updateUserProfile({ id: user._id, name, email, password }))
      //Update
    }
  }

  return (
    <main>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {/* {success && <Message variant='success'>Update Successful</Message>} */}
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
          <h2>My order</h2>

        </Col>
      </Row>
    </main>
  )
}

export default ProfileScreen
