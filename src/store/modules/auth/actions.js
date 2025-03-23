import apis from '@/apis' // Adjust the path as per your project structure

const actions = {
  async getAllUser({ commit }, payload) {
    try {
      const result = await apis.Auth.getAll(payload)
      commit('GET_ALL_USERS', result.data)
      return Promise.resolve(result) // Resolve with the fetched data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async loginWithPass({ commit }, payload) {
    try {
      const result = await apis.Auth.loginUser(payload)

      localStorage.setItem('user', JSON.stringify(result.data))
      commit('SET_USER', result.data)
      commit('IS_AUTH', true)
      return Promise.resolve(result) // Resolve with the logged-in user data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async updateUser({ commit }, payload) {
    try {
      const result = await apis.Auth.updateUser(payload)

      localStorage.setItem('user', JSON.stringify(result.data.data))
      commit('SET_USER', result.data.data)
      return Promise.resolve(result) // Resolve with the logged-in user data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async logout({ commit }, payload) {
    try {
      commit('SET_USER', null)
      commit('IS_AUTH', false)
      localStorage.clear()
      const result = await apis.Auth.logout(payload)
      return Promise.resolve(result.data) // Resolve with the logout result data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async updateUserDetails({ commit }, payload) {
    try {
      const result = await apis.Auth.updateUserDetails(payload)
      const user = await apis.Auth.getUser(result.data.data._id)
      commit('SET_USER', user.data.data)
      return Promise.resolve(result) // Resolve with the updated user details
    } catch (error) {
      console.error('API Error:', error)  
      return Promise.reject(error) // Reject with the error
    }
  },
}

export default actions 