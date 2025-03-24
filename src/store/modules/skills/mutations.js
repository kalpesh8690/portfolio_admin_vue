export default {
  SET_SKILLS(state, data) {
    state.skillList = data.skills
    state.pagination = {
      total: data.total,
      page: data.page,
      totalPages: data.totalPages
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  ADD_SKILL(state, skill) {
    state.skillList.push(skill)
  },
  UPDATE_SKILL(state, updatedSkill) {
    const index = state.skillList.findIndex(skill => skill._id === updatedSkill._id)
    if (index !== -1) {
      state.skillList.splice(index, 1, updatedSkill)
    }
  },
  DELETE_SKILL(state, skillId) {
    state.skillList = state.skillList.filter(skill => skill._id !== skillId)
  }
} 