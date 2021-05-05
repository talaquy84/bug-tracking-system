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
  TICKET_CREATE_RESET,
  TICKET_DELETE_REQUEST,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_UPDATE_REQUEST,
  TICKET_UPDATE_SUCCESS,
  TICKET_UPDATE_FAIL,
  TICKET_UPDATE_RESET,
  TICKET_BYID_REQUEST,
  TICKET_BYID_SUCCESS,
  TICKET_BYID_FAIL,
  TICKET_ASSIGN_USER_REQUEST,
  TICKET_ASSIGN_USER_SUCCESS,
  TICKET_ASSIGN_USER_FAIL,
  TICKET_ASSIGN_USER_RESET,
  TICKET_REMOVE_USER_REQUEST,
  TICKET_REMOVE_USER_SUCCESS,
  TICKET_REMOVE_USER_FAIL,
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

export const ticketDelete = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_DELETE_REQUEST:
      return { loading: true }
    case TICKET_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TICKET_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ticketUpdate = (state = {}, action) => {
  switch (action.type) {
    case TICKET_UPDATE_REQUEST:
      return { loading: true }
    case TICKET_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        ticket: action.payload,
      }
    case TICKET_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TICKET_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const ticketById = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case TICKET_BYID_REQUEST:
      return { loading: true }
    case TICKET_BYID_SUCCESS:
      return {
        loading: false,
        ticket: action.payload,
      }
    case TICKET_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const ticketAssign = (state = {}, action) => {
  switch (action.type) {
    case TICKET_ASSIGN_USER_REQUEST:
      return {
        loading: true
      }
    case TICKET_ASSIGN_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        ticket: action.payload,
      }
    case TICKET_ASSIGN_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TICKET_ASSIGN_USER_RESET:
      return {}
    default:
      return state
  }
}

export const ticketRemoveUser = (state = {}, action) => {
  switch (action.type) {
    case TICKET_REMOVE_USER_REQUEST:
      return {
        loading: true
      }
    case TICKET_REMOVE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        ticket: action.payload,
      }
    case TICKET_REMOVE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}