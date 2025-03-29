import apis from '@/apis'

const actions = {
  async fetchDashbord({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.DashbordAPI.getDashbord(params)
      console.log(response)
      commit('SET_DASHBORD', response.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch dashbord')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

 
}

export default actions 