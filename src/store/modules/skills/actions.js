import apis from '@/apis'

const actions = {
  async fetchSkills({ commit }, params = {}) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.SkillAPI.getSkills(params)
      commit('SET_SKILLS', response.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch skills')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createSkill({ commit }, skillData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.SkillAPI.addSkill(skillData)
      const resSkills = await apis.SkillAPI.getSkills()
      commit('SET_SKILLS', resSkills.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to create skill')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateSkill({ commit },skillData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.SkillAPI.updateSkill(skillData)
      const resSkills = await apis.SkillAPI.getSkills()
      commit('SET_SKILLS', resSkills.data.data)
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to update skill')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteSkill({ commit }, id) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const response = await apis.SkillAPI.deleteSkill(id)
      const resSkills = await apis.SkillAPI.getSkills()
      commit('SET_SKILLS', resSkills.data.data)
   
      return Promise.resolve(response)
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to delete skill')
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export default actions 