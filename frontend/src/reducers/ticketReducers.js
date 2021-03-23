import {
  MY_TICKETS_DETAILS_REQUEST,
  MY_TICKETS_DETAILS_SUCCESS,
  MY_TICKETS_DETAILS_FAIL,
  TICKETS_DETAILS_REQUEST,
  TICKETS_DETAILS_SUCCESS,
  TICKETS_DETAILS_FAIL,
} from '../constants/ticketConstants'

export const getAllTicket = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKETS_DETAILS_REQUEST:
      return { loading: true }
    case TICKETS_DETAILS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload,
      }
    case TICKETS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const getMyTickets = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case MY_TICKETS_DETAILS_REQUEST:
      return { loading: true }
    case MY_TICKETS_DETAILS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload,
      }
    case MY_TICKETS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}