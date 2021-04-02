import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BarChart from '../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap'
import { listAllProject } from '../actions/projectActions'
import { listAllTicket } from '../actions/ticketActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listAllProject())
    dispatch(listAllTicket())
  }, [dispatch])

  return (
    <>
      <main>
        <Container className='py-3 ml-auto'>
          <Row>
            <Col>
              <BarChart />
            </Col>
            <Col><BarChart /></Col>
          </Row>
          <Row>
            <Col><BarChart /></Col>
            <Col><BarChart /></Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default HomeScreen
