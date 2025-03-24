import apis from '@/apis' // Adjust the path as per your project structure

const actions = {
  async createSkill({ commit }, payload) {
    try {
      const result = await apis.SkillAPI.addSkill(payload)
      commit('CREATE_SKILL', result.data) 
      return Promise.resolve(result) // Resolve with the fetched data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async getSkills({ commit }, payload) {
    try {
      const result = await apis.SkillAPI.getSkills(payload)

      commit('GET_SKILLS', result.data)
      return Promise.resolve(result) // Resolve with the logged-in user data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async updateSkill({ commit }, payload) {
    try {
      const result = await apis.SkillAPI.updateSkill(payload)

      commit('UPDATE_SKILL', result.data.data)
      return Promise.resolve(result) // Resolve with the logged-in user data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  async deleteSkill({ commit }, payload) {
    try {
      const result = await apis.SkillAPI.deleteSkill(payload)
      return Promise.resolve(result.data) // Resolve with the logout result data
    } catch (error) {
      console.error('API Error:', error)
      return Promise.reject(error) // Reject with the error
    }
  },
  
}

export default actions 