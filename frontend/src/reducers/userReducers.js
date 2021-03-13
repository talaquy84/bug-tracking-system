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
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
} from '../constants/userConstants'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

//Loader
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case AUTH_ERROR:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        error: action.payload
      }
    default:
      return state
  }
}

//Login
export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      }
    case USER_LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        error: action.payload
      }
    case USER_LOGOUT:
      localStorage.removeItem('token')
      return {
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

//Register
export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      }
    case USER_REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        error: action.payload
      }
    default:
      return state
  }
}

//Without initial state, still working
export const userDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, loading: true }
    case USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAIL_RESET:
      return { user: {} }
    default:
      return state
  }
}