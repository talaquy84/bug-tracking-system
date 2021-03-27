import axios from 'axios'
import {
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
} from '../constants/projectConstants'
import setAuthToken from '../utils/setAuthToken'

//List All Project
export const listAllProject = () => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST
    })

    const { data } = await axios.get('/api/projects')
    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//Create new project
export const createProject = (name, description) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_CREATE_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/projects',
      { name, description },
      config
    )
    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}