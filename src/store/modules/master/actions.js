import apis from '@/apis'

const actions = {
  async fetchDashboard({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.DashbordAPI.getDashbord(params)
      console.log(response)
      commit('SET_DASHBOARD', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch dashboard')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

 
}

export default actions 