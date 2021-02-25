import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'

const Header = () => {
  return (
    <header>
      <Navbar className='border border-secondary border-5' style={{ background: 'WhiteSmoke' }} expand='lg' collapseOnSelect>
        <Navbar.Brand href='/home'>Bug Tracking </Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Nav className='ml-auto'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Nav.Link href='/home'>Home</Nav.Link>
            <Nav.Link href='/home'>Link</Nav.Link>
            <NavDropdown title='Eric Profile' id='basic-nav-dropdown' >
              <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='/setting'>Setting</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
