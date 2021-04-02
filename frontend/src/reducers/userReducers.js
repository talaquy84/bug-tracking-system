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
  USER_UPDATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
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
        user: action.payload,
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

export const getAllUser = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        users: action.payload,
      }
    default:
      return state
  }
}

//udpate profile
export const userUpdateProfile = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload
      }
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}