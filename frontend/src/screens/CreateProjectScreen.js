import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createProject } from '../actions/projectActions'
import { PROJECT_CREATE_RESET } from '../constants/projectConstants'

const CreateProjectScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const newProject = useSelector(state => state.createNewProject)
  const { loading, success, error, project } = newProject

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET })

    if (success) {
      history.push(`/projects`)
    }
  }, [dispatch, history, success])

  const createProjectHandler = (e) => {
    e.preventDefault()
    dispatch(createProject(name, description))
  }

  return (
    <main>
      <Row className='px-5 py-4'>
        <Col >
          <h2>Create New Project</h2>
          {success && <Message variant='success'>Project is Created</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form >
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
                type="text"
                placeholder="Description of the Project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={createProjectHandler}>
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </main>
  )
}

export default CreateProjectScreen
