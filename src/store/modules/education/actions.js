import apis from '@/apis'

const actions = {
  async fetchEducation({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.EducationAPI.getEducation(params)
      
      commit('SET_EDUCATION', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createEducation({ commit }, educationData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.EducationAPI.addEducation(educationData)
      const resEducation = await apis.EducationAPI.getEducation()
      commit('SET_EDUCATION', resEducation.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to create education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateEducation({ commit }, educationData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.EducationAPI.updateEducation(educationData)
      const resEducation = await apis.EducationAPI.getEducation()
      commit('SET_EDUCATION', resEducation.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update education')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteEducation({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.EducationAPI.deleteEducation(id)
      const resEducation = await apis.EducationAPI.getEducation()
      commit('SET_EDUCATION', resEducation.data.data)
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