import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer, Link } from 'react-router-bootstrap'
import { listAllProject } from '../actions/projectActions'
import { listAllTicket } from '../actions/ticketActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProjectScreen = () => {
  const dispatch = useDispatch()

  const getAllProject = useSelector(state => state.getAllProject)
  const { loading, error, projects } = getAllProject

  useEffect(() => {
    dispatch(listAllProject())
    dispatch(listAllTicket())
  }, [dispatch])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      //DELETE
    }
  }
  return (
    <main>
      <Container className='py-3 px-0 ml-auto'>
        <Row>
          <Col>
            <h2>Projects</h2>
            <LinkContainer to={`/projects/new`}>
              <Button className='ml-auto mr-5' >Create New Projects</Button>
            </LinkContainer>
            {loading ? <Loader /> : error ? <Message variant='danger'>
              {error} </Message> : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>TICKETS</th>
                    <th>DATE</th>
                    <th>EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project._id}>
                      <td>{project._id}</td>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        <ul>
                          {project.ticket.map(ticket => (
                            <LinkContainer to={`/tickets/${ ticket.ticketId }`} >
                              <li key={ticket._id}>{ticket.ticketName}</li>
                            </LinkContainer>
                          ))}
                        </ul>
                      </td>
                      <td>{project.createdAt.substring(0, 10)}</td>
                      <td>
                        <LinkContainer to={`/projects/${ project._id }/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(project._id)
                          }>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default ProjectScreen
