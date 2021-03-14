import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import CreateTicketScreen from './screens/CreateTicketScreen'
import PrivateRoute from './routing/PrivateRoute'
import { loadUser } from './actions/userActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import setAuthToken from './utils/setAuthToken'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <div>
          <Row>
            {/* Side Bar */}
            <Col xs={3} sm={3} md={2} lg={2} className='pr-0'>
              <Sidebar />
            </Col>
            {/* Main screen */}
            <Col xs={9} sm={9} md={10} lg={10} className='px-0'>
              <Header />
              <PrivateRoute exact path='/home' component={HomeScreen} />
              <PrivateRoute exact path='/profile' component={ProfileScreen} />
              <PrivateRoute exact path='/ticket' component={CreateTicketScreen} />
              <Footer />
            </Col>
          </Row>
        </div>
      </Switch>
    </Router >
  )
}

export default App;
