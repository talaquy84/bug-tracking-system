import axios from 'axios'
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_BYID_REQUEST,
  USER_BYID_SUCCESS,
  USER_BYID_FAIL,
  USER_UPDATE_BYID_REQUEST,
  USER_UPDATE_BYID_SUCCESS,
  USER_UPDATE_BYID_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants'
import setAuthToken from '../utils/setAuthToken'

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get('/api/users')

    dispatch({
      type: USER_LOADED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//Login
export const login = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users/login',
      user,
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOADED,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//Logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

//Register
export const register = (name, email, password, role) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password, role },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_LOADED,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//update user
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.put(
      '/api/users/profile',
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })
    dispatch({
      type: USER_LOADED,
      payload: data
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//get all user
export const listAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get('/api/users/all')

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const loadUserById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_BYID_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get(`/api/users/${ id }`)

    dispatch({
      type: USER_BYID_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//update user
export const updateUserProfileById = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_BYID_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.put(
      `/api/users/${ user.id }`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_BYID_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//delete ticket
export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.delete(`/api/users/${ userId }`,
      config
    )

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}