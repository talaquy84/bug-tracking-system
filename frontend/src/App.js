import React, { useState, useEffect } from 'react'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import PrivateRoute from './routing/PrivateRoute'
import { loadUser } from './actions/userActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
        <PrivateRoute exact path='/home' component={HomeScreen} />
      </Switch>
    </Router>
  )
}

export default App;
