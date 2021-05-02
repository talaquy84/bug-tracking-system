import {
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_RESET,
  PROJECT_BYID_REQUEST,
  PROJECT_BYID_SUCCESS,
  PROJECT_BYID_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
} from '../constants/projectConstants'

export const getAllProject = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { loading: true }
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      }
    case PROJECT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const createNewProject = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true }
    case PROJECT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        project: action.payload,
      }
    case PROJECT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PROJECT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const getProjectById = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_BYID_REQUEST:
      return { loading: true }
    case PROJECT_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        project: action.payload,
      }
    case PROJECT_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

//udpate project
export const projectUpdate = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true }
    case PROJECT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        porject: action.payload
      }
    case PROJECT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case PROJECT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const projectDelete = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true }
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}