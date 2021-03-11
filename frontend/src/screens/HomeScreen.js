import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import BarChart from '../components/BarChart'
import { Container, Row, Col, Card } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <>
      <Row>
        {/* Side Bar */}
        <Col xs={3} sm={3} md={2} lg={2} className='pr-0'>
          <Sidebar />
        </Col>

        {/* Main screen */}
        <Col xs={9} sm={9} md={10} lg={10} className='px-0'>
          <Header />
          <main>
            <Container className='py-3 ml-1'>
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
          <Footer />
        </Col>
      </Row></>
  )
}

export default HomeScreen
