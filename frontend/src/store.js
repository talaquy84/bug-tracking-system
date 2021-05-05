import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth, userRegister, userLogin, userUpdateProfile, getAllUser, getUserById, userUpdateProfileById, userDelete } from './reducers/userReducers'
import { getAllProject, createNewProject, getProjectById, projectUpdate, projectDelete } from './reducers/projectReducers'
import { getAllTicket, getMyTickets, createNewTicket, ticketDelete, ticketUpdate, ticketById, ticketAssign, ticketRemoveUser } from './reducers/ticketReducers'

const reducer = combineReducers({
  auth,
  userRegister,
  userLogin,
  userUpdateProfile,
  getAllUser,
  getUserById,
  getAllTicket,
  getMyTickets,
  userUpdateProfileById,
  userDelete,
  ticketById,
  createNewTicket,
  ticketDelete,
  ticketUpdate,
  ticketAssign,
  ticketRemoveUser,
  getAllProject,
  createNewProject,
  getProjectById,
  projectUpdate,
  projectDelete
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store