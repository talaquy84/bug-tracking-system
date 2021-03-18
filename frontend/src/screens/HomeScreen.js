import React from 'react'
import BarChart from '../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
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
