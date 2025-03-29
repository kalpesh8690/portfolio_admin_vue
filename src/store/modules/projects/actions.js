import apis from '@/apis'

const actions = {
  async fetchproject({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ProjectAPI.getProjects(params)
      
      commit('SET_PROJECTS', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createproject({ commit }, educationData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ProjectAPI.addProject(educationData)
      const resproject = await apis.ProjectAPI.getProjects()
      commit('SET_PROJECTS', resproject.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to create education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateproject({ commit }, educationData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ProjectAPI.updateProject(educationData)
      const resproject = await apis.ProjectAPI.getProjects()
      commit('SET_PROJECTS', resproject.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteproject({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ProjectAPI.deleteProject(id)
      const resproject = await apis.ProjectAPI.getProjects()
      commit('SET_PROJECTS', resproject.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to delete education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default actions 