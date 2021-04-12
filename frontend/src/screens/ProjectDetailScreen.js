import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProjectById, updateProject } from '../actions/projectActions'
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants'
import { hidden } from 'colors'

const ProjectDetailScreen = ({ history, match }) => {
  const projectId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const getProjectById = useSelector(state => state.getProjectById)
  const { loading, project } = getProjectById

  const projectUpdate = useSelector(state => state.projectUpdate)
  const { error, success } = projectUpdate

  useEffect(() => {
    if (success) {
      dispatch({ type: PROJECT_UPDATE_RESET })
      dispatch(listProjectById(projectId))
      history.push(`/projects`)
    } else {
      if (!project || project._id !== projectId) {
        dispatch(listProjectById(projectId))
      } else {
        setName(project.name)
        setDescription(project.description)
      }
    }
  }, [dispatch, success, projectId, history, project])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProject(projectId, name, description))
  }
  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row className='px-5 py-4'>
          <Col md={6} >
            {error && <Message variant='error'>{error}</Message>}
            {success && <Message variant='success'>Update Successful</Message>}
            {loading && <Loader />}
            <h2>PROJECT UPDATE</h2>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description of project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

export default ProjectDetailScreen
