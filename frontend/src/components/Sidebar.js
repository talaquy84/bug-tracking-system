import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../actions/userActions'
import Loader from '../components/Loader'
import './Sidebar.css'

const Sidebar = () => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const { loading, user } = auth

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(loadUser())
    }
  }, [dispatch])
  return (
    <div style={{ background: '#027581', height: '100%', color: "white" }} className='border border-secondary border-5'>
      <div >
        <Link to='/home'>
          <h3 className='brand sidebar-header'>
            <span className='fas fa-bug'></span>
            <span style={{ paddingLeft: '1rem' }}>Bug Tracking</span>
          </h3>
        </Link>
      </div>

      <div className='sidebar-menu'>
        <ul>
          <li>
            <Link className='menu-link' to='/home'>
              <span className='fas fa-home'></span>
              <span> Home</span>
            </Link>
          </li>
          <li>
            <Link className='menu-link' to='/profile'>
              <span className='far fa-id-card'></span>
              <span> Profile</span>
            </Link>
          </li>
          <li>
            <Link className='menu-link' to='/projects'>
              <span className='fas fa-tasks'></span>
              <span> Projects</span>
            </Link>
          </li>
          <li>
            <Link className='menu-link' to='/tickets'>
              <span className='fas fa-ticket-alt'></span>
              <span> Tickets</span>
            </Link>
          </li>
          <li>
            <Link className='menu-link' to='/users'>
              <span className='fas fa-users'></span>
              <span> View Users</span>
            </Link>
          </li>

          <li>
            <Link className='menu-link' to='/admin/users'>
              <span className='fas fa-users-cog'></span>
              <span> Manage Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default Sidebar
