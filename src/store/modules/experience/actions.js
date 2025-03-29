import apis from '@/apis'

const actions = {
  async fetchExperiences({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ExperienceAPI.getExperiences(params)
      commit('SET_EXPERIENCES', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch experiences')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createExperience({ commit }, experienceData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ExperienceAPI.addExperience(experienceData)
      const resExperiences = await apis.ExperienceAPI.getExperiences()
      commit('SET_EXPERIENCES', resExperiences.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to create experience')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateExperience({ commit }, experienceData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ExperienceAPI.updateExperience(experienceData)
      const resExperiences = await apis.ExperienceAPI.getExperiences()
      commit('SET_EXPERIENCES', resExperiences.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update experience')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteExperience({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.ExperienceAPI.deleteExperience(id)
      const resExperiences = await apis.ExperienceAPI.getExperiences()
      commit('SET_EXPERIENCES', resExperiences.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to delete experience')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default actions 