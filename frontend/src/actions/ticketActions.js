import axios from 'axios'
import {
  MY_TICKETS_DETAILS_REQUEST,
  MY_TICKETS_DETAILS_SUCCESS,
  MY_TICKETS_DETAILS_FAIL,
  TICKETS_DETAILS_REQUEST,
  TICKETS_DETAILS_SUCCESS,
  TICKETS_DETAILS_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_FAIL,
} from '../constants/ticketConstants'
import setAuthToken from '../utils/setAuthToken'

//list all the ticket
export const listAllTicket = () => async (dispatch) => {
  try {
    dispatch({
      type: TICKETS_DETAILS_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get('/api/tickets')

    dispatch({
      type: TICKETS_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TICKETS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//List my ticket
export const listMyTickets = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_TICKETS_DETAILS_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get('/api/tickets/mytickets')

    dispatch({
      type: MY_TICKETS_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: MY_TICKETS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

//Create new ticket
export const createTicket = (name, description, priority, status, assignedTo, project) => async (dispatch) => {
  try {
    dispatch({
      type: TICKET_CREATE_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post('/api/tickets',
      { name, description, priority, status, assignedTo, project },
      config
    )
    dispatch({
      type: TICKET_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TICKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}