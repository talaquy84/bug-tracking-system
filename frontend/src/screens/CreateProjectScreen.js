import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile, loadUser } from '../actions/userActions'
import { listMyTickets } from '../actions/ticketActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { hidden } from 'colors'

const CreateProjectScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  // const auth = useSelector(state => state.auth)
  // const { loading, user } = auth

  // const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  // const getMyTickets = useSelector(state => state.getMyTickets)
  // const { loading: loadingTicket, tickets, error } = getMyTickets

  useEffect(() => {

  }, [])

  const submitHandler = (e) => {
    //Dispatch create project
  }

  return (
    <main>
      <Row className='px-5 py-4'>
        <Col >
          <h2>Create New Project</h2>
          {/* {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Update Successful</Message>}
          {loading && <Loader />} */}
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
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
                type="text-area"
                placeholder="Description of the Project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submitHandler}>
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default CreateProjectScreen
