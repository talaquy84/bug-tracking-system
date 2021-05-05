import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProjectScreen from './screens/ProjectScreen'
import ProjectDetailScreen from './screens/ProjectDetailScreen'
import CreateProjectScreen from './screens/CreateProjectScreen'
import TicketScreen from './screens/TicketScreen'
import CreateTicketScreen from './screens/CreateTicketScreen'
import UsersScreen from './screens/UsersScreen'
import UserDetailScreen from './screens/UserDetailScreen'
import TicketDetailScreen from './screens/TicketDetailScreen'
import TicketAssignScreen from './screens/TicketAssignScreen'
import ManageUsersScreen from './screens/ManageUsersScreen'
import PrivateRoute from './routing/PrivateRoute'
import { loadUser } from './actions/userActions'
import { listAllProject } from './actions/projectActions'
import { listAllTicket } from './actions/ticketActions'
import { listAllUser } from './actions/userActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import setAuthToken from './utils/setAuthToken'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(listAllProject())
    store.dispatch(listAllTicket())
    store.dispatch(listAllUser())
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        <Route>
          <Row>
            {/* Side Bar */}
            <Col xs={3} sm={3} md={2} lg={2} className='pr-0'>
              <Sidebar />
            </Col>
            {/* Main screen */}
            <Col xs={9} sm={9} md={10} lg={10} className='px-0'>
              <Header />
              <Switch>
                <PrivateRoute exact path='/home' component={HomeScreen} />
                <PrivateRoute exact path='/profile' component={ProfileScreen} />
                <PrivateRoute exact path='/projects' component={ProjectScreen} />
                <PrivateRoute exact path='/projects/new' component={CreateProjectScreen} />
                <PrivateRoute exact path='/projects/:id/edit' component={ProjectDetailScreen} />
                <PrivateRoute exact path='/tickets' component={TicketScreen} />
                <PrivateRoute exact path='/tickets/:id/edit' component={TicketDetailScreen} />
                <PrivateRoute exact path='/tickets/:id/assign' component={TicketAssignScreen} />
                <PrivateRoute exact path='/tickets/new' component={CreateTicketScreen} />
                <PrivateRoute exact path='/users' component={UsersScreen} />
                <PrivateRoute exact path='/users/:id/edit' component={UserDetailScreen} />
                <PrivateRoute exact path='/admin/users' component={ManageUsersScreen} />
                <PrivateRoute path="*" component={HomeScreen} />
              </Switch>
              <Footer />
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router >
  )
}

export default App;
