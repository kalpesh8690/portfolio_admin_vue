export default {
  SET_EXPERIENCES(state, data) {
    state.experienceList = data.experiences
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
  ADD_EXPERIENCE(state, experience) {
    state.experienceList.push(experience)
  },
  UPDATE_EXPERIENCE(state, updatedExperience) {
    const index = state.experienceList.findIndex(exp => exp._id === updatedExperience._id)
    if (index !== -1) {
      state.experienceList.splice(index, 1, updatedExperience)
    }
  },
  DELETE_EXPERIENCE(state, experienceId) {
    state.experienceList = state.experienceList.filter(exp => exp._id !== experienceId)
  }
} 