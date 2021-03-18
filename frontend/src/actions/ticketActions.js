import axios from 'axios'
import {
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  TICKET_DETAILS_FAIL,
} from '../constants/ticketConstants'
import setAuthToken from '../utils/setAuthToken'

export const listMyTickets = () => async (dispatch) => {
  try {
    dispatch({
      type: TICKET_DETAILS_REQUEST
    })
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    const { data } = await axios.get('/api/tickets/mytickets')

    dispatch({
      type: TICKET_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TICKET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}