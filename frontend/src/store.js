import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth, userRegister, userLogin, userUpdateProfile, getAllUser } from './reducers/userReducers'
import { getAllProject, createNewProject } from './reducers/projectReducers'
import { getAllTicket, getMyTickets, createNewTicket } from './reducers/ticketReducers'

const reducer = combineReducers({
  auth,
  userRegister,
  userLogin,
  userUpdateProfile,
  getAllUser,
  getAllTicket,
  getMyTickets,
  createNewTicket,
  getAllProject,
  createNewProject
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