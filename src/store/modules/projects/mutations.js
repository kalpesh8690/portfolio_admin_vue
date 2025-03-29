export default {
  SET_PROJECTS(state, data) {
    state.projectList = data.result
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
  ADD_PROJECT(state, project) {
    state.projectList.push(project)
  },
  UPDATE_PROJECT(state, updatedProject) {
    const index = state.projectList.findIndex(proj => proj._id === updatedProject._id)
    if (index !== -1) {
      state.projectList.splice(index, 1, updatedProject)
    }
  },
  DELETE_PROJECT(state, projectId) {
    state.projectList = state.projectList.filter(proj => proj._id !== projectId)
  }
} 