export default {
  SET_EDUCATION(state, data) {
    state.educationList = data.result
    state.pagination = {
      total: data.totalCount,
      page: 0,
      totalPages: data.totalPages
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  ADD_EDUCATION(state, education) {
    state.educationList.push(education)
  },
  UPDATE_EDUCATION(state, updatedEducation) {
    const index = state.educationList.findIndex(edu => edu._id === updatedEducation._id)
    if (index !== -1) {
      state.educationList.splice(index, 1, updatedEducation)
    }
  },
  DELETE_EDUCATION(state, educationId) {
    state.educationList = state.educationList.filter(edu => edu._id !== educationId)
  }
} 