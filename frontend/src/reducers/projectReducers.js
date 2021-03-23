import {
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
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