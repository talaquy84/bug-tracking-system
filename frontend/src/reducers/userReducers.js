import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from '../constants/userConstants'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      }
    case USER_LOGIN_FAIL:
    case AUTH_ERROR:
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