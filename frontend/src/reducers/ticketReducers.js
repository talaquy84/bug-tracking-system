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
  TICKET_CREATE_RESET
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

export const createNewTicket = (state = {}, action) => {
  switch (action.type) {
    case TICKET_CREATE_REQUEST:
      return { loading: true }
    case TICKET_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        ticket: action.payload,
      }
    case TICKET_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TICKET_CREATE_RESET:
      return {}
    default:
      return state
  }
}