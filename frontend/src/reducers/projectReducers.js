import {
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_RESET
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