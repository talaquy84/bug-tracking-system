import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth, userRegister, userLogin, userUpdateProfile } from './reducers/userReducers'
import { getAllProject } from './reducers/projectReducers'
import { getAllTicket, getMyTickets } from './reducers/ticketReducers'

const reducer = combineReducers({
  auth,
  userRegister,
  userLogin,
  userUpdateProfile,
  getAllTicket,
  getMyTickets,
  getAllProject
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