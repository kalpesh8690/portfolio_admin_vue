// UserAPI.js
import Repository from './Repo'

const REGISTER_USER = 'register'
const LOGIN_USER = 'login'
const LOGOUT_USER = 'logout'
const UPDATE_USER = 'update'
const UPDATE_USER_DETAILS = 'updateDetails'
const GET_ALL = 'getAll'
const GET_USER = 'getSingle'
const LOGOUT = 'logout'

const dir = '/users/'

const UserAPI = {
  registerUser(payload) {
    return Repository.post(`${dir}` + REGISTER_USER, payload)
  },

  loginUser(payload) {
    return Repository.post(`${dir}` + LOGIN_USER, payload)
  },
  logout(payload) {
    return Repository.post(`${dir}` + LOGOUT, payload)
  },

  logoutUser() {
    return Repository.post(`${dir}` + LOGOUT_USER)
  },

  updateUser(payload) {


    return Repository.post(`${dir}` + UPDATE_USER, payload)
  },
  getAll(payload) {
    return Repository.post(`${dir}` + GET_ALL, payload)
  },
  updateUserDetails(payload) {
    return Repository.post(`${dir}` + UPDATE_USER_DETAILS, payload)
  },
  getUser(payload) {
    return Repository.post(`${dir}` + GET_USER, payload)
  },
}

export default UserAPI
