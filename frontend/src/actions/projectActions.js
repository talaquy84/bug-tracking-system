import axios from 'axios'
import {
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_BYID_REQUEST,
  PROJECT_BYID_SUCCESS,
  PROJECT_BYID_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
} from '../constants/projectConstants'
import setAuthToken from '../utils/setAuthToken'

//List All Project
export const listAllProject = () => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
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

//List Project By Id
export const listProjectById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_BYID_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get(`/api/projects/${ id }`)
    dispatch({
      type: PROJECT_BYID_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PROJECT_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//update project
export const updateProject = (id, name, description) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST
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
      `/api/projects/${ id }`,
      { name, description },
      config
    )

    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}