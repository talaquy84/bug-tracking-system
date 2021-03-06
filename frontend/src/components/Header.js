import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className='border border-secondary border-5' style={{ background: 'WhiteSmoke' }} expand='lg' collapseOnSelect>
        <LinkContainer to='/home'>
          <Navbar.Brand href='/home'>Bug Tracking</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' >
          {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
          <Nav className='ml-auto'>
            <NavDropdown title={userInfo.name} id='username' >
              <LinkContainer to='/profile'>
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
    </header>
  )
}

export default Header
