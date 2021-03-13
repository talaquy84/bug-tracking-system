import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoginScreen.css'
import { Container, Jumbotron, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, user, error } = userLogin

  const auth = useSelector(state => state.auth)
  const { user: userAuth } = auth

  const redirect = location.search ? location.search.split('=')[1] : '/home'

  useEffect(() => {
    if (user || userAuth) {
      history.push('/home')
    }
  }, [history, user, userAuth, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='login-page bg-info'>
      <Jumbotron className='form-box'>
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <h2 className="text-info text-center">Sign In</h2>
              <hr />
              {/* error && ( if error then) */}
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    className='border'
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label >Password</Form.Label>
                  <Form.Control
                    className='border'
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary' fluid>
                  Sign In
                </Button>
              </Form>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col>
              New Customer?
            <Link to='/register'> Register</Link>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col>
              Forget your
            <Link to='/register'> Password?</Link>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div >
  )
}

export default LoginScreen
