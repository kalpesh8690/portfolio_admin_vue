export default {
  GET_ALL_USERS(state, data) {
    state.allUsers = data
  },
  SET_USER(state, data) {
    state.user = data
  },
  IS_AUTH(state, data) {
    state.isAuth = data
  },
} 