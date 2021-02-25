import React, { useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path='/' component={LoginScreen} exact />
      <Route path='/home' component={HomeScreen} exact />

    </Router>
  )
}

export default App;
