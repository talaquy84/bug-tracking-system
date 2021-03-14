import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = ({ history }) => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { user } = auth

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <header>
      <Navbar className='border border-secondary border-5' style={{ background: 'WhiteSmoke' }} expand='lg' collapseOnSelect>
        <LinkContainer to='/home'>
          <Navbar.Brand href='/home'>Bug Tracking</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' >
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className='ml-auto'>
            <Nav.Link eventKey="disabled" disabled>Welcome, </Nav.Link>
            <NavDropdown title='User name' id='username' >
              <LinkContainer to={`/profile`} >
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href='/setting'>Setting</NavDropdown.Item>
              <NavDropdown.Divider />
              <LinkContainer to='/'>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header >
  )
}

export default Header
