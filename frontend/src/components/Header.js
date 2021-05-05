import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' >
          {/* Search Box */}
          <Route render={({ history }) => <SearchBox history={history} />} />

          {/* User Welcome */}
          <Nav className='ml-auto mr-5'>
            <Nav.Link eventKey="disabled" disabled>Welcome, </Nav.Link>
            <NavDropdown title={user ? user.name : ""} id='username' >
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
