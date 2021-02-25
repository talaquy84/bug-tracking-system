import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { Container, Row, Col, Card } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <Row>
      <Col xs={3} sm={3} md={2} lg={2} className='pr-0'>
        <Sidebar />
      </Col>

      <Col xs={9} sm={9} md={10} lg={10} className='px-0'>
        <Header />
        <main>
          <Container className='py-3 ml-1'>
            <Row>
              <Col>1</Col>
              <Col>2</Col>
            </Row>
            <Row>
              <Col>3</Col>
              <Col>4</Col>
            </Row>
          </Container>
        </main>
        <Footer />
      </Col>
    </Row>
  )
}

export default HomeScreen
