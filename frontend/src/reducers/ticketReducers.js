import {
  TICKET_DETAILS_REQUEST,
  TICKET_DETAILS_SUCCESS,
  TICKET_DETAILS_FAIL,
} from '../constants/ticketConstants'

export const getMyTickets = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_DETAILS_REQUEST:
      return { loading: true }
    case TICKET_DETAILS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload,
      }
    case TICKET_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}